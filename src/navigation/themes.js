import Colors from 'src/theme/Colors';
import { extendTheme } from 'native-base';
import Fonts from 'src/constants/Fonts';

export const customTheme = extendTheme({
  fontConfig: {
    FiraSans: {
      100: {
        normal: Fonts.FiraSansCondensedLight,
        italic: Fonts.FiraSansLightItalic,
      },
      200: {
        normal: Fonts.FiraSansCondensedRegular,
        italic: Fonts.FiraSansCondensedItalic,
      },
      300: {
        normal: Fonts.FiraSansCondensedBold,
        italic: Fonts.FiraSansCondensedBoldItalic,
      },
      400: {
        normal: Fonts.FiraSansCondensedRegular,
        italic: Fonts.FiraSansCondensedItalic,
      },
      500: {
        normal: Fonts.FiraSansCondensedRegular,
        italic: Fonts.FiraSansCondensedItalic,
      },
      600: {
        normal: Fonts.FiraSansCondensedRegular,
        italic: Fonts.FiraSansCondensedItalic,
      },
      700: {
        normal: Fonts.FiraSansCondensedRegular,
        italic: Fonts.FiraSansCondensedItalic,
      },
      800: {
        normal: Fonts.FiraSansCondensedRegular,
        italic: Fonts.FiraSansCondensedItalic,
      },
      900: {
        normal: Fonts.FiraSansCondensedRegular,
        italic: Fonts.FiraSansCondensedItalic,
      },
    },
  },
  fonts: {
    heading: 'FiraSans',
    body: 'FiraSans',
    mono: 'FiraSans',
  },
  colors: {
    light: {
      primaryGreen: Colors.GenericViridian,
      primaryBackground: Colors.LightYellow,
      primaryGreenBackground: Colors.pantoneGreen,
      mainBackground: Colors.LightWhite,
      modalGreenBackground: Colors.pantoneGreen,
      modalGreenContent: Colors.White,
      modalWhiteBackground: Colors.LightWhite,
      modalGreenTitle: Colors.Black,
      modalAccentTitle: Colors.Black,
      modalWhiteButton: Colors.White,
      modalGreenLearnMore: Colors.CastelGreenDark,
      greenButtonBackground: Colors.pantoneGreen,
      qrBorderColor: Colors.LightYellow,
      coffeeBackground: Colors.Coffee,
      yellowButtonBackground: Colors.MacaroniAndCheese,
      yellowButtonTextColor: Colors.Coffee,
      white: Colors.White,
      primaryText: Colors.RichBlack,
      secondaryText: Colors.GraniteGray,
      learnMoreBorder: Colors.Coffee,
      textBlack: Colors.DarkGreen,
      greenText: Colors.RichGreen,
      greenText2: Colors.TropicalRainForest,
      accent: Colors.MacaroniAndCheese,
      lightAccent: Colors.MacaroniAndCheese,
      QrCode: Colors.WhiteCoffee,
      recieverAddress: Colors.DimGray,
      textInputBackground: Colors.Isabelline,
      secondaryBackground: Colors.Isabelline,
      GreyText: Colors.Feldgrau,
      dateText: Colors.HookerGreen,
      Border: Colors.CastletonGreen,
      textColor: Colors.LightGray,
      textColor2: Colors.DeepSpaceSparkle,
      headerText: Colors.pantoneGreen,
      copyBackground: Colors.LightGray,
      sendCardHeading: Colors.BlueGreen,
      Glass: Colors.Glass,
      TorLable: Colors.Menthol,
      divider: Colors.GrayX11,
      errorRed: Colors.CarmineRed,
      textWallet: Colors.MediumJungleGreen,
      indicator: Colors.OutrageousOrange,
      addTransactionText: Colors.PineTree,
      sendMax: Colors.JackoBean,
      inActiveMsg: Colors.SpanishGray,
      vaultCardText: Colors.Bisque,
      satsDark: Colors.DeepSpaceGreen,
      gradientStart: Colors.GenericViridian, // linearGradient
      gradientEnd: Colors.RichGreen, // linearGradient
      error: Colors.CongoPink,
      black: Colors.Black,
      fadedGray: Colors.FadedGray,
      fadedblue: Colors.FadeBlue,
      dustySageGreen: Colors.DustySageGreen,
      forestGreen: Colors.ForestGreen,
      pantoneGreen: Colors.pantoneGreen,
      seashellWhite: Colors.Seashell,
      Champagne: Colors.Champagne,
      RussetBrown: Colors.RussetBrown,
      GreenishGrey: Colors.GreenishGrey,
      Ivory: Colors.Ivory,
    },
    dark: {
      primaryGreen: Colors.GenericViridian,
      primaryBackground: Colors.LightYellowDark,
      primaryGreenBackground: Colors.LightYellowDark,
      mainBackground: Colors.LightWhite,
      modalGreenBackground: Colors.LightYellowDark,
      modalGreenContent: Colors.White,
      modalWhiteBackground: Colors.LightYellowDark,
      modalGreenTitle: Colors.TropicalRainForestDark,
      modalAccentTitle: Colors.GoldCrayola,
      modalWhiteButton: Colors.pantoneGreenDark,
      modalGreenLearnMore: Colors.LightYellowDark,
      greenButtonBackground: Colors.ForestGreenDark,
      qrBorderColor: Colors.White,
      coffeeBackground: Colors.CoffeeDark,
      yellowButtonBackground: Colors.LightYellowDark,
      yellowButtonTextColor: Colors.White,
      white: Colors.Black,
      primaryText: Colors.RichBlackDark,
      secondaryText: Colors.GraniteGrayDark,
      learnMoreBorder: Colors.GoldCrayola,
      textBlack: Colors.DarkGreen,
      greenText: Colors.RichGreenDark,
      greenText2: Colors.TropicalRainForestDark,
      accent: Colors.MacaroniAndCheese,
      lightAccent: Colors.GoldCrayola,
      QrCode: Colors.WhiteCoffee,
      recieverAddress: Colors.DimGray,
      textInputBackground: Colors.Isabelline,
      secondaryBackground: Colors.Isabelline,
      GreyText: Colors.RichBlackDark,
      dateText: Colors.HookerGreen,
      Border: Colors.CastletonGreen,
      textColor: Colors.LightGray,
      textColor2: Colors.DeepSpaceSparkleDark,
      headerText: Colors.pantoneGreen,
      copyBackground: Colors.LightGray,
      sendCardHeading: Colors.BlueGreen,
      Glass: Colors.Glass,
      TorLable: Colors.Menthol,
      divider: Colors.GrayX11,
      errorRed: Colors.CarmineRed,
      textWallet: Colors.MediumJungleGreen,
      indicator: Colors.OutrageousOrange,
      addTransactionText: Colors.PineTree,
      sendMax: Colors.JackoBean,
      inActiveMsg: Colors.SpanishGray,
      vaultCardText: Colors.Bisque,
      satsDark: Colors.DeepSpaceGreen,
      gradientStart: Colors.GenericViridian, // linearGradient
      gradientEnd: Colors.DeepAquamarine, // linearGradient
      error: Colors.CongoPink,
      black: Colors.White,
      fadedGray: Colors.FadedGray,
      fadedblue: Colors.FadeBlue,
      dustySageGreen: Colors.DustySageGreen,
      forestGreen: Colors.ForestGreen,
      pantoneGreen: Colors.pantoneGreenDark,
      seashellWhite: Colors.SeashellDark,
      RussetBrown: Colors.RussetBrown,
      Ivory: Colors.Ivory,
      GreenishGrey: Colors.GreenishGrey,
    },
  },
  config: {
    initialColorMode: 'light',
  },
});

export default customTheme;
