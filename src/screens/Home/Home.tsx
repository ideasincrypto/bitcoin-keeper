import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import useWallets from 'src/hooks/useWallets';
import { useAppSelector } from 'src/store/hooks';
import { Box, HStack, useColorMode } from 'native-base';
import { Wallet } from 'src/core/wallets/interfaces/wallet';
import { VisibilityType } from 'src/core/wallets/enums';
import TickIcon from 'src/assets/images/icon_tick.svg';
import useToastMessage from 'src/hooks/useToastMessage';
import idx from 'idx';
import { useDispatch } from 'react-redux';
import { resetElectrumNotConnectedErr } from 'src/store/reducers/login';
import ToastErrorIcon from 'src/assets/images/toast_error.svg';
import { Vault } from 'src/core/wallets/interfaces/vault';
import useCollaborativeWallet from 'src/hooks/useCollaborativeWallet';
import { resetRealyWalletState } from 'src/store/reducers/bhr';
import ScreenWrapper from 'src/components/ScreenWrapper';
import { CommonActions } from '@react-navigation/native';
import MenuIcon from 'src/assets/images/menu-hor.svg';
import useVault from 'src/hooks/useVault';
import { DowngradeModal } from './components/DowngradeModal';
import AddWalletModal from './components/AddWalletModal';
import ElectrumDisconnectModal from './components/ElectrumDisconnectModal';
import useKeys from 'src/hooks/useKeys';
import { AppSigners } from './components/AppSigners';
import Wallets from './components/Wallets';
import UaiDisplay from '../HomeScreen/UaiDisplay';
import useUaiStack from 'src/hooks/useUaiStack';
import ListItemView from '../HomeScreen/components/ListItemView';
import InheritanceIcon from 'src/assets/images/inheritanceWhite.svg';
import InheritanceDarkIcon from 'src/assets/images/icon_inheritance_dark.svg';
import { LocalizationContext } from 'src/context/Localization/LocContext';

const calculateBalancesForVaults = (vaults) => {
  let totalUnconfirmedBalance = 0;
  let totalConfirmedBalance = 0;

  vaults.forEach((vault) => {
    const unconfirmedBalance = idx(vault, (_) => _.specs.balances.unconfirmed) || 0;
    const confirmedBalance = idx(vault, (_) => _.specs.balances.confirmed) || 0;

    totalUnconfirmedBalance += unconfirmedBalance;
    totalConfirmedBalance += confirmedBalance;
  });
  return totalUnconfirmedBalance + totalConfirmedBalance;
};

const Header = ({ navigation }) => {
  return (
    <HStack style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} testID="btn_AppSettingsIcon">
        <MenuIcon />
      </TouchableOpacity>
    </HStack>
  );
};

const UAIStack = ({ navigation }) => {
  const { uaiStack } = useUaiStack();
  return <UaiDisplay uaiStack={uaiStack} />;
};

const Keys = ({ navigation }) => {
  const { keys } = useKeys();
  return <AppSigners keys={keys} navigation={navigation} />;
};

const Inheritance = ({ navigation }) => {
  const { colorMode } = useColorMode();
  const { translations } = useContext(LocalizationContext);
  const { vault } = translations;

  return (
    <Box marginY={5}>
      <ListItemView
        icon={colorMode === 'light' ? <InheritanceIcon /> : <InheritanceDarkIcon />}
        title={vault.inheritanceTools}
        subTitle={vault.manageInheritance}
        iconBackColor={`${colorMode}.learnMoreBorder`}
        onPress={() => {
          navigation.dispatch(CommonActions.navigate({ name: 'SetupInheritance' }));
        }}
      />
    </Box>
  );
};

const Home = ({ navigation }) => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const { wallets } = useWallets({ getAll: true });
  const { collaborativeWallets } = useCollaborativeWallet();
  const { activeVault } = useVault();
  const nonHiddenWallets = wallets.filter(
    (wallet) => wallet.presentationData.visibility !== VisibilityType.HIDDEN
  );
  const allVaults = [activeVault, ...collaborativeWallets];
  const allWallets: (Wallet | Vault)[] = [...nonHiddenWallets, ...allVaults].filter(
    (item) => item !== null
  );

  const [addImportVisible, setAddImportVisible] = useState(false);
  const [electrumErrorVisible, setElectrumErrorVisible] = useState(false);
  const { relayWalletUpdate, relayWalletError, realyWalletErrorMessage } = useAppSelector(
    (state) => state.bhr
  );
  const netBalanceWallets = useAppSelector((state) => state.wallet.netBalance);
  const netBalanceAllVaults = calculateBalancesForVaults(allVaults);

  const [defaultWalletCreation, setDefaultWalletCreation] = useState(false);
  const { showToast } = useToastMessage();
  const electrumClientConnectionStatus = useAppSelector(
    (state) => state.login.electrumClientConnectionStatus
  );

  useEffect(() => {
    if (electrumClientConnectionStatus.success) {
      showToast(`Connected to: ${electrumClientConnectionStatus.connectedTo}`, <TickIcon />);
      if (electrumErrorVisible) setElectrumErrorVisible(false);
    } else if (electrumClientConnectionStatus.failed) {
      showToast(`${electrumClientConnectionStatus.error}`, <ToastErrorIcon />);
      setElectrumErrorVisible(true);
    }
  }, [electrumClientConnectionStatus.success, electrumClientConnectionStatus.error]);

  useEffect(() => {
    if (electrumClientConnectionStatus.setElectrumNotConnectedErr) {
      showToast(`${electrumClientConnectionStatus.setElectrumNotConnectedErr}`, <ToastErrorIcon />);
      dispatch(resetElectrumNotConnectedErr());
    }
  }, [electrumClientConnectionStatus.setElectrumNotConnectedErr]);

  useEffect(() => {
    if (relayWalletUpdate) {
      if (defaultWalletCreation && wallets[collaborativeWallets.length]) {
        navigation.navigate('SetupCollaborativeWallet', {
          coSigner: wallets[collaborativeWallets.length],
          walletId: wallets[collaborativeWallets.length].id,
          collaborativeWalletsCount: collaborativeWallets.length,
        });
        dispatch(resetRealyWalletState());
        setDefaultWalletCreation(false);
      }
    }
    if (relayWalletError) {
      showToast(
        realyWalletErrorMessage || 'Something went wrong - Wallet creation failed',
        <ToastErrorIcon />
      );
      setDefaultWalletCreation(false);
      dispatch(resetRealyWalletState());
    }
  }, [relayWalletUpdate, relayWalletError, wallets]);

  return (
    <ScreenWrapper backgroundcolor={`${colorMode}.primaryBackground`}>
      <Header navigation={navigation} />
      <UAIStack navigation={navigation} />
      <Wallets
        navigation={navigation}
        setAddImportVisible={setAddImportVisible}
        wallets={allWallets}
        allBalance={netBalanceWallets + netBalanceAllVaults}
      />
      <Keys navigation={navigation} />
      <Inheritance navigation={navigation} />
      <DowngradeModal navigation={navigation} />
      <AddWalletModal
        navigation={navigation}
        visible={addImportVisible}
        setAddImportVisible={setAddImportVisible}
        wallets={wallets}
        collaborativeWallets={collaborativeWallets}
        setDefaultWalletCreation={setDefaultWalletCreation}
      />
      <ElectrumDisconnectModal
        electrumErrorVisible={electrumErrorVisible}
        setElectrumErrorVisible={setElectrumErrorVisible}
      />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uaiContainer: {
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  uaiMsgWrapper: {
    width: '60%',
  },
  uaiBtnWrapper: {
    width: '40%',
  },
});