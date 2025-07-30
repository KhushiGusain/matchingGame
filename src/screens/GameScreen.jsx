import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import GameFooter from '../components/GameFooter';
import GameHeader from '../components/GameHeader';
import LineDrawing from '../components/LineDrawing';
import MatchingRow from '../components/MatchingRow';
import { saveGameScore } from '../services/firestoreService';
import { ANIMATION_DURATION, COLORS, GAME_LEVELS } from '../utils/constants';
import {
    connectionExists,
    findNearestDot,
    getDotPositions,
    isHorizontalLine,
    shouldConnect
} from '../utils/gameLogic';

export default function GameScreen({ navigation }) {
  const [isReady, setIsReady] = useState(false);
  const [activeLine, setActiveLine] = useState(null);
  const [permanentLines, setPermanentLines] = useState([]);
  const [dotPositions, setDotPositions] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [activeDot, setActiveDot] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [matches, setMatches] = useState([]); // Track all matches for Firestore
  const [levelScores, setLevelScores] = useState([]); // Track scores for each level
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const containerRef = useRef(null);

  const currentLevelData = GAME_LEVELS[currentLevel];

  useEffect(() => {
    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        setTimeout(() => {
          setIsReady(true);
          setGameStartTime(Date.now());
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: ANIMATION_DURATION.FADE_IN,
            useNativeDriver: true,
          }).start();
        }, ANIMATION_DURATION.ORIENTATION_DELAY);
      } catch (error) {
        setIsReady(true);
        setGameStartTime(Date.now());
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: ANIMATION_DURATION.FADE_IN,
          useNativeDriver: true,
        }).start();
      }
    };
    
    lockOrientation();

    const unsubscribe = navigation.addListener('beforeRemove', async () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: ANIMATION_DURATION.FADE_OUT,
        useNativeDriver: true,
      }).start(async () => {
        try {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        } catch (error) {
          // Handle orientation unlock error silently
        }
      });
    });

    return unsubscribe;
  }, [navigation]);

  // Reset game state when level changes
  useEffect(() => {
    setPermanentLines([]);
    setActiveLine(null);
    setActiveDot(null);
    setIsDragging(false);
    setScore(0);
    if (currentLevel === 0) {
      setTotalScore(0);
      setMatches([]); // Reset matches only at the start of a new game
      setLevelScores([]); // Reset level scores only at the start of a new game
    }
    
    const dotPositions = getDotPositions(currentLevel);
    setDotPositions(dotPositions);
  }, [currentLevel]);

  // Create a permanent line between two dots
  const createPermanentLine = (fromDot, toDot, isCorrect) => {
    const startDot = dotPositions[fromDot];
    const endDot = dotPositions[toDot];
    
    if (!isHorizontalLine(fromDot, toDot)) {
      return false;
    }
    
    if (startDot && endDot && !connectionExists(fromDot, toDot, permanentLines)) {
      const newLine = {
        id: `${fromDot}_${toDot}`,
        x1: startDot.x,
        y1: startDot.y,
        x2: endDot.x,
        y2: endDot.y,
        color: isCorrect ? COLORS.CORRECT_LINE : COLORS.INCORRECT_LINE,
        fromDot,
        toDot,
        isCorrect
      };
      
      setPermanentLines(prev => [...prev, newLine]);
      
      // Track match for Firestore
      const matchData = {
        level: currentLevel,
        fromDot,
        toDot,
        isCorrect,
        timestamp: new Date().toISOString()
      };
      setMatches(prev => [...prev, matchData]);
      
      return true;
    }
    return false;
  };

  // Save dot position when component layouts
  const saveDotPosition = (dotId, event) => {
    event.target.measureInWindow((x, y, width, height) => {
      if (containerRef.current) {
        containerRef.current.measureInWindow((containerX, containerY) => {
          const absoluteX = x - containerX + width / 2;
          const absoluteY = y - containerY + height / 2;
          
          setDotPositions(prev => ({
            ...prev,
            [dotId]: { x: absoluteX, y: absoluteY }
          }));
        });
      }
    });
  };

  // Handle dot press start
  const handleDotPressStart = (dotId, touchX, touchY) => {
    setPermanentLines(prev => prev.filter(line => 
      line.fromDot !== dotId && line.toDot !== dotId
    ));
    
    setActiveDot(dotId);
    setIsDragging(true);
    
    const dot = dotPositions[dotId];
    if (dot) {
      setActiveLine({
        x1: dot.x,
        y1: dot.y,
        x2: touchX,
        y2: touchY
      });
    }
  };

  // Handle next level or navigate to success
  const handleNextPress = async () => {
    
    if (currentLevel < GAME_LEVELS.length - 1) {
      // Calculate score for current level
      const correctLines = permanentLines.filter(line => line.isCorrect);
      const levelScore = correctLines.length;
      const newTotalScore = totalScore + levelScore;
      
      
      // Save level score
      setLevelScores(prev => [...prev, { level: currentLevel, score: levelScore }]);
      
      setTotalScore(newTotalScore);
      setCurrentLevel(currentLevel + 1);
    } else {
      
      // Calculate final score for last level and add to total
      const correctLines = permanentLines.filter(line => line.isCorrect);
      const finalLevelScore = correctLines.length;
      const finalTotalScore = totalScore + finalLevelScore;
      
      
      // Save final level score
      const updatedLevelScores = [...levelScores, { level: currentLevel, score: finalLevelScore }];
      
      // Calculate time taken
      const gameEndTime = Date.now();
      const timeTakenInMilliseconds = gameEndTime - gameStartTime;
      
      // Format time as MM:SS or SS.MS for better readability
      const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((milliseconds % 1000) / 10); // Show centiseconds
        
        if (minutes > 0) {
          return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        } else if (seconds > 0) {
          return `${seconds}.${ms.toString().padStart(2, '0')}s`;
        } else {
          return `${ms}ms`;
        }
      };
      
      const formattedTime = formatTime(timeTakenInMilliseconds);
      
    
      
      // Save game data to Firestore
      try {
        const gameData = {
          totalScore: finalTotalScore,
          timeTaken: formattedTime
        };
        
        
        await saveGameScore(gameData);

      } catch (error) {
        console.error('Failed to save game data to Firestore:', error);
        console.error('Error details:', error.message);
      }
    
      
      // Navigate to success screen with score and time data
      navigation.navigate('Success', {
        score: finalTotalScore,
        timeTaken: formattedTime,
        startTime: gameStartTime
      });
    }
  };

  // Handle home press
  const handleHomePress = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: ANIMATION_DURATION.FADE_OUT,
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack();
    });
  };

  if (!isReady) {
    return (
      <View style={[styles.container, { backgroundColor: COLORS.BACKGROUND }]} />
    );
  }

  return (
    <View 
      style={styles.container}
      ref={containerRef}
      onTouchStart={(event) => {
        const { pageX, pageY } = event.nativeEvent;
        
        if (containerRef.current) {
          containerRef.current.measureInWindow((containerX, containerY) => {
            const relativeX = pageX - containerX;
            const relativeY = pageY - containerY;
            
            const nearestDot = findNearestDot(relativeX, relativeY, dotPositions, currentLevelData.items);
            if (nearestDot && !isDragging) {
              handleDotPressStart(nearestDot, relativeX, relativeY);
            }
          });
        }
      }}
      onTouchMove={(event) => {
        if (isDragging && activeDot && activeLine) {
          const { pageX, pageY } = event.nativeEvent;
          
          if (containerRef.current) {
            containerRef.current.measureInWindow((containerX, containerY) => {
              const relativeX = pageX - containerX;
              const relativeY = pageY - containerY;
              
              setActiveLine(prev => ({
                ...prev,
                x2: relativeX,
                y2: relativeY
              }));
            });
          }
        }
      }}
      onTouchEnd={(event) => {
        if (isDragging && activeDot) {
          const { pageX, pageY } = event.nativeEvent;
          
          if (containerRef.current) {
            containerRef.current.measureInWindow((containerX, containerY) => {
              const relativeX = pageX - containerX;
              const relativeY = pageY - containerY;
              
              const targetDot = findNearestDot(relativeX, relativeY, dotPositions, currentLevelData.items);
              
              if (targetDot && targetDot !== activeDot) {
                setPermanentLines(prev => prev.filter(line => 
                  line.fromDot !== targetDot && line.toDot !== targetDot
                ));
                
                const isCorrect = shouldConnect(activeDot, targetDot, currentLevel, currentLevelData.items, currentLevelData.matchingMode);
                createPermanentLine(activeDot, targetDot, isCorrect);
              }
            });
          }
        }
        
        setIsDragging(false);
        setActiveDot(null);
        setActiveLine(null);
      }}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* SVG Overlay for line drawing */}
        <LineDrawing 
          permanentLines={permanentLines}
          activeLine={activeLine}
          isDragging={isDragging}
        />

        {/* Top Section */}
        <GameHeader 
          instruction={currentLevelData.instruction}
          onHomePress={handleHomePress}
        />

        {/* Main Content Area */}
        <View style={styles.matchingContainer}>
          {currentLevelData.items.map((item, index) => {
            return (
              <MatchingRow
                key={index}
                assetName={item.imageId}
                leftDotId={item.imageDotId}
                rightDotId={item.textDotId}
                text={item.text}
                activeDot={activeDot}
                onDotLayout={saveDotPosition}
                matchingMode={currentLevelData.matchingMode}
              />
            );
          })}
        </View>

        {/* Bottom Section */}
        <GameFooter 
          onSoundPress={() => {}}
          onNextPress={handleNextPress}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    padding: 15,
  },
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