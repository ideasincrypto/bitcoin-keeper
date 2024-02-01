import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Box, useColorMode } from 'native-base';
import Text from 'src/components/KeeperText';
import { windowWidth } from 'src/constants/responsive';

type FooterItem = {
  Icon: any;
  text: string;
  onPress: () => void;
  disabled?: boolean;
  hideItem?: boolean;
};
export function KeeperFooter({
  items,
  wrappedScreen = true,
  marginX = 10,
}: {
  items: FooterItem[];
  marginX?: number;
  wrappedScreen?: boolean;
}) {
  const { colorMode } = useColorMode();
  const footerItemsToRender = items.filter((item) => !item.hideItem);
  return (
    <Box bottom={wrappedScreen ? -10 : undefined}>
      <Box style={styles.border} borderColor={`${colorMode}.GreyText`} />
      <Box
        justifyContent={footerItemsToRender.length > 2 ? 'space-between' : 'space-around'}
        marginX={marginX}
        style={styles.footerItems}
      >
        {footerItemsToRender.map((item) => {
          return (
            <TouchableOpacity
              testID={`btn_${item.text}`}
              key={item.text}
              style={styles.IconWrapper}
              onPress={item.onPress}
              disabled={item.disabled}
            >
              <Box backgroundColor={`${colorMode}.RussetBrown`} style={styles.circle}>
                <item.Icon />
              </Box>
              <Text
                color={`${colorMode}.primaryText`}
                style={[styles.footerText, { maxWidth: windowWidth / footerItemsToRender.length }]}
                numberOfLines={2}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Box>
    </Box>
  );
}

export default KeeperFooter;

const styles = StyleSheet.create({
  footerItems: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 12,
    letterSpacing: 0.84,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  IconWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 7,
  },
  border: {
    borderWidth: 0.5,
    opacity: 0.2,
  },
  circle: {
    width: 38,
    height: 38,
    borderRadius: 38 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
