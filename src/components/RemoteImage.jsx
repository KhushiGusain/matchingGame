import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getAssetSource } from '../services/assetService';

const RemoteImage = ({ 
  assetName, 
  style, 
  fallbackSource, 
  onLoad,
  onError 
}) => {
  const imageSource = getAssetSource(assetName);

  if (!imageSource) {
    return (
      <View style={[styles.errorContainer, style]}>
        <Text style={styles.errorText}>Image not found</Text>
      </View>
    );
  }

  return (
    <Image
      source={imageSource}
      style={style}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 12,
    color: '#d32f2f',
  },
});

export default RemoteImage; 