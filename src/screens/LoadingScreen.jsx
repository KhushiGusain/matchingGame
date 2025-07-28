import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const funFacts = [
  "Cats sleep for 12-16 hours a day! 🐱",
  "Apples float in water! 🍎",
  "Your heart beats 100,000 times every day! ❤️",
  "Bananas are berries! 🍌",
  "Octopuses have three hearts! 🐙",
  "A group of butterflies is called a flutter! 🦋",
  "Honey never spoils! 🍯",
  "A day on Venus is longer than a year! 🌟",
  "A group of flamingos is called a flamboyance! 🦩",
  "Your brain is more active when sleeping! 🧠"
];

export default function LoadingScreen({ navigation }) {
  const [currentFact, setCurrentFact] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Create animated values for each dot
  const dot1Anim = useRef(new Animated.Value(1)).current;
  const dot2Anim = useRef(new Animated.Value(1)).current;
  const dot3Anim = useRef(new Animated.Value(1)).current;
  const dot4Anim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Force landscape mode
    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } catch (error) {
        console.log('Orientation lock error:', error);
      }
    };
    
    lockOrientation();

    // Pick one random fact
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setCurrentFact(randomFact);

    // Start fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Start dot animations with staggered timing
    const startDotAnimations = () => {
      // Create pulsing animation for each dot
      const pulseAnimation = (animValue) => {
        return Animated.sequence([
          Animated.timing(animValue, {
            toValue: 1.5,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]);
      };

      // Stagger the animations to create a wave effect
      Animated.stagger(150, [
        pulseAnimation(dot1Anim),
        pulseAnimation(dot2Anim),
        pulseAnimation(dot3Anim),
        pulseAnimation(dot4Anim),
      ]).start(() => {
        // Repeat the animation
        startDotAnimations();
      });
    };

    startDotAnimations();

    // Navigate to game after 4 seconds
    const navigationTimer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('Game');
      });
    }, 4000);

    return () => {
      clearTimeout(navigationTimer);
    };
  }, [navigation, fadeAnim, dot1Anim, dot2Anim, dot3Anim, dot4Anim]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* Fact Box */}
        <View style={styles.factBox}>
          <Text style={styles.factHeading}>Did You Know?</Text>
          <Text style={styles.factText}>{currentFact}</Text>
        </View>

        {/* Loading Section */}
        <View style={styles.loadingSection}>
          <Text style={styles.loadingTitle}>GAME STARTING</Text>
          <View style={styles.loadingDots}>
            <Animated.View 
              style={[
                styles.dot, 
                { 
                  transform: [{ scale: dot1Anim }],
                  opacity: dot1Anim
                }
              ]} 
            />
            <Animated.View 
              style={[
                styles.dot, 
                { 
                  transform: [{ scale: dot2Anim }],
                  opacity: dot2Anim
                }
              ]} 
            />
            <Animated.View 
              style={[
                styles.dot, 
                { 
                  transform: [{ scale: dot3Anim }],
                  opacity: dot3Anim
                }
              ]} 
            />
            <Animated.View 
              style={[
                styles.dot, 
                { 
                  transform: [{ scale: dot4Anim }],
                  opacity: dot4Anim
                }
              ]} 
            />
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8DC',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  factBox: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    borderRadius: 20,
    marginBottom: 30,
    borderWidth: 3,
    borderColor: '#9370DB',
    minWidth: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  factHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#9370DB',
    marginBottom: 15,
    textAlign: 'center',
  },
  factText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    lineHeight: 40,
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#20B2AA', // Teal color like in the reference
    marginHorizontal: 8,
  },
  loadingSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9370DB',
    textAlign: 'center',
    marginBottom: 20,
  },
}); 