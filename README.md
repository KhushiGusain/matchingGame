# Matching Game

A React Native/Expo matching game with universal matching logic and dynamic levels designed for children's cognitive development.

## Features

- **Universal Matching Logic**: Scalable matching system that works for any number of levels
- **Dynamic Levels**: Multiple game levels with different items (Apple/Ball, Cat/Dog)
- **Interactive Line Drawing**: Touch and drag to draw lines between matching dots
- **Visual Feedback**: Green lines for correct matches, red lines for incorrect matches
- **Puzzle Elements**: Level 1 features swapped text display to challenge players
- **Optimized Performance**: Pre-defined dot positions for consistent layout
- **Responsive Design**: Works on different screen sizes
- **Modular Components**: Reusable components for easy maintenance

## Game Levels

### Level 0: Apple and Ball Matching
- **Layout**: Normal matching (image ↔ corresponding text)
- **Items**: Apple image ↔ "apple" text, Ball image ↔ "ball" text
- **Challenge**: Straightforward matching exercise

### Level 1: Cat and Dog Matching (Puzzle Mode)
- **Layout**: Swapped text display with correct matching logic
- **Visual Display**: 
  - Dog image shows "Cat" text
  - Cat image shows "Dog" text
- **Correct Matches**:
  - Dog image ↔ Dog text (even though it shows "Cat")
  - Cat image ↔ Cat text (even though it shows "Dog")
- **Challenge**: Players must ignore displayed text and match based on image identity

## How to Play

1. **Match the correct pairs**: Connect dots between matching items
2. **Draw lines**: Touch and drag from one dot to another
3. **Visual feedback**: 
   - ✅ Green lines = correct matches
   - ❌ Red lines = incorrect matches
4. **Complete all matches** to proceed to the next level

## Technical Features

- **Universal Matching Logic**: Single, scalable algorithm for all levels
- **Image Identity Matching**: Matches based on image type, not displayed text
- **Optimized Dot Positioning**: Pre-defined positions for consistent layout
- **Touch Detection**: Accurate touch detection with 80px threshold
- **Line Validation**: Only horizontal connections allowed
- **State Management**: Proper state reset between levels
- **Component Architecture**: Modular, reusable components
- **Local Asset Management**: Efficient image loading from local assets

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KhushiGusain/matchingGame.git
   cd matchingGame
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npx expo start
   ```

4. **Run on your preferred platform**:
   - iOS Simulator
   - Android Emulator
   - Expo Go app

## Project Structure

```
src/
├── components/
│   ├── AppleBallMatchingRow.jsx  # Apple/Ball level component
│   ├── CatDogMatchingRow.jsx     # Cat/Dog level component
│   ├── GameHeader.jsx            # Header with home button and instructions
│   ├── GameFooter.jsx            # Footer with sound and next buttons
│   ├── LineDrawing.jsx           # SVG line drawing component
│   └── RemoteImage.jsx           # Image loading component
├── screens/
│   ├── GameScreen.jsx            # Main game screen with universal logic
│   ├── InitialScreen.jsx         # Welcome screen
│   ├── LoadingScreen.jsx         # Loading screen
│   └── SuccessScreen.jsx         # Completion screen
├── services/
│   ├── assetService.js           # Local asset management
│   └── firestoreService.js       # Firebase integration
└── utils/
    ├── constants.js              # Game configuration and levels
    └── gameLogic.js              # Universal matching logic
```

## Universal Matching Logic

The game uses a single, scalable matching algorithm:

```javascript
export const isCorrectMatch = (fromDot, toDot, currentLevel, currentItems) => {
  const fromAnimal = fromDot.split('_')[0]; // Extract animal/object type
  const toAnimal = toDot.split('_')[0];
  
  // Correct match: same type (dog_left ↔ dog_right, cat_left ↔ cat_right, etc.)
  return fromAnimal === toAnimal;
};
```

This logic works for any level:
- **Level 0**: `apple_left` ↔ `apple_right` = ✅ correct
- **Level 1**: `dog_left` ↔ `dog_right` = ✅ correct
- **Future Levels**: `bird_left` ↔ `bird_right` = ✅ correct

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **React Native SVG**: Line drawing functionality
- **Expo Screen Orientation**: Screen orientation management
- **Local Asset Management**: Efficient image loading

## Educational Value

- **Cognitive Development**: Enhances matching and pattern recognition skills
- **Visual Discrimination**: Teaches children to focus on image identity
- **Problem Solving**: Level 1 introduces puzzle elements
- **Fine Motor Skills**: Touch and drag interactions
- **Attention to Detail**: Requires careful observation

## Author

**Khushi Gusain** - e22cseu0116@bennett.edu.in

## License

This project is open source and available under the [MIT License](LICENSE).
