import { Box, Pressable, useColorMode } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import RightArrowIcon from 'src/assets/images/icon_arrow.svg';
import { hp } from 'src/constants/responsive';
import { useEffect, useState } from 'react';
import Colors from 'src/theme/Colors';
import Text from 'src/components/KeeperText';
import TickIcon from 'src/assets/images/icon_check.svg';
import { Signer } from 'src/services/wallets/interfaces/vault';

type Props = {
  label: string;
  options: Signer[];
  selectedOption: Signer | null;
  onOptionSelect: (option: Signer) => void;
};

function KeyDropdown({ label, options, selectedOption, onOptionSelect }: Props) {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedOption, setInternalSelectedOption] = useState<Signer | null>(
    selectedOption
  );

  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Signer) => {
    setInternalSelectedOption(option);
    onOptionSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedOption) {
      setInternalSelectedOption(selectedOption);
    }
  }, [selectedOption]);

  return (
    <Box>
      <Pressable onPress={handlePress}>
        <Box backgroundColor={`${colorMode}.seashellWhite`} style={styles.dropdownContainer}>
          <Text
            medium
            color={isOpen ? `${colorMode}.greenTextDisabled` : `${colorMode}.greenText`}
            style={styles.labelText}
          >
            {selectedOption?.signerName || label}
          </Text>

          <Box style={styles.arrowContainer}>
            <Box backgroundColor={`${colorMode}.dropdownSeparator`} style={styles.emptyView} />
            <Box
              style={[
                styles.icArrow,
                {
                  transform: [{ rotate: isOpen ? '-90deg' : '90deg' }],
                },
              ]}
            >
              <RightArrowIcon />
            </Box>
          </Box>
        </Box>
      </Pressable>
      {isOpen && (
        <Box backgroundColor={`${colorMode}.seashellWhite`} style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={option?.masterFingerprint}
              onPress={() => handleOptionSelect(option)}
            >
              <Box
                style={styles.optionContainer}
                borderBottomWidth={index === options.length - 1 ? 0 : 1}
              >
                <Text
                  color={
                    internalSelectedOption?.masterFingerprint === option?.masterFingerprint
                      ? `${colorMode}.greenText`
                      : `${colorMode}.DarkGreyText`
                  }
                  style={styles.optionText}
                >
                  {`${option.signerName}`}
                </Text>
                {internalSelectedOption?.masterFingerprint === option?.masterFingerprint && (
                  <TickIcon />
                )}
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default KeyDropdown;

const styles = StyleSheet.create({
  dropdownContainer: {
    borderRadius: 10,
    height: hp(50),
    marginHorizontal: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowContainer: {
    flexDirection: 'row',
    height: '100%',
    gap: 20,
  },
  labelText: {
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.39,
  },
  optionText: {
    fontSize: 13,
    letterSpacing: 0.39,
    paddingBottom: 10,
    paddingTop: 5,
  },
  emptyView: {
    height: hp(23),
    alignSelf: 'center',
    width: 2,
    opacity: 0.23,
  },
  icArrow: {
    alignSelf: 'center',
  },
  optionsContainer: {
    width: '95%',
    alignSelf: 'center',
    zIndex: 999,
    marginTop: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Colors.SilverMist,
  },
});
