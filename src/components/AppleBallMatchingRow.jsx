import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RemoteImage from './RemoteImage';

export default function AppleBallMatchingRow({ 
  assetName, 
  leftDotId, 
  rightDotId, 
  text, 
  activeDot, 
  onDotLayout 
}) {
  return (
    <View style={styles.matchingRow}>
      <RemoteImage 
        assetName={assetName}
        style={styles.itemImage}
        fallbackSource={require('../../assets/images/apple.png')}
      />
      <View style={styles.dotsContainer}>
        <TouchableOpacity 
          style={[
            styles.dot, 
            activeDot === leftDotId && styles.activeDot
          ]}
          onLayout={(e) => onDotLayout(leftDotId, e)}
          activeOpacity={0.7}
        />
        <TouchableOpacity 
          style={[
            styles.dot, 
            activeDot === rightDotId && styles.activeDot
          ]}
          onLayout={(e) => onDotLayout(rightDotId, e)}
          activeOpacity={0.7}
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.itemText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  matchingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 40,
    paddingHorizontal: 10,
    marginVertical: 50,
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 150,
    marginHorizontal: 40,
  },
  dot: {
    width: 25,
    height: 25,
    backgroundColor: '#000000',
    borderRadius: 12.5,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeDot: {
    backgroundColor: '#FF6B6B',
    transform: [{ scale: 1.3 }],
  },
  textBox: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    minWidth: 120,
    maxWidth: 200,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
}); 