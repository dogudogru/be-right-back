import { StyleSheet, View, Text, Animated } from 'react-native';
import { useRef, useEffect } from 'react';

interface TypingIndicatorProps {
  contactName: string;
}

export default function TypingIndicator({ contactName }: TypingIndicatorProps) {
  const animations = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current
  ];
  
  useEffect(() => {
    const createAnimation = (index: number) => {
      return Animated.sequence([
        Animated.delay(index * 150),
        Animated.timing(animations[index], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animations[index], {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]);
    };
    
    const animationSequence = Animated.loop(
      Animated.parallel([
        createAnimation(0),
        createAnimation(1),
        createAnimation(2)
      ])
    );
    
    animationSequence.start();
    
    return () => {
      animationSequence.stop();
    };
  }, []);
  
  const animatedStyles = animations.map(animation => ({
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -6]
        })
      }
    ],
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 1, 0.3]
    })
  }));
  
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{contactName}</Text>
      <View style={styles.bubble}>
        <View style={styles.dotsContainer}>
          {animatedStyles.map((style, index) => (
            <Animated.View key={index} style={[styles.dot, style]} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    alignSelf: 'flex-start',
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: '#128C7E',
    marginLeft: 12,
    marginBottom: 2,
  },
  bubble: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    borderTopLeftRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8E8E93',
    marginHorizontal: 2,
  },
});