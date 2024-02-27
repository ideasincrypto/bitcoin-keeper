import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SegmentedArc } from '@shipt/segmented-arc-for-react-native';
import Fonts from 'src/constants/Fonts';
import { useColorMode } from 'native-base';
import customTheme from 'src/navigation/themes';
import { calculateIndicatorScale } from 'src/utils/feeeInisghtUtil';
interface Props {
  percentageDifference: number;
}

const FeeIndicator = (props: Props) => {
  const range = ['10', '20', '30', '40', '50'];
  const { percentageDifference } = props;
  const { colorMode } = useColorMode();


  const segments = [
    {
      scale: 0.25,
      filledColor: customTheme.colors[colorMode].forestGreen,
      emptyColor: customTheme.colors[colorMode].forestGreen,
      data: { label: 'Blue' },
    },
    {
      scale: 0.25,
      filledColor: customTheme.colors[colorMode].amber,
      emptyColor: customTheme.colors[colorMode].amber,
      data: { label: 'Yellow' },
    },
    {
      scale: 0.25,
      filledColor: customTheme.colors[colorMode].amber,
      emptyColor: customTheme.colors[colorMode].amber,
      data: { label: 'Yellow' },
    },
    {
      scale: 0.25,
      filledColor: customTheme.colors[colorMode].errorRed,
      emptyColor: customTheme.colors[colorMode].errorRed,
      data: { label: 'Red' },
    },
  ];

  return (
    <View style={styles.container}>
      <SegmentedArc
        segments={segments}
        fillValue={calculateIndicatorScale(percentageDifference)}
        isAnimated={true}
        animationDelay={1000}
        showArcRanges={false}
        ranges={range}
        radius={40}
        rangesTextColor="gray"
        rangesTextStyle={styles.rangeTextStyle}
        capInnerColor={customTheme.colors[colorMode].primaryGreen}
        capOuterColor={customTheme.colors[colorMode].OffWhite}
      />
    </View>
  );
};

export default FeeIndicator;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    position: 'absolute',
    top: -10,
  },
  rangeTextStyle: {
    fontSize: 12,
    fontFamily: Fonts.FiraSansCondensedBold,
  },
});