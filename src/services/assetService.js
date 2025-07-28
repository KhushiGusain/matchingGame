// Asset URLs using GitHub Raw URLs - easier to set up than Firebase Storage
const ASSET_URLS = {
  // Game assets
  apple: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/main/assets/images/apple.png',
  ball: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/main/assets/images/ball.png',
  cat: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/main/assets/images/cat.png',
  cat2: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/main/assets/images/cat2.png',
  dog: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/main/assets/images/dog.png',
  
  // UI assets
  back: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/main/assets/images/back.png',
  home: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/main/assets/images/home.png',
  medal: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/main/assets/images/medal.png',
  sound: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/main/assets/images/sound.png',
  star: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/main/assets/images/star.png',
  
  // App icons
  icon: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/main/assets/images/icon.png',
  favicon: 'https://raw.githubusercontent.com/KhushiGusain/matchingGame/main/assets/images/favicon.png',
};

/**
 * Get asset URL from GitHub Raw URLs
 * @param {string} assetName - Name of the asset (e.g., 'apple', 'ball')
 * @returns {Promise<string>} Download URL
 */
export const getAssetUrl = async (assetName) => {
  try {
    // Return the GitHub raw URL
    if (ASSET_URLS[assetName]) {
      return ASSET_URLS[assetName];
    }
    
    console.warn(`Asset not found: ${assetName}`);
    return null;
  } catch (error) {
    console.error(`Error getting asset URL for ${assetName}:`, error);
    return null;
  }
};

/**
 * Get multiple asset URLs
 * @param {Array<string>} assetNames - Array of asset names
 * @returns {Promise<Object>} Object with asset names as keys and URLs as values
 */
export const getAssetUrls = async (assetNames) => {
  const urls = {};
  
  for (const assetName of assetNames) {
    urls[assetName] = await getAssetUrl(assetName);
  }
  
  return urls;
};

/**
 * Preload all game assets
 * @returns {Promise<Object>} All game asset URLs
 */
export const preloadGameAssets = async () => {
  const gameAssets = ['apple', 'ball', 'cat', 'cat2', 'dog'];
  return await getAssetUrls(gameAssets);
};

/**
 * Preload all UI assets
 * @returns {Promise<Object>} All UI asset URLs
 */
export const preloadUIAssets = async () => {
  const uiAssets = ['back', 'home', 'medal', 'sound', 'star'];
  return await getAssetUrls(uiAssets);
}; 