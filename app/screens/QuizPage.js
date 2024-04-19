import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import data from "../../QuizData";
import ProgressBar from "./ProgressBar";
import Questions from "./Questions";

const QuizPage = ({ navigation }) => {
  const allQuestions = data;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(new Animated.Value(1));
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));

  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [score, setScore] = useState(0);

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
  };

  const validateAnswer = (selectedOption) => {
    if (isOptionsDisabled === false) {
      let correct_option = allQuestions[currentQuestionIndex]["correct_option"];

      setCurrentOptionSelected(selectedOption);
      setCorrectOption(correct_option);
      setIsOptionsDisabled(true);
      if (selectedOption === correct_option) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    // Check if an option is selected for the current question
    if (currentOptionSelected !== null) {
      if (currentQuestionIndex === allQuestions.length - 1) {
        navigation.navigate("Result", { score: score, restartQuiz: restartQuiz });
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        Animated.parallel([
          Animated.timing(progress, {
            toValue: currentQuestionIndex + 2,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.sequence([
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 100,
              useNativeDriver: false,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 1900,
              useNativeDriver: false,
            }),
          ]),
        ]).start();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex !== 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
    }
  };

  const renderOptions = () => {
    return (
      <View style={{ marginTop: 100 }}>
        {allQuestions[currentQuestionIndex]?.options.map((option, index) => (
          <Animated.View
            key={index}
            style={{
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [(150 / 4) * (index + 10), 0], // 0 : 150, 0.5 : 75, 1 : 0
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
              onPress={() => validateAnswer(option)}
              key={index}
              style={[
                { ...styles.optionsText },
                {
                  backgroundColor: isOptionsDisabled
                    ? option === correctOption
                      ? "#7be25b"
                      : option === currentOptionSelected
                      ? "#f0222b" //red
                      : "#cfcdcc" //gray
                    : "#fac782",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                  textAlign: "center",
                }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <ProgressBar progress={progress} />

          <Questions
            index={currentQuestionIndex}
            question={allQuestions[currentQuestionIndex]?.question}
          />
        </View>
        {renderOptions()}
      </View>
      <View style={styles.buttonContainer}>
        {currentQuestionIndex !== 0 && (
          <TouchableOpacity
            style={styles.button}
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
        )}
        {currentQuestionIndex !== allQuestions.length - 1 && (
          <TouchableOpacity
            style={[
              styles.button,
              currentQuestionIndex === 0 ? styles.rightButton : null,
            ]}
            onPress={handleNext}
            disabled={!isOptionsDisabled} 
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { backgroundColor: "#38588b" },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    position: "relative",
  },
  subContainer: {
    marginTop: 50,
    marginVertical: 10,
    padding: 40,
    borderTopRightRadius: 40,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -6, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  optionsText: {
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 30,
    marginVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#fac782",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  rightButton: {
    marginLeft: "auto",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QuizPage;
