import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = 180;

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const images = [
    require('../assets/images/banner1.png'),
    require('../assets/images/banner2.png'),
    require('../assets/images/banner1.png'),
    require('../assets/images/banner2.png'),

  ];

  const indicators = images.map((_, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => goToSlide(index)}
      style={[
        styles.indicator,
        {
          backgroundColor: currentImage === index ? '#FF4D6D' : '#E0E0E0',
          width: currentImage === index ? 24 : 8,
        },
      ]}
    />
  ));

  const goToSlide = (index) => {
    // Fade out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentImage(index);
      // Fade in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextImage = (currentImage + 1) % images.length;
      goToSlide(nextImage);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateX: slideAnim },
            ],
          },
        ]}
      >
        <Image
          source={images[currentImage]}
          style={styles.image}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
          style={styles.gradient}
        />
      </Animated.View>

      {/* Decorative elements */}
      <View style={styles.decorativeCorner1} />
      <View style={styles.decorativeCorner2} />
      
      {/* Indicators */}
      <View style={styles.indicatorContainer}>
        {indicators}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: BANNER_HEIGHT,
    width: width * 0.92,
    alignSelf: 'center',
    marginVertical: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BANNER_HEIGHT / 2,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    transition: 'all 0.3s ease',
  },
  decorativeCorner1: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRightWidth: 2,
    borderTopWidth: 2,
  },
  decorativeCorner2: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    width: 40,
    height: 40,
    borderColor: 'rgba(255,255,255,0.3)',
    borderLeftWidth: 2,
    borderBottomWidth: 2,
  },
});

export default Banner;