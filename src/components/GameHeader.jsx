import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RemoteImage from './RemoteImage';

export default function GameHeader({ instruction, onHomePress, onStarPress }) {
  return (
    <View style={styles.topSection}>
      <TouchableOpacity 
        style={styles.homeButton}
        onPress={onHomePress}
      >
        <RemoteImage 
          assetName="home"
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
      
      <Text style={styles.instruction}>{instruction}</Text>
      
      <TouchableOpacity style={styles.starButton} onPress={onStarPress}>
        <RemoteImage 
          assetName="star"
          style={styles.starIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    height: 70,
    paddingHorizontal: 5,
  },
  homeButton: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instruction: {
    fontSize: 40,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  starButton: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 3,
    borderColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: 70,
    height: 70,
  },
  starIcon: {
    width: 30,
    height: 30,
  },
}); 