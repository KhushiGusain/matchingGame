import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import RemoteImage from './RemoteImage';

export default function GameFooter({ onSoundPress, onNextPress }) {
  return (
    <View style={styles.bottomSection}>
      <TouchableOpacity style={styles.soundButton} onPress={onSoundPress}>
        <RemoteImage 
          assetName="sound"
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={onNextPress}
      >
        <RemoteImage 
          assetName="back"
          style={styles.nextButtonIcon}
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