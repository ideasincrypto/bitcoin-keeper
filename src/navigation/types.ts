import { SendConfirmationRouteParams, tnxDetailsProps } from 'src/screens/Send/SendConfirmation';
import { RKInteractionMode } from 'src/services/wallets/enums';
import { Signer, Vault, VaultScheme, VaultSigner } from 'src/services/wallets/interfaces/vault';
import { Wallet } from 'src/services/wallets/interfaces/wallet';

export type AppStackParams = {
  Home: undefined;
  Login: undefined;
  SigningDeviceList: undefined;
  SignerCategoryList: undefined;
  TapsignerAction: undefined;
  SignWithTapsigner: undefined;
  AddColdCard: undefined;
  PassportConfigRecovery: undefined;
  AppSettings: undefined;
  AppVersionHistory: undefined;
  TorSettings: undefined;
  ManageWallets: undefined;
  SetupInheritance: undefined;
  PreviewPDF: undefined;
  InheritanceStatus: undefined;
  InheritanceSetupInfo: undefined;
  IKSAddEmailPhone: undefined;
  EnterOTPEmailConfirmation: undefined;
  Send: undefined;
  SelectWallet: undefined;
  UTXOLabeling: undefined;
  Receive: undefined;
  SignerSelectionListScreen: undefined;
  ChangeLanguage: undefined;
  ChoosePlan: undefined;
  EnterWalletDetail: undefined;
  UpdateWalletDetails: undefined;
  WalletDetailsSettings: undefined;
  CollaborativeWalletSettings: undefined;
  AddAmount: undefined;
  ExportSeed: undefined;
  SeedDetails: undefined;
  ImportWallet: undefined;
  ImportWalletDetails: undefined;
  AddDetailsFinal: undefined;
  AddSendAmount: undefined;
  SendConfirmation: undefined;
  PSBTSendConfirmation: undefined;
  WalletDetails: { autoRefresh?: boolean; walletId: string; transactionToast?: boolean };
  VaultDetails: {
    vaultId: string;
    vaultTransferSuccessful: boolean;
    autoRefresh: boolean;
    transactionToast?: boolean;
  };
  UTXOManagement:
    | {
        data: Wallet | Vault;
        routeName: string;
        accountType?: string;
        vaultId: string;
      }
    | {
        data: Wallet | Vault;
        routeName: string;
        accountType: string;
        vaultId?: string;
      };
  WalletSettings: undefined;
  InheritanceToolsAndTips: undefined;
  DiscountCodes: undefined;
  BackupWallet: undefined;
  SigningDeviceDetails: undefined;
  WalletBackHistory: undefined;
  SignTransactionScreen: undefined;
  AddSigningDevice: undefined;
  SetupSigningServer: undefined;
  SetupSeedWordSigner: undefined;
  ArchivedVault: undefined;
  VaultSettings: undefined;
  SignWithColdCard: undefined;
  ChoosePolicyNew: undefined;
  SigningServer: undefined;
  AddDescription: undefined;
  AllTransactions: undefined;
  TransactionDetails: undefined;
  TransactionHistory: undefined;
  TransactionAdvancedDetails: undefined;
  TimelockScreen: undefined;
  SignerAdvanceSettings: undefined;
  ScanQR: undefined;
  ShowPSBT: undefined;
  RegisterWithQR: undefined;
  SignWithQR: undefined;
  NodeSettings: undefined;
  PrivacyAndDisplay: undefined;
  NetworkSetting: undefined;
  ConnectChannel: undefined;
  RegisterWithChannel: undefined;
  SetupOtherSDScreen: undefined;
  SignWithChannel: undefined;
  PoolSelection: undefined;
  BroadcastPremix: undefined;
  WhirlpoolConfiguration: undefined;
  CosignerDetails: { signer: Signer };
  AdditionalDetails: { signer: Signer };
  KeyHistory: undefined;
  RemoteSharing: {
    signer: Signer;
    isPSBTSharing?: boolean;
    psbt?: string;
    mode: RKInteractionMode;
    xfp?: string;
  };
  GenerateVaultDescriptor: undefined;
  SetupCollaborativeWallet: undefined;
  EnterSeedScreen: undefined;
  UnlockTapsigner: undefined;
  ChangeTapsignerPin: undefined;
  UTXOSelection: { sender: Wallet | Vault; amount: string; address: string };
  VaultCreationOptions: undefined;
  VaultConfigurationCreation: undefined;
  ScanQRFileRecovery: undefined;
  VaultSetup: {
    isRecreation: Boolean;
    scheme: VaultScheme;
    vaultId?: string;
    isTimeLock?: boolean;
    isAddInheritanceKeyFromParams?: boolean;
  };
  SigningDeviceConfigRecovery: undefined;
  MixProgress: undefined;
  AssignSignerType: undefined;
  AddWallet: undefined;
  CanaryWallets: undefined;
  AssistedKeys: undefined;
  SafeKeepingTips: undefined;
  SafeGuardingTips: undefined;
  MasterRecoveryKey: undefined;
  PersonalCloudBackup: undefined;
  WalletConfigurationFiles: undefined;
  BackupAndRecoveryTips: undefined;
  RecoveryInstruction: undefined;
  LetterOfAttorney: undefined;
  PrintableTemplates: undefined;
  InheritanceTips: undefined;
  RecoveryPhraseTemplate: undefined;
  TrustedContactTemplates: undefined;
  AdditionalSignerDetailsTemplate: undefined;
  ManageSigners: {
    vaultId: string;
    vaultKeys: VaultSigner[];
    addedSigner: Signer;
    addSignerFlow: boolean;
    showModal?: boolean;
    remoteData?: {
      key: string;
      fcm: string;
    };
  };
  AppBackupSettings: undefined;
  BuyBitcoin: undefined;
  EnterWalletPath: undefined;
  DeleteKeys: undefined;
  HandleFile: undefined;
  AssistedWalletTimeline: {
    parentScreen: string;
  };
  AssociateContact: undefined;
  AddContact: undefined;
  ContactProfile: undefined;
  EditContact: undefined;
  ManageTapsignerSettings: undefined;
  SetupPortal: undefined;
  AddReserveKey: undefined;
  ResetInheritanceKey: undefined;
  KeeperConcierge: undefined;
  TechnicalSupport: {
    newTicketId: string;
    ticketCreated: boolean;
    screenName?: string;
    tags?: string[];
  };
  TicketDetails: undefined;
  CreateTicket: undefined;
  ImportContactFile: undefined;
  ContactDetails: undefined;
  ShareQR: undefined;
};

// Usage:
// type ScreenProps = NativeStackScreenProps<AppStackParams, 'ScreenName'>;
// const ScreenName = ({ navigation, route }: ScreenProps) => {
