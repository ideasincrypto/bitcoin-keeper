import React, { useContext, useMemo, useRef, useState } from 'react';
import { StyleSheet, Animated, SafeAreaView, TouchableOpacity } from 'react-native';
import { Box, Text } from 'native-base';

import LinearGradient from 'react-native-linear-gradient';
import PagerView, {
  PagerViewOnPageScrollEventData,
  PagerViewOnPageSelectedEventData,
} from 'react-native-pager-view';
import { RFValue } from 'react-native-responsive-fontsize';

import openLink from 'src/utils/OpenLink';
import { LocalizationContext } from 'src/common/content/LocContext';
import Illustration_1 from 'src/assets/images/svgs/illustration_1.svg';
import Illustration_2 from 'src/assets/images/svgs/illustration_2.svg';
import Illustration_3 from 'src/assets/images/svgs/illustration_3.svg';
import Illustration_4 from 'src/assets/images/svgs/illustration_4.svg';
import Illustration_5 from 'src/assets/images/svgs/illustration_5.svg';
import Illustration_6 from 'src/assets/images/svgs/illustration_6.svg';
import OnboardingSlideComponent from 'src/components/onBoarding/OnboardingSlideComponent';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
const indexData = [
  {
    '1': 1,
  },
  {
    '2': 2,
  },
  {
    '3': 3,
  },
  {
    '4': 4,
  },
  {
    '5': 5,
  },
  {
    '6': 6,
  },
];
const OnBoardingSlides = ({ navigation }) => {
  const { translations } = useContext(LocalizationContext);
  const onboarding = translations['onboarding'];
  const common = translations['common'];

  const [currentPosition, setCurrentPosition] = useState(0);

  const ref = useRef<PagerView>(null);
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;
  const onPageSelectedPosition = useRef(new Animated.Value(0)).current;

  const onPageScroll = useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
    []
  );

  const onPageSelected = useMemo(
    () =>
      Animated.event<PagerViewOnPageSelectedEventData>(
        [
          {
            nativeEvent: {
              position: onPageSelectedPosition,
            },
          },
        ],
        {
          listener: ({ nativeEvent: { position } }) => {
            setCurrentPosition(position);
          },
          useNativeDriver: true,
        }
      ),
    []
  );
  return (
    <LinearGradient colors={['#00836A', '#073E39']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, margin: 10 }}>
        <Box flex={0.2} justifyContent={'center'}>
          <TouchableOpacity onPress={() => navigation.replace('App')}>
            <Text
              fontSize={RFValue(14)}
              color={'light.white'}
              fontFamily={'heading'}
              textAlign={'right'}
              opacity={0.7}
              mr={5}
            >
              Skip {'>>'}
            </Text>
          </TouchableOpacity>
        </Box>
        <Box>
          <Text
            fontSize={RFValue(20)}
            color={'light.white'}
            fontFamily={'heading'}
            textAlign={'center'}
          >
            Keeper
          </Text>
        </Box>
        <AnimatedPagerView
          initialPage={0}
          ref={ref}
          style={{
            flex: 0.7,
          }}
          onPageScroll={onPageScroll}
          onPageSelected={onPageSelected}
        >
          <OnboardingSlideComponent
            title={onboarding.slide01Title}
            illustration={<Illustration_1 />}
            paragraph={onboarding.slide01Paragraph}
          />
          <OnboardingSlideComponent
            title={onboarding.slide02Title}
            illustration={<Illustration_2 />}
            paragraph={onboarding.slide02Paragraph}
          />
          <OnboardingSlideComponent
            title={onboarding.slide03Title}
            illustration={<Illustration_3 />}
            paragraph={onboarding.slide03Paragraph}
          />
          <OnboardingSlideComponent
            title={onboarding.slide04Title}
            illustration={<Illustration_4 />}
            paragraph={onboarding.slide04Paragraph}
          />
          <OnboardingSlideComponent
            title={onboarding.slide05Title}
            illustration={<Illustration_6 />}
            paragraph={onboarding.slide05Paragraph}
          />
          <OnboardingSlideComponent
            title={onboarding.slide06Title}
            illustration={<Illustration_5 />}
            paragraph={onboarding.slide06Paragraph}
            position={6}
            navigation={navigation}
          />
        </AnimatedPagerView>
        <Box flex={0.1} flexDirection={'row'} m={10} alignItems={'center'}>
          <Box w={'70%'}>
            <TouchableOpacity onPress={() => openLink('https://hexawallet.io/faq/')}>
              <Box
                borderColor={'light.borderColor2'}
                borderWidth={0.7}
                borderRadius={30}
                w={120}
                h={30}
                alignItems={'center'}
              >
                <Text color={'light.borderColor2'} fontSize={RFValue(14)}>
                  {common.learnMore}
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
          {indexData.map((item, index) => {
            return (
              <Box
                key={index}
                style={currentPosition == index ? styles.selectedDot : styles.unSelectedDot}
              />
            );
          })}
        </Box>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OnBoardingSlides;

const styles = StyleSheet.create({
  selectedDot: {
    width: 25,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#E3BE96',
    marginEnd: 5,
  },
  unSelectedDot: {
    width: 6,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#4E5C6A',
    marginEnd: 5,
  },
});
