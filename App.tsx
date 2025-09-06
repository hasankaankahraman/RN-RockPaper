import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';

type Choice = 'Taş' | 'Kağıt' | 'Makas';
type NullableChoice = Choice | null;

const { width } = Dimensions.get('window');

const choices: Choice[] = ['Taş', 'Kağıt', 'Makas'];
const choiceEmojis = { Taş: '✊', Kağıt: '✋', Makas: '✌️' };

const App = () => {
  const [userChoice, setUserChoice] = useState<NullableChoice>(null);
  const [computerChoice, setComputerChoice] = useState<NullableChoice>(null);
  const [result, setResult] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);

  const play = (choice: Choice) => {
    setIsPlaying(true);
    const randomIndex = Math.floor(Math.random() * choices.length);
    const compChoice = choices[randomIndex];

    setTimeout(() => {
      setUserChoice(choice);
      setComputerChoice(compChoice);
      setResult(getResult(choice, compChoice));
      setIsPlaying(false);
    }, 500);
  };

  const getResult = (user: Choice, computer: Choice) => {
    if (user === computer) return 'Berabere 🤝';
    if (
      (user === 'Taş' && computer === 'Makas') ||
      (user === 'Kağıt' && computer === 'Taş') ||
      (user === 'Makas' && computer === 'Kağıt')
    ) {
      return 'Kazandın 🎉';
    }
    return 'Kaybettin 😢';
  };

  const getResultStyle = () => {
    if (result.includes('Kazandın')) return styles.winText;
    if (result.includes('Kaybettin')) return styles.loseText;
    return styles.drawText;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated background */}
      <View style={styles.backgroundContainer}>
        <View style={[styles.floatingCircle, styles.circle1]} />
        <View style={[styles.floatingCircle, styles.circle2]} />
        <View style={[styles.floatingCircle, styles.circle3]} />
      </View>

      <View style={styles.mainCard}>
        {/* Glassy Blur Layer */}
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="rgba(255,255,255,0.2)"
        />

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Taş Kağıt Makas</Text>
          <View style={styles.emojiContainer}>
            <Text style={styles.titleEmoji}>✊</Text>
            <Text style={styles.titleEmoji}>✋</Text>
            <Text style={styles.titleEmoji}>✌️</Text>
          </View>
        </View>

        {/* Choice Buttons */}
        <View style={styles.buttonContainer}>
          {choices.map((choice) => (
            <TouchableOpacity
              key={choice}
              onPress={() => play(choice)}
              disabled={isPlaying}
              style={[styles.choiceButton, isPlaying && styles.disabledButton]}
            >
              <View style={styles.buttonGlow} />
              <Text style={styles.choiceEmoji}>{choiceEmojis[choice]}</Text>
              <Text style={styles.choiceText}>{choice}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Results */}
        <View style={styles.resultCard}>
          <View style={styles.playersContainer}>
            {/* User Choice */}
            <View style={styles.playerSection}>
              <Text style={styles.playerLabel}>Sen</Text>
              <Text style={styles.playerEmoji}>
                {isPlaying
                  ? '🤔'
                  : userChoice
                  ? choiceEmojis[userChoice]
                  : '❓'}
              </Text>
              <Text style={styles.playerChoice}>{userChoice || '-'}</Text>
            </View>

            {/* VS */}
            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>VS</Text>
            </View>

            {/* Computer Choice */}
            <View style={styles.playerSection}>
              <Text style={styles.playerLabel}>Bilgisayar</Text>
              <Text style={styles.playerEmoji}>
                {isPlaying
                  ? '🤖'
                  : computerChoice
                  ? choiceEmojis[computerChoice]
                  : '❓'}
              </Text>
              <Text style={styles.playerChoice}>{computerChoice || '-'}</Text>
            </View>
          </View>

          {/* Result */}
          {result && !isPlaying && (
            <View style={styles.resultContainer}>
              <View style={styles.divider} />
              <Text style={[styles.resultText, getResultStyle()]}>{result}</Text>
            </View>
          )}

          {isPlaying && (
            <View style={styles.resultContainer}>
              <View style={styles.divider} />
              <Text style={styles.thinkingText}>Düşünüyor... 🤔</Text>
            </View>
          )}
        </View>

        {/* Floating decorative elements */}
        <View style={styles.floatingDot1} />
        <View style={styles.floatingDot2} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  floatingCircle: {
    position: 'absolute',
    borderRadius: 150,
    opacity: 0.1,
  },
  circle1: {
    width: 300,
    height: 300,
    backgroundColor: '#9f7aea',
    top: 50,
    left: -50,
  },
  circle2: {
    width: 250,
    height: 250,
    backgroundColor: '#4299e1',
    top: 200,
    right: -50,
  },
  circle3: {
    width: 200,
    height: 200,
    backgroundColor: '#667eea',
    bottom: 100,
    left: 50,
  },
  mainCard: {
    width: width - 40,
    maxWidth: 400,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: 30,
    overflow: 'hidden', // BlurView taşmasın
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
    position: 'relative',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 120,
  },
  titleEmoji: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  choiceButton: {
    backgroundColor: 'rgba(147, 51, 234, 0.3)',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#9333ea',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(147, 51, 234, 0.1)',
    borderRadius: 20,
  },
  choiceEmoji: {
    fontSize: 30,
    marginBottom: 5,
  },
  choiceText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  playersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  playerSection: {
    alignItems: 'center',
    flex: 1,
  },
  playerLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 10,
  },
  playerEmoji: {
    fontSize: 40,
    marginBottom: 5,
  },
  playerChoice: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  vsContainer: {
    paddingHorizontal: 20,
  },
  vsText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
    marginBottom: 15,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  winText: {
    color: '#10b981',
  },
  loseText: {
    color: '#ef4444',
  },
  drawText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  thinkingText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  floatingDot1: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 20,
    height: 20,
    backgroundColor: 'rgba(147, 51, 234, 0.6)',
    borderRadius: 10,
  },
  floatingDot2: {
    position: 'absolute',
    bottom: -5,
    left: -5,
    width: 15,
    height: 15,
    backgroundColor: 'rgba(59, 130, 246, 0.4)',
    borderRadius: 7.5,
  },
});

export default App;
