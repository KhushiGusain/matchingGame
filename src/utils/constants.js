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
        imageIdentifier: 'apple', // Apple image identifier
        textIdentifier: 'apple'   // Apple text identifier
      },
      {
        imageId: 'ball',
        imageDotId: 'ball_left',
        textId: 'ball_text',
        textDotId: 'ball_right',
        text: 'ball',
        imageIdentifier: 'ball', // Ball image identifier
        textIdentifier: 'ball'   // Ball text identifier
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
        textDotId: 'cat_right', // Dog text uses cat's dot position (criss-cross)
        text: 'Cat', // Misleading text display
        imageIdentifier: 'dog', // Dog image identifier
        textIdentifier: 'cat'   // Cat text identifier (matches visual text)
      },
      {
        imageId: 'cat2',
        imageDotId: 'cat_left',
        textId: 'cat_text',
        textDotId: 'dog_right', // Cat text uses dog's dot position (criss-cross)
        text: 'Dog', // Misleading text display
        imageIdentifier: 'cat', // Cat image identifier
        textIdentifier: 'dog'   // Dog text identifier (matches visual text)
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