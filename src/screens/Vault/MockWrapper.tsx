import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { SignerType } from 'src/core/wallets/enums';
import { getMockSigner } from 'src/hardware';
import useToastMessage from 'src/hooks/useToastMessage';
import { addSigningDevice } from 'src/store/sagaActions/vaults';
import TickIcon from 'src/assets/images/icon_tick.svg';
import { captureError } from 'src/services/sentry';
import { setSigningDevices } from 'src/store/reducers/bhr';
import { View } from 'native-base';

MockWrapper.defaultProps = {
  enable: true,
  isRecovery: false,
  navigation: null,
};

function MockWrapper({
  children,
  signerType,
  enable,
  isRecovery,
  navigation,
  addSignerFlow = false,
}: {
  children: any;
  signerType: SignerType;
  enable?: boolean;
  isRecovery?: boolean;
  navigation?: NavigationProp<any>;
  addSignerFlow?: boolean;
}) {
  const dispatch = useDispatch();
  const nav = navigation ?? useNavigation();
  const { showToast } = useToastMessage();
  const addMockSigner = () => {
    try {
      const data = getMockSigner(signerType);
      if (data.signer && data.key) {
        const { signer, key } = data;
        if (!isRecovery) {
          dispatch(addSigningDevice(signer, key, addSignerFlow));
          const navigationState = addSignerFlow
            ? { name: 'Home' }
            : { name: 'AddSigningDevice', merge: true, params: {} };
          nav.dispatch(CommonActions.navigate(navigationState));
        }
        if (isRecovery) {
          dispatch(setSigningDevices(signer));
          nav.dispatch(CommonActions.navigate('LoginStack', { screen: 'VaultRecoveryAddSigner' }));
        }

        showToast(`${signer.signerName} added successfully`, <TickIcon />);
      }
    } catch (error) {
      captureError(error);
    }
  };
  if (!enable) {
    return children;
  }
  return (
    <TapGestureHandler numberOfTaps={3} onActivated={addMockSigner}>
      <View flex={1}>{children}</View>
    </TapGestureHandler>
  );
}

export default MockWrapper;
