# Matching Game

A React Native/Expo matching game with dynamic levels and optimized dot positioning.

## Features

- **Dynamic Levels**: Multiple game levels with different items (Apple/Ball, Cat/Dog)
- **Line Drawing**: Interactive line drawing between matching dots
- **Optimized Performance**: Pre-defined dot positions for consistent layout
- **Responsive Design**: Works on different screen sizes
- **Modular Components**: Reusable components for easy maintenance

## Game Levels

1. **Level 0**: Apple and Ball matching
2. **Level 1**: Cat and Dog matching
3. **Success Screen**: Final completion screen

## How to Play

1. Match the left dot with the corresponding right dot
2. Draw lines by touching and dragging from one dot to another
3. Correct matches show green lines, incorrect matches show red lines
4. Complete all matches to proceed to the next level

## Technical Features

- **Optimized Dot Positioning**: Pre-defined positions for consistent layout
- **Touch Detection**: Accurate touch detection with 80px threshold
- **Line Validation**: Only horizontal connections allowed
- **State Management**: Proper state reset between levels
- **Component Architecture**: Modular, reusable components

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npx expo start
   ```

3. Run on your preferred platform:
   - iOS Simulator
   - Android Emulator
   - Expo Go app

## Project Structure

```
src/
├── components/
│   ├── GameHeader.jsx      # Header with home button and instructions
│   ├── GameFooter.jsx      # Footer with sound and next buttons
│   ├── MatchingRow.jsx     # Individual matching item row
│   └── MatchingGame.jsx    # Main game component
└── screens/
    ├── GameScreen.jsx      # Main game screen with logic
    ├── InitialScreen.jsx   # Welcome screen
    ├── LoadingScreen.jsx   # Loading screen
    └── SuccessScreen.jsx   # Completion screen
```

## Technologies Used

- React Native
- Expo
- React Native SVG (for line drawing)
- Expo Screen Orientation

## Author

**Khushi Gusain** - e22cseu0116@bennett.edu.in

## License

This project is open source and available under the [MIT License](LICENSE).
