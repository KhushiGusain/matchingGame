import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function InitialScreen({ navigation }) {
  const [isReady, setIsReady] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Force portrait mode when component mounts
    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        // Add a small delay for smooth transition
        setTimeout(() => {
          setIsReady(true);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 300);
      } catch (error) {
        console.log('Orientation lock error:', error);
        setIsReady(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    };
    
    lockOrientation();

    // Also handle when screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      lockOrientation();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation, fadeAnim]);

  if (!isReady) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: '#FFF8DC' }]}>
        <View style={styles.container}>
          {/* Loading placeholder */}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.titleContainer}>
          <Text style={styles.welcomeText}>Welcome to the</Text>
          <Text style={styles.emphasisText}>Matching Game!</Text>
        </View>
        
        <Image 
          source={require('../../assets/images/cat.png')}
          style={styles.catImage}
          resizeMode="contain"
        />
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            // Fade out before navigation
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              navigation.navigate('Loading');
            });
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white', // Light cream-yellow background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: 'black', 
    textAlign: 'center',
    marginBottom: 12,
  },
  emphasisText: {
    color: '#9370DB', // Purple color to match button
    fontSize: 48,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  catImage: {
    width: 300,
    height: 300,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#9370DB', // Medium purple
    paddingVertical: 22,
    paddingHorizontal: 60,
    borderRadius: 30,
    minWidth: 280,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#7B68EE',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
  },
}); 