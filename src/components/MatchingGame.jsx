import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Line, Svg } from 'react-native-svg';
import MatchingRow from './MatchingRow';

export default function MatchingGame({ 
  items, 
  activeDot, 
  onDotLayout, 
  onTouchStart, 
  onTouchMove, 
  onTouchEnd,
  permanentLines,
  activeLine,
  isDragging
}) {
  return (
    <View style={styles.matchingContainer}>
      {/* SVG Overlay for line drawing */}
      <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* Permanent lines (completed connections) */}
        {permanentLines.map((line, index) => (
          <Line
            key={`permanent-${index}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={line.color}
            strokeWidth={5}
            strokeLinecap="round"
          />
        ))}
        
        {/* Active line (currently being drawn) */}
        {activeLine && isDragging && (
          <Line
            x1={activeLine.x1}
            y1={activeLine.y1}
            x2={activeLine.x2}
            y2={activeLine.y2}
            stroke="#000000"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray="8,4"
          />
        )}
      </Svg>

      {/* Matching rows */}
      {items.map((item, index) => (
        <MatchingRow
          key={index}
          imageSource={item.imageSource}
          leftDotId={item.leftDotId}
          rightDotId={item.rightDotId}
          text={item.text}
          activeDot={activeDot}
          onDotLayout={onDotLayout}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  matchingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 30,
    alignSelf: 'center',
    width: '100%',
  },
}); 