// Game logic utilities

// Helper function to get identifier from dot ID
export const getIdentifierFromDotId = (dotId, currentItems) => {
  for (const item of currentItems) {
    if (item.imageDotId === dotId) {
      return item.identifier;
    }
    if (item.textDotId === dotId) {
      return item.identifier;
    }
  }
  return null;
};

// Helper function to get dot type (image or text) from dot ID
export const getDotType = (dotId, currentItems) => {
  for (const item of currentItems) {
    if (item.imageDotId === dotId) {
      return 'image';
    }
    if (item.textDotId === dotId) {
      return 'text';
    }
  }
  return null;
};

export const isCorrectMatch = (fromDot, toDot, currentLevel, currentItems, matchingMode = 'straight') => {
  const fromIdentifier = getIdentifierFromDotId(fromDot, currentItems);
  const toIdentifier = getIdentifierFromDotId(toDot, currentItems);
  const fromType = getDotType(fromDot, currentItems);
  const toType = getDotType(toDot, currentItems);
  
  // Must connect image to text
  if (fromType === toType) return false;
  
  // Universal matching: same identifier (dog image ↔ dog text, cat image ↔ cat text)
  // Layout mode only affects visual positioning, not matching logic
  return fromIdentifier === toIdentifier && fromIdentifier && toIdentifier;
};

export const shouldConnect = (dot1, dot2, currentLevel, currentItems, matchingMode = 'straight') => {
  return isCorrectMatch(dot1, dot2, currentLevel, currentItems, matchingMode);
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
    // Criss-cross visual layout: dog text at bottom right, cat text at top right
    // But matching logic is still dog ↔ dog, cat ↔ cat
    return {
      'dog_left': { x: 377.5, y: 149.5 },   // Dog image (top left)
      'dog_right': { x: 478.5, y: 319.5 },  // Dog text (bottom right) - criss-cross position
      'cat_left': { x: 377.5, y: 319.5 },   // Cat image (bottom left)
      'cat_right': { x: 478.5, y: 149.5 }   // Cat text (top right) - criss-cross position
    };
  }
  return {};
}; 