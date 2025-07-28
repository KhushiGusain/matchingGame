// Game logic utilities

export const isCorrectMatch = (fromDot, toDot, currentLevel, currentItems) => {
  if (currentLevel === 1) {
    // Level 1 (Cat/Dog) - Special matching logic based on visual layout
    // Dog image dots should connect to Cat text dots
    // Cat image dots should connect to Dog text dots
    const correctMatches = [
      ['dog_left', 'cat_right'],  // Dog image left dot to Cat text right dot
      ['cat_left', 'dog_right']   // Cat image left dot to Dog text right dot
    ];
    
    for (const [dot1, dot2] of correctMatches) {
      if ((fromDot === dot1 && toDot === dot2) || (fromDot === dot2 && toDot === dot1)) {
        return true;
      }
    }
    
    return false;
  } else {
    // Level 0 (Apple/Ball) - Standard matching logic
    for (const item of currentItems) {
      if ((fromDot === item.leftDotId && toDot === item.rightDotId) ||
          (fromDot === item.rightDotId && toDot === item.leftDotId)) {
        return true;
      }
    }
    return false;
  }
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
  
  const expectedDotIds = currentItems.flatMap(item => [item.leftDotId, item.rightDotId]);
  
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