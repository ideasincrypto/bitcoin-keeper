import React, { useContext, useEffect } from 'react';
import OptionCTA from 'src/components/OptionCTA';
import NFCIcon from 'src/assets/images/nfc.svg';
import NfcPrompt from 'src/components/NfcPromptAndroid';
import { captureError } from 'src/core/services/sentry';
import useToastMessage from 'src/hooks/useToastMessage';
import nfcManager, { NfcTech } from 'react-native-nfc-manager';
import ToastErrorIcon from 'src/assets/images/toast_error.svg';
import NFC from 'src/core/services/nfc';
import { SignerType } from 'src/core/wallets/enums';
import { HCESession, HCESessionContext } from 'react-native-hce';
import { Platform } from 'react-native';
import idx from 'idx';

function NFCOption({ nfcVisible, closeNfc, withNfcModal, setData, signerType }) {
  const { showToast } = useToastMessage();
  const readFromNFC = async () => {
    try {
      await withNfcModal(async () => {
        const records = await NFC.read([NfcTech.Ndef]);
        try {
          const cosigner = records[0].data;
          setData(cosigner);
        } catch (err) {
          captureError(err);
          showToast('Please scan a valid cosigner tag', <ToastErrorIcon />);
        }
      });
    } catch (err) {
      if (err.toString() === 'Error') {
        console.log('NFC interaction cancelled');
        return;
      }
      captureError(err);
      showToast('Something went wrong.', <ToastErrorIcon />);
    }
  };

  const { session } = useContext(HCESessionContext);
  const isAndroid = Platform.OS === 'android';

  useEffect(() => {
    if (isAndroid) {
      if (nfcVisible) {
        NFC.startTagSession({ session, content: '', writable: true });
      } else {
        NFC.stopTagSession(session);
      }
    }
    return () => {
      nfcManager.cancelTechnologyRequest();
    };
  }, [nfcVisible]);

  useEffect(() => {
    const unsubConnect = session.on(HCESession.Events.HCE_STATE_WRITE_FULL, () => {
      try {
        // content written from iOS to android
        const data = idx(session, (_) => _.application.content.content);
        if (!data) {
          showToast('Please scan a valid cosigner', <ToastErrorIcon />);
          return;
        }
        setData(data);
      } catch (err) {
        captureError(err);
        showToast('Something went wrong.', <ToastErrorIcon />);
      } finally {
        closeNfc();
      }
    });
    const unsubDisconnect = session.on(HCESession.Events.HCE_STATE_DISCONNECTED, () => {
      closeNfc();
    });
    return () => {
      unsubConnect();
      unsubDisconnect();
      NFC.stopTagSession(session);
    };
  }, [session]);

  if (signerType !== SignerType.KEEPER) {
    return null;
  }
  return (
    <>
      <OptionCTA
        icon={<NFCIcon />}
        title="or Setup via NFC"
        subtitle="Bring device close to use NFC"
        callback={readFromNFC}
      />
      <NfcPrompt visible={nfcVisible} close={closeNfc} />
    </>
  );
}

export default NFCOption;
