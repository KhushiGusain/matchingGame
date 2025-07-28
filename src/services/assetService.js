// Local image imports
const ASSET_SOURCES = {
  apple: require('../../assets/images/apple.png'),
  ball: require('../../assets/images/ball.png'),
  cat: require('../../assets/images/cat2.png'),
  cat2: require('../../assets/images/cat2.png'),
  dog: require('../../assets/images/dog.png'),
  back: require('../../assets/images/back.png'),
  home: require('../../assets/images/home.png'),
  medal: require('../../assets/images/medal.png'),
  sound: require('../../assets/images/sound.png'),
  star: require('../../assets/images/star.png'),
  icon: require('../../assets/images/icon.png'),
  favicon: require('../../assets/images/favicon.png'),
};

export const getAssetSource = (assetName) => {
  return ASSET_SOURCES[assetName] || null;
};

export const getAssetSources = (assetNames) => {
  const sources = {};
  
  for (const assetName of assetNames) {
    sources[assetName] = getAssetSource(assetName);
  }
  
  return sources;
};

export const preloadGameAssets = () => {
  const gameAssets = ['apple', 'ball', 'cat', 'cat2', 'dog'];
  return getAssetSources(gameAssets);
};

export const preloadUIAssets = () => {
  const uiAssets = ['back', 'home', 'medal', 'sound', 'star'];
  return getAssetSources(uiAssets);
}; 