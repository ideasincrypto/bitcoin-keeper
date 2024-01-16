import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { Box, HStack, VStack, useColorMode } from 'native-base';
import { useDispatch } from 'react-redux';
import ScreenWrapper from 'src/components/ScreenWrapper';
import KeeperHeader from 'src/components/KeeperHeader';
import KeeperTextInput from 'src/components/KeeperTextInput';
import Text from 'src/components/KeeperText';
import { windowWidth } from 'src/constants/responsive';
import Buttons from 'src/components/Buttons';
import { setVaultRecoveryDetails } from 'src/store/reducers/bhr';
import useToastMessage from 'src/hooks/useToastMessage';
import ToastErrorIcon from 'src/assets/images/toast_error.svg';
import { VaultScheme } from 'src/core/wallets/interfaces/vault';
import useVault from 'src/hooks/useVault';

function NumberInput({ value, onDecrease, onIncrease }) {
  const { colorMode } = useColorMode();

  return (
    <HStack style={styles.inputContainer} backgroundColor={`${colorMode}.seashellWhite`}>
      <TouchableOpacity style={styles.button} onPress={onDecrease}>
        <Text style={styles.buttonText} color={`${colorMode}.greenText`}>
          -
        </Text>
      </TouchableOpacity>
      <Box style={{ height: 30, borderLeftWidth: 0.2, paddingHorizontal: 5 }} />
      <Text style={styles.buttonValue} bold color={`${colorMode}.greenText`}>
        {value}
      </Text>
      <Box style={{ height: 30, borderRightWidth: 0.2, paddingHorizontal: 5 }} />
      <TouchableOpacity style={styles.button} onPress={onIncrease}>
        <Text style={styles.buttonText} color={`${colorMode}.greenText`}>
          +
        </Text>
      </TouchableOpacity>
    </HStack>
  );
}

function VaultSetup() {
  const { colorMode } = useColorMode();
  const navigation = useNavigation();
  const { showToast } = useToastMessage();
  const { params } = useRoute();
  const {
    isRecreation,
    scheme: preDefinedScheme,
    vaultId,
  } = (params as { isRecreation: Boolean; scheme: VaultScheme; vaultId?: string }) || {};
  const dispatch = useDispatch();
  const { activeVault } = useVault({ vaultId });
  const [vaultName, setVaultName] = useState(activeVault?.presentationData?.name || 'Vault');
  const [vaultDescription, setVaultDescription] = useState(
    activeVault?.presentationData?.description || 'Secure your sats'
  );
  const [scheme, setScheme] = useState(activeVault?.scheme || preDefinedScheme || { m: 3, n: 4 });

  const onDecreaseM = () => {
    if (scheme.m > 1) {
      setScheme({ ...scheme, m: scheme.m - 1 });
    }
  };
  const onIncreaseM = () => {
    if (scheme.m > 0 && scheme.m < scheme.n) {
      setScheme({ ...scheme, m: scheme.m + 1 });
    }
  };
  const onDecreaseN = () => {
    if (scheme.n > 1 && scheme.n > scheme.m) {
      setScheme({ ...scheme, n: scheme.n - 1 });
    }
  };
  const onIncreaseN = () => {
    if (scheme.n < 10) {
      setScheme({ ...scheme, n: scheme.n + 1 });
    }
  };
  const OnProceed = () => {
    if (vaultName !== '') {
      if (isRecreation) {
        dispatch(
          setVaultRecoveryDetails({
            scheme,
            name: vaultName,
            description: vaultDescription,
          })
        );
        navigation.navigate('LoginStack', { screen: 'VaultRecoveryAddSigner' });
      } else {
        navigation.dispatch(
          CommonActions.navigate({
            name: 'AddSigningDevice',
            params: {
              scheme,
              name: vaultName || 'Vault',
              description: vaultDescription || 'Secure your sats',
              vaultId,
            },
          })
        );
      }
    } else {
      showToast('Please Enter vault name', <ToastErrorIcon />);
    }
  };

  return (
    <ScreenWrapper backgroundcolor={`${colorMode}.primaryBackground`}>
      <KeeperHeader title={vault.SetupyourVault} subtitle={vault.configureScheme} />
      <VStack style={{ margin: 20, flex: 1 }}>
        <KeeperTextInput
          placeholder="Vault name"
          value={vaultName}
          onChangeText={(value) => {
            if (vaultName === 'Vault') {
              setVaultName('');
            } else {
              setVaultName(value);
            }
          }}
          testID="vault_name"
          maxLength={20}
        />
        <Box style={{ height: 20 }} />
        <KeeperTextInput
          placeholder="Vault description (Optional)"
          value={vaultDescription}
          onChangeText={setVaultDescription}
          testID="vault_description"
          maxLength={40}
          height={20}
        />
        <Box style={{ marginVertical: 15, borderBottomWidth: 0.17, borderBottomColor: 'grey' }} />
        <Text style={{ fontSize: 14 }} testID="text_totalKeys">
          Total Keys for vault Configuration
        </Text>
        <Text style={{ fontSize: 12 }} testID="text_totalKeys_subTitle">
          Select the total number of keys
        </Text>
        <NumberInput value={scheme.n} onDecrease={onDecreaseN} onIncrease={onIncreaseN} />
        <Text style={{ fontSize: 14 }} testID="text_requireKeys">
          Required Keys
        </Text>
        <Text style={{ fontSize: 12 }} testID="text_requireKeys_subTitle">
          Select number of keys to broadcast transaction
        </Text>
        <NumberInput value={scheme.m} onDecrease={onDecreaseM} onIncrease={onIncreaseM} />
      </VStack>
      <Buttons primaryText="Proceed" primaryCallback={OnProceed} />
    </ScreenWrapper>
  );
}

export default VaultSetup;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 30,
    lineHeight: 30,
  },
  buttonValue: {
    fontSize: 17,
    lineHeight: 17,
    margin: 10,
  },
  inputContainer: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.4,
    marginVertical: 20,
  },
});
