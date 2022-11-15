import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OptionButton } from './components/OptionButton';
import { useCounter } from './hooks/useCounter';
import { useHighScore } from './hooks/useHighScore';
import { usePickTextColor } from './hooks/usePickTextColor';
import { randomColor, sleep } from './utils';

export default function App() {

  const [ fontsLoaded ] = useFonts({
    'Lobster': require('../assets/fonts/Lobster-Regular.ttf'),
    'Cousine': require('../assets/fonts/Cousine-Regular.ttf'),
  });

  const [ colorFormat, setColorFormat ] = useState<"hex" | "rgb">("hex");

  const [ color, setColor ] = useState(randomColor());
  const [ showResults, setShowResults ] = useState(false);

  const { count, increment, reset }  = useCounter();

  const textColor = usePickTextColor(color);

  const highScore = useHighScore(count);
  
  const changeColor = useCallback(() => { 
    setColor(randomColor());
  }, [ setColor ]);

  const allColors = useMemo(() => ([
    color,
    randomColor(),
    randomColor(),
  ].sort(() => Math.random() - 0.5)), [ color ]);

  const onGuess = async (c: string) => {
    if (c === color) {
      increment();
    }
    else {
      reset();
    }

    setShowResults(true);
    await sleep(1200);
    setShowResults(false);

    changeColor();
  };

  if (!fontsLoaded) return null;

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <StatusBar style="auto" />
      <Text style={{ fontFamily: "Lobster", fontSize: 64, color: textColor }}>ColoGuessr</Text>
      <Text style={{
        fontFamily: "Cousine",
        textAlign: "center",
        paddingHorizontal: 32,
        color: textColor,
      }}>
        What color is the background?
      </Text>

        <View style={{ marginVertical: 16 }}>

      {allColors.map(c => (
        <View style={{ marginVertical: 8 }}>
        <OptionButton
          correct={!showResults ? undefined : c === color ? true : false}
          disabled={showResults}
          key={c}
          text={c.toUpperCase()}
          onPress={() => onGuess(c)}
          />
      </View>
      ))}
        <View style={{ marginTop: 16 }}>
          <Text style={[ styles.scoreText, { color: textColor } ]}>Current score: {count}</Text>
          <Text style={[ styles.scoreText, { color: textColor } ]}>High score: {highScore}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontFamily: "Lobster",
    fontSize: 24,
    textAlign: "center"
  }
});
