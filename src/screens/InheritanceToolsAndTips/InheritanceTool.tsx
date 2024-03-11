import { Box, ScrollView } from 'native-base';
import React from 'react';
import OptionCard from 'src/components/OptionCard';
import VaultGreenIcon from 'src/assets/images/vault_green.svg';
import Sword from 'src/assets/images/sword_icon.svg';
import useWallets from 'src/hooks/useWallets';
import { WalletType } from 'src/core/wallets/enums';
import { CommonActions } from '@react-navigation/native';
import { VaultScheme } from 'src/core/wallets/interfaces/vault';
import { getTimeDifferenceInWords } from 'src/utils/utilities';
import moment from 'moment';

function InheritanceTool({ navigation }) {
  const { wallets } = useWallets({ getAll: true });

  const navigateToVaultSetup = (scheme: VaultScheme) => {
    navigation.dispatch(CommonActions.navigate({ name: 'VaultSetup', params: { scheme } }));
  };

  const navigateToWalletCreation = () => {
    navigation.navigate('EnterWalletDetail', {
      name: `Wallet ${wallets.length + 1}`,
      description: '',
      type: WalletType.DEFAULT,
    });
  };
  const navigate = (path) => {
    navigation.navigate(path);
  };

  return (
    <ScrollView>
      <OptionCard
        preTitle={getTimeDifferenceInWords(moment(), moment().subtract(2, 'days'))}
        title="Inheritance Key"
        description="Additional signer for your vault"
        LeftIcon={<Sword />}
        callback={() => navigate('InheritanceKey')}
      />
      <OptionCard
        preTitle="Never accessed"
        title="Letter to Attorney"
        description="A pre-filled letter template"
        LeftIcon={<Sword />}
        callback={() => navigate('LetterOfAttorney')}
      />
      <OptionCard
        preTitle="Never accessed"
        title="Recovery Instructions"
        description="For the heir or beneficiary"
        LeftIcon={<VaultGreenIcon />}
        callback={() => navigate('RecoveryInstruction')}
      />
      <OptionCard
        preTitle="Never accessed"
        title="Printable Templates"
        description="For digital or physical copies"
        LeftIcon={<VaultGreenIcon />}
        callback={() => navigate('PrintableTemplates')}
      />
      <Box paddingTop={10}>
        <OptionCard
          preTitle="Never accessed"
          title="Inheritance Tips"
          description="How to secure keys for the heir"
          LeftIcon={<VaultGreenIcon />}
          callback={() => navigate('InheritanceTips')}
        />
      </Box>
    </ScrollView>
  );
}

export default InheritanceTool;
