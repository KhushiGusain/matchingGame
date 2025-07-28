// Game configuration constants

export const GAME_LEVELS = [
  {
    id: 0,
    instruction: "Can you match what goes together?",
    componentType: 'AppleBallMatchingRow', // Uses AppleBallMatchingRow component
    items: [
      {
        imageSource: require('../../assets/images/apple.png'),
        leftDotId: 'apple_left',
        rightDotId: 'apple_right',
        text: 'apple'
      },
      {
        imageSource: require('../../assets/images/ball.png'),
        leftDotId: 'ball_left',
        rightDotId: 'ball_right',
        text: 'Ball'
      }
    ]
  },
  {
    id: 1,
    instruction: "Can you match what goes together?",
    componentType: 'CatDogMatchingRow', // Uses CatDogMatchingRow component
    items: [
      {
        imageSource: require('../../assets/images/dog.png'),
        leftDotId: 'dog_left',
        rightDotId: 'dog_right',
        text: 'Dog'
      },
      {
        imageSource: require('../../assets/images/cat2.png'),
        leftDotId: 'cat_left',
        rightDotId: 'cat_right',
        text: 'Cat'
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