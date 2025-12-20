import React, { useRef, useEffect } from 'react';
import { Animated, PanResponder, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import type { Profile } from '../data/profiles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 120;
const SWIPE_OUT_DURATION = 250;

type Props = {
  profile: Profile;
  onSwipeLeft: (p: Profile) => void;
  onSwipeRight: (p: Profile) => void;
  isTop?: boolean;
};

const Card: React.FC<Props> = ({ profile, onSwipeLeft, onSwipeRight, isTop = false }) => {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: ['-20deg', '0deg', '20deg'],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    position.setValue({ x: 0, y: 0 });
  }, [profile]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isTop,
      onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], { useNativeDriver: false }),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gesture.dy },
            duration: SWIPE_OUT_DURATION,
            useNativeDriver: false
          }).start(() => onSwipeRight(profile));
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy },
            duration: SWIPE_OUT_DURATION,
            useNativeDriver: false
          }).start(() => onSwipeLeft(profile));
        } else {
          Animated.spring(position, { toValue: { x: 0, y: 0 }, friction: 5, useNativeDriver: false }).start();
        }
      }
    })
  ).current;

  const animatedCardStyle = {
    transform: [...position.getTranslateTransform(), { rotate }],
  };

  return (
    <Animated.View style={[styles.card, animatedCardStyle]} {...(isTop ? panResponder.panHandlers : {})}>
      <Image source={{ uri: profile.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>
          {profile.name}, {profile.age}
        </Text>
        <Text style={styles.job}>{profile.job}</Text>
        <Text style={styles.bio} numberOfLines={3}>
          {profile.bio}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH - 40,
    marginHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 420
  },
  info: {
    padding: 12,
    backgroundColor: '#fff'
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111'
  },
  job: {
    fontSize: 14,
    color: '#ff5864',
    marginTop: 4
  },
  bio: {
    marginTop: 8,
    color: '#666',
    fontSize: 14
  }
});

export default Card;