const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const fs = require('fs');
const path = require('path');

// Firebase config - use your existing config
const firebaseConfig = {
  apiKey: "AIzaSyALPeYdbM44e7q2SIrN-MDNRvOn1W9Ulio",
  authDomain: "cognitti-game.firebaseapp.com",
  projectId: "cognitti-game",
  storageBucket: "cognitti-game.firebasestorage.app",
  messagingSenderId: "288774403586",
  appId: "1:288774403586:web:a9b2ce00f8612f0712d91b",
  measurementId: "G-WMBKX09G9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Assets to upload
const assets = [
  'apple.png',
  'ball.png', 
  'cat.png',
  'cat2.png',
  'dog.png',
  'back.png',
  'home.png',
  'medal.png',
  'sound.png',
  'star.png',
  'icon.png',
  'favicon.png'
];

async function uploadAsset(fileName) {
  try {
    const filePath = path.join(__dirname, '../assets/images', fileName);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${fileName}`);
      return null;
    }

    // Read file
    const fileBuffer = fs.readFileSync(filePath);
    
    // Upload to Firebase Storage
    const storageRef = ref(storage, `assets/${fileName}`);
    const snapshot = await uploadBytes(storageRef, fileBuffer);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log(`✅ Uploaded: ${fileName}`);
    console.log(`   URL: ${downloadURL}`);
    
    return downloadURL;
  } catch (error) {
    console.error(`❌ Error uploading ${fileName}:`, error);
    return null;
  }
}

async function uploadAllAssets() {
  console.log('🚀 Starting asset upload to Firebase Storage...\n');
  
  const results = {};
  
  for (const asset of assets) {
    const url = await uploadAsset(asset);
    if (url) {
      results[asset.replace('.png', '')] = url;
    }
  }
  
  console.log('\n📋 Upload Results:');
  console.log(JSON.stringify(results, null, 2));
  
  console.log('\n💡 Next steps:');
  console.log('1. Copy the URLs above to your assetService.js file');
  console.log('2. Remove local assets from your app bundle');
  console.log('3. Test the app with remote assets');
}

// Run the upload
uploadAllAssets().catch(console.error); 