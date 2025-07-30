// Game configuration constants

export const GAME_LEVELS = [
  {
    id: 0,
    instruction: "Can you match what goes together?",
    matchingMode: 'straight', // Normal matching: apple ↔ apple, ball ↔ ball
    items: [
      {
        imageId: 'apple',
        imageDotId: 'apple_left',
        textId: 'apple_text',
        textDotId: 'apple_right',
        text: 'apple',
        identifier: 'apple' // Unique identifier for matching
      },
      {
        imageId: 'ball',
        imageDotId: 'ball_left',
        textId: 'ball_text',
        textDotId: 'ball_right',
        text: 'ball',
        identifier: 'ball' // Unique identifier for matching
      }
    ]
  },
  {
    id: 1,
    instruction: "Can you match what goes together?",
    matchingMode: 'crossed', // Criss-cross layout but same identifier matching
    items: [
      {
        imageId: 'dog',
        imageDotId: 'dog_left',
        textId: 'dog_text',
        textDotId: 'dog_right', // Dog image connects to dog text (same identifier)
        text: 'Cat', // Misleading text display
        identifier: 'dog' // Same identifier for dog image and dog text
      },
      {
        imageId: 'cat2',
        imageDotId: 'cat_left',
        textId: 'cat_text',
        textDotId: 'cat_right', // Cat image connects to cat text (same identifier)
        text: 'Dog', // Misleading text display
        identifier: 'cat' // Same identifier for cat image and cat text
      }
    ]
  }
];

export const COLORS = {
  CORRECT_LINE: '#10B981',
  INCORRECT_LINE: '#FF4444',
  ACTIVE_DOT: '#FF6B6B',
  BACKGROUND: '#FFF8DC',
  DOT: '#000000',
  DOT_BORDER: '#FFFFFF',
  TEXT: '#000000',
  TEXT_BOX: '#FFFFFF'
};

export const ANIMATION_DURATION = {
  FADE_IN: 600,
  FADE_OUT: 300,
  ORIENTATION_DELAY: 400
}; 