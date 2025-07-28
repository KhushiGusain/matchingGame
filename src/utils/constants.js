// Game configuration constants

export const GAME_LEVELS = [
  {
    id: 0,
    instruction: "Can you match what goes together?",
    componentType: 'AppleBallMatchingRow',
    items: [
      {
        imageId: 'apple',
        imageDotId: 'apple_left',
        textId: 'apple_text',
        textDotId: 'apple_right',
        text: 'apple'
      },
      {
        imageId: 'ball',
        imageDotId: 'ball_left',
        textId: 'ball_text',
        textDotId: 'ball_right',
        text: 'ball'
      }
    ]
  },
  {
    id: 1,
    instruction: "Can you match what goes together?",
    componentType: 'CatDogMatchingRow',
    items: [
      {
        imageId: 'dog',
        imageDotId: 'dog_left',
        textId: 'dog_text',
        textDotId: 'dog_right',
        text: 'Cat'
      },
      {
        imageId: 'cat2',
        imageDotId: 'cat_left',
        textId: 'cat_text',
        textDotId: 'cat_right',
        text: 'Dog'
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

export const COMPONENT_TYPES = {
  APPLE_BALL: 'AppleBallMatchingRow',
  CAT_DOG: 'CatDogMatchingRow'
}; 