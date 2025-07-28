// Asset name mapping for remote loading
export const ASSET_MAPPING = {
  // Game items
  apple: 'apple',
  ball: 'ball',
  cat: 'cat',
  cat2: 'cat2',
  dog: 'dog',
  
  // UI elements
  back: 'back',
  home: 'home',
  medal: 'medal',
  sound: 'sound',
  star: 'star',
  
  // App icons
  icon: 'icon',
  favicon: 'favicon',
};

// Helper function to get asset name from image source
export const getAssetNameFromSource = (imageSource) => {
  if (typeof imageSource === 'string') {
    // Extract filename from path
    const filename = imageSource.split('/').pop().replace('.png', '');
    return ASSET_MAPPING[filename] || filename;
  }
  
  // For require() statements, we'll need to map them
  // This is a simplified mapping - you might need to expand this
  const sourceMap = {
    'apple.png': 'apple',
    'ball.png': 'ball',
    'cat.png': 'cat',
    'cat2.png': 'cat2',
    'dog.png': 'dog',
  };
  
  // This is a simplified approach - in practice you might need a more robust mapping
  return 'apple'; // fallback
}; 