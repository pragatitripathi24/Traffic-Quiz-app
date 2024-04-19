import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions // Import Dimensions from react-native
} from "react-native";

const Welcome = ({ navigation }) => {
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));
  const [progress, setProgress] = useState(new Animated.Value(0));
  const startQuiz = () => {
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
    ]).start();

    Animated.timing(progress, {
      toValue: 0 + 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/quiz-time-neon-signs-style-text-free-vector.jpg")}
      />
      <View style={styles.subContainer}>
        <Text style={styles.text}>Ready For your Written Test?</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Quiz");
          startQuiz();
        }}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Let's Begin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38588b",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: Dimensions.get('window').width, // Set width to the width of the screen
    height: Dimensions.get('window').height, // Set height to the height of the screen
    resizeMode: "cover", // Use "cover" to maintain aspect ratio and fill the entire container
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", // Position the text absolutely so it's on top of the image
    top: 50, // Adjust top position as needed
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
  },
  btn: {
    backgroundColor: "#fac782",
    paddingHorizontal: 5,
    paddingVertical: 15,
    position: "absolute", // Position the button absolutely so it's on top of the image
    bottom: 50, // Adjust bottom position as needed
    borderRadius: 15,
    alignItems: "center",
  },
  btnText: {
    fontSize: 20,
    textAlign: "center",
    color: "#ffffff",
    letterSpacing: 1.1,
  },
});
export default Welcome;
