import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function GameFooter({ onSoundPress, onNextPress }) {
  return (
    <View style={styles.bottomSection}>
      <TouchableOpacity style={styles.soundButton} onPress={onSoundPress}>
        <Image 
          source={require('../../assets/images/sound.png')}
          style={styles.buttonIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={onNextPress}
      >
        <Image 
          source={require('../../assets/images/back.png')}
          style={styles.nextButtonIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    marginTop: 15,
    paddingHorizontal: 5,
  },
  soundButton: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: 70,
    height: 70,
  },
  nextButtonIcon: {
    width: 70,
    height: 70,
  },
}); 