import React, { useContext, useEffect, useState } from 'react';
import { Box, useColorMode } from 'native-base';
import ReactNativeBiometrics from 'react-native-biometrics';
import ScreenWrapper from 'src/components/ScreenWrapper';
import KeeperHeader from 'src/components/KeeperHeader';
import OptionCard from 'src/components/OptionCard';
import { LocalizationContext } from 'src/context/Localization/LocContext';
import Switch from 'src/components/Switch/Switch';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import LoginMethod from 'src/models/enums/LoginMethod';
import { changeLoginMethod } from 'src/store/sagaActions/login';
import ToastErrorIcon from 'src/assets/images/toast_error.svg';
import useToastMessage from 'src/hooks/useToastMessage';
import { setThemeMode } from 'src/store/reducers/settings';
import ThemeMode from 'src/models/enums/ThemeMode';
import { StyleSheet } from 'react-native';
import { hp } from 'src/constants/responsive';

const RNBiometrics = new ReactNativeBiometrics();

function PrivacyAndDisplay({ navigation }) {
    const { colorMode, toggleColorMode } = useColorMode();
    const dispatch = useAppDispatch();
    const { showToast } = useToastMessage();

    const [sensorType, setSensorType] = useState('Biometrics');
    const { translations, formatString } = useContext(LocalizationContext);
    const { settings } = translations;
    const { loginMethod }: { loginMethod: LoginMethod } = useAppSelector((state) => state.settings);

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        if (colorMode === 'dark') {
            dispatch(setThemeMode(ThemeMode.DARK));
        } else {
            dispatch(setThemeMode(ThemeMode.LIGHT));
        }
    }, [colorMode]);

    const init = async () => {
        try {
            const { available, biometryType } = await RNBiometrics.isSensorAvailable();
            if (available) {
                const type =
                    biometryType === 'TouchID'
                        ? 'Touch ID'
                        : biometryType === 'FaceID'
                            ? 'Face ID'
                            : biometryType;
                setSensorType(type);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeLoginMethod = async () => {
        try {
            const { available } = await RNBiometrics.isSensorAvailable();
            if (available) {
                if (loginMethod === LoginMethod.PIN) {
                    const { keysExist } = await RNBiometrics.biometricKeysExist();
                    if (keysExist) {
                        await RNBiometrics.createKeys();
                    }
                    const { publicKey } = await RNBiometrics.createKeys();
                    const { success } = await RNBiometrics.simplePrompt({
                        promptMessage: 'Confirm your identity',
                    });
                    if (success) {
                        dispatch(changeLoginMethod(LoginMethod.BIOMETRIC, publicKey));
                    }
                } else {
                    dispatch(changeLoginMethod(LoginMethod.PIN));
                }
            } else {
                showToast(
                    'Biometrics not enabled.\nPlease go to setting and enable it',
                    <ToastErrorIcon />
                );
            }
        } catch (error) {
            console.log(error);
        }
    };
    const changeThemeMode = () => {
        toggleColorMode();
    };
    return (
        <ScreenWrapper backgroundcolor={`${colorMode}.primaryBackground`}>
            <KeeperHeader
                title={settings.PrivacyDisplay}
                subtitle={settings.PrivacyDisplaySubTitle}
            />
            <Box style={styles.wrapper}>
                <OptionCard
                    title={sensorType}
                    description={formatString(settings.UseBiometricSubTitle, sensorType)}
                    callback={() => onChangeLoginMethod()}
                    Icon={
                        <Switch
                            onValueChange={(value) => onChangeLoginMethod()}
                            value={loginMethod === LoginMethod.BIOMETRIC}
                            testID="switch_biometrics"
                        />
                    }
                />
                <OptionCard
                    title={settings.DarkMode}
                    description={settings.DarkModeSubTitle}
                    callback={() => changeThemeMode()}
                    Icon={
                        <Switch
                            onValueChange={(value) => changeThemeMode()}
                            value={colorMode === 'dark'}
                            testID="switch_darkmode"
                        />
                    }
                />
            </Box>
        </ScreenWrapper>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        marginTop: hp(35)
    }
})
export default PrivacyAndDisplay