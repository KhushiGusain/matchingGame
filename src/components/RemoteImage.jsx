import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getAssetUrl } from '../services/assetService';

const RemoteImage = ({ 
  assetName, 
  style, 
  fallbackSource, 
  showLoading = true,
  onLoad,
  onError 
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const url = await getAssetUrl(assetName);
        
        if (url) {
          setImageUrl(url);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(`Error loading asset ${assetName}:`, err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [assetName]);

  if (loading && showLoading) {
    return (
      <View style={[styles.loadingContainer, style]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error && fallbackSource) {
    return (
      <Image
        source={fallbackSource}
        style={style}
        onLoad={onLoad}
        onError={onError}
      />
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, style]}>
        <Text style={styles.errorText}>Failed to load</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: imageUrl }}
      style={style}
      onLoad={onLoad}
      onError={(err) => {
        setError(true);
        onError?.(err);
      }}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 12,
    color: '#666',
  },
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