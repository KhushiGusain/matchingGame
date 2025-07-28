// Game logic utilities

export const isCorrectMatch = (fromDot, toDot, currentLevel, currentItems) => {
  // Universal matching logic based on image identity
  const fromAnimal = fromDot.split('_')[0]; // Extract animal/object type
  const toAnimal = toDot.split('_')[0]; // Extract animal/object type
  
  // Correct match: same animal/object type (dog_left ↔ dog_right, cat_left ↔ cat_right, etc.)
  return fromAnimal === toAnimal;
};

export const shouldConnect = (dot1, dot2, currentLevel, currentItems) => {
  return isCorrectMatch(dot1, dot2, currentLevel, currentItems);
};

export const connectionExists = (dot1, dot2, permanentLines) => {
  return permanentLines.some(line => 
    (line.fromDot === dot1 && line.toDot === dot2) ||
    (line.fromDot === dot2 && line.toDot === dot1)
  );
};

export const isHorizontalLine = (fromDot, toDot) => {
  const fromParts = fromDot.split('_');
  const toParts = toDot.split('_');
  
  const isHorizontal = (fromParts[1] === 'left' && toParts[1] === 'right') || 
                      (fromParts[1] === 'right' && toParts[1] === 'left');
  
  const isVerticalBetweenDifferentItems = 
    fromParts[0] !== toParts[0] && fromParts[1] === toParts[1];
  
  return isHorizontal && !isVerticalBetweenDifferentItems;
};

export const findNearestDot = (x, y, dotPositions, currentItems, threshold = 80) => {
  let nearestDot = null;
  let nearestDistance = threshold;
  
  const expectedDotIds = currentItems.flatMap(item => [item.imageDotId, item.textDotId]);
  
  Object.keys(dotPositions).forEach(dotId => {
    if (expectedDotIds.includes(dotId)) {
      const dot = dotPositions[dotId];
      if (dot) {
        const distance = Math.sqrt(Math.pow(x - dot.x, 2) + Math.pow(y - dot.y, 2));
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestDot = dotId;
        }
      }
    }
  });
  
  return nearestDot;
};

export const getDotPositions = (currentLevel) => {
  if (currentLevel === 0) {
    return {
      'apple_left': { x: 377.5, y: 149.5 },
      'apple_right': { x: 478.5, y: 149.5 },
      'ball_left': { x: 377.5, y: 319.5 },
      'ball_right': { x: 478.5, y: 319.5 }
    };
  } else if (currentLevel === 1) {
    return {
      'dog_left': { x: 377.5, y: 149.5 },
      'dog_right': { x: 478.5, y: 149.5 },
      'cat_left': { x: 377.5, y: 319.5 },
      'cat_right': { x: 478.5, y: 319.5 }
    };
  }
  return {};
}; 