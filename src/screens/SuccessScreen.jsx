import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SuccessScreen({ navigation }) {
  const route = useRoute();
  const { score = 0, timeTaken = 0, startTime } = route.params || {};
  
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0.9)).current;

  // Calculate time taken if not provided
  const calculateTimeTaken = () => {
    if (timeTaken > 0) {
      return timeTaken;
    }
    if (startTime) {
      const gameEndTime = Date.now();
      return Math.floor((gameEndTime - startTime) / 1000);
    }
    return 0;
  };

  const finalTimeTaken = calculateTimeTaken();
  const finalScore = score || 0;

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Animate success title with bounce
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // Animate content fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Animate button with spring
    Animated.spring(bounceAnim, {
      toValue: 1,
      tension: 80,
      friction: 8,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Improved decorative elements with better positioning */}
        <View style={styles.star1} />
        <View style={styles.star2} />
        <View style={styles.star3} />
        <View style={styles.star4} />
        <View style={styles.star5} />
        <View style={styles.star6} />
        <View style={styles.dot1} />
        <View style={styles.dot2} />
        <View style={styles.dot3} />
        <View style={styles.dot4} />
        <View style={styles.dot5} />
        <View style={styles.dot6} />
        <View style={styles.dot7} />
        <View style={styles.dot8} />

        {/* SUCCESS Title with improved animation */}
        <Animated.View 
          style={[
            styles.titleContainer,
            { 
              transform: [{ scale: scaleAnim }],
              opacity: fadeAnim 
            }
          ]}
        >
          <Text style={styles.successTitle}>SUCCESS!</Text>
        </Animated.View>

        {/* Matching Master Badge with improved styling */}
        <Animated.View style={[styles.bannerContainer, { opacity: fadeAnim }]}>
          <View style={styles.masterBanner}>
            <Text style={styles.masterText}>Congratulations, You have completed the game!</Text>
          </View>
        </Animated.View>

        {/* Score and Time Section with better cards */}
        <Animated.View style={[styles.scoreTimeContainer, { opacity: fadeAnim }]}>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>SCORE</Text>
            <Text style={styles.scoreValue}>{finalScore}/4</Text>
          </View>
          
          <View style={styles.timeBox}>
            <Text style={styles.timeLabel}>TIME TAKEN</Text>
            <Text style={styles.timeValue}>{formatTime(finalTimeTaken)}</Text>
          </View>
        </Animated.View>

        {/* Play Again Button with improved styling */}
        <Animated.View 
          style={[
            styles.buttonContainer,
            { 
              opacity: fadeAnim,
              transform: [{ scale: bounceAnim }]
            }
          ]}
        >
          <TouchableOpacity 
            style={styles.playAgainButton}
            onPress={() => navigation.navigate('Initial')}
            activeOpacity={0.8}
          >
            <Text style={styles.playAgainText}>PLAY AGAIN</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF5E6',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  // Improved decorative stars with better distribution
  star1: {
    position: 'absolute',
    top: height * 0.08,
    left: width * 0.08,
    width: 8,
    height: 8,
    backgroundColor: '#FFD700',
    borderRadius: 4,
    transform: [{ rotate: '45deg' }],
  },
  star2: {
    position: 'absolute',
    top: height * 0.15,
    right: width * 0.12,
    width: 6,
    height: 6,
    backgroundColor: '#FFD700',
    borderRadius: 3,
    transform: [{ rotate: '45deg' }],
  },
  star3: {
    position: 'absolute',
    top: height * 0.22,
    left: width * 0.15,
    width: 10,
    height: 10,
    backgroundColor: '#FFD700',
    borderRadius: 5,
    transform: [{ rotate: '45deg' }],
  },
  star4: {
    position: 'absolute',
    bottom: height * 0.15,
    right: width * 0.1,
    width: 7,
    height: 7,
    backgroundColor: '#FFD700',
    borderRadius: 3.5,
    transform: [{ rotate: '45deg' }],
  },
  star5: {
    position: 'absolute',
    bottom: height * 0.22,
    left: width * 0.12,
    width: 9,
    height: 9,
    backgroundColor: '#FFD700',
    borderRadius: 4.5,
    transform: [{ rotate: '45deg' }],
  },
  star6: {
    position: 'absolute',
    top: height * 0.28,
    right: width * 0.08,
    width: 5,
    height: 5,
    backgroundColor: '#FFD700',
    borderRadius: 2.5,
    transform: [{ rotate: '45deg' }],
  },
  // Improved dots positioning
  dot1: {
    position: 'absolute',
    top: height * 0.06,
    right: width * 0.25,
    width: 3,
    height: 3,
    backgroundColor: '#FFD700',
    borderRadius: 1.5,
  },
  dot2: {
    position: 'absolute',
    top: height * 0.12,
    left: width * 0.05,
    width: 2,
    height: 2,
    backgroundColor: '#FFD700',
    borderRadius: 1,
  },
  dot3: {
    position: 'absolute',
    top: height * 0.18,
    right: width * 0.05,
    width: 4,
    height: 4,
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  dot4: {
    position: 'absolute',
    bottom: height * 0.12,
    left: width * 0.08,
    width: 3,
    height: 3,
    backgroundColor: '#FFD700',
    borderRadius: 1.5,
  },
  dot5: {
    position: 'absolute',
    bottom: height * 0.18,
    right: width * 0.2,
    width: 2,
    height: 2,
    backgroundColor: '#FFD700',
    borderRadius: 1,
  },
  dot6: {
    position: 'absolute',
    top: height * 0.08,
    left: width * 0.3,
    width: 3,
    height: 3,
    backgroundColor: '#FFD700',
    borderRadius: 1.5,
  },
  dot7: {
    position: 'absolute',
    bottom: height * 0.08,
    left: width * 0.25,
    width: 2,
    height: 2,
    backgroundColor: '#FFD700',
    borderRadius: 1,
  },
  dot8: {
    position: 'absolute',
    top: height * 0.25,
    right: width * 0.25,
    width: 4,
    height: 4,
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  successTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#9B59B6',
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(155, 89, 182, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bannerContainer: {
    marginBottom: 20,
  },

  masterText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'black',
    textAlign: 'center',
    letterSpacing: 1,
  },
  scoreTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
    gap: 12,
  },
  scoreBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#9B59B6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  timeBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#9B59B6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#8E44AD',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  scoreValue: {
    fontSize: 35,
    fontWeight: '900',
    color: '#9B59B6',
  },
  timeLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#8E44AD',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  timeValue: {
    fontSize: 35,
    fontWeight: '900',
    color: '#9B59B6',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  playAgainButton: {
    backgroundColor: '#9B59B6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 16,
    alignItems: 'center',
    width: 180,
    height: 50,
    justifyContent: 'center',
    shadowColor: '#9B59B6',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  playAgainText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
  },
});