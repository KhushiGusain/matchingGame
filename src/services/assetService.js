const ASSET_URLS = {
  apple: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/refs/heads/main/assets/images/apple.png',
  ball: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/refs/heads/main/assets/images/ball.png',
  cat: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/refs/heads/main/assets/images/cat2.png',
  cat2: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/refs/heads/main/assets/images/cat2.png',
  dog: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/refs/heads/main/assets/images/dog.png',
  back: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/refs/heads/main/assets/images/back.png',
  home: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/refs/heads/main/assets/images/home.png',
  medal: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/refs/heads/main/assets/images/medal.png',
  sound: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/refs/heads/main/assets/images/sound.png',
  star: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/refs/heads/main/assets/images/star.png',
  icon: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/refs/heads/main/assets/images/icon.png',
  favicon: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/refs/heads/main/assets/images/favicon.png',
};

export const getAssetUrl = async (assetName) => {
  try {
    if (ASSET_URLS[assetName]) {
      return ASSET_URLS[assetName];
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const getAssetUrls = async (assetNames) => {
  const urls = {};
  
  for (const assetName of assetNames) {
    urls[assetName] = await getAssetUrl(assetName);
  }
  
  return urls;
};

export const preloadGameAssets = async () => {
  const gameAssets = ['apple', 'ball', 'cat', 'cat2', 'dog'];
  return await getAssetUrls(gameAssets);
};

export const preloadUIAssets = async () => {
  const uiAssets = ['back', 'home', 'medal', 'sound', 'star'];
  return await getAssetUrls(uiAssets);
}; 