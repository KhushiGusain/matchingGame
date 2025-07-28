import React from 'react';
import { StyleSheet } from 'react-native';
import { Line, Svg } from 'react-native-svg';

export default function LineDrawing({ permanentLines, activeLine, isDragging }) {
  return (
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
  );
} 