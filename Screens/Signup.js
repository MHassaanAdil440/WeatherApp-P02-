import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, StyleSheet, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase'; 

const screenWidth = Dimensions.get("window").width;

const Signup = ({ navigation }) => {
  const imagePath = require("../images/cloud.png");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignup = () => {
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSignupSuccess(true);
        setModalVisible(true);
      })
      .catch(error => {
        console.log(error);
        setSignupSuccess(false);
        setModalVisible(true);
      });
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (signupSuccess) {
      navigation.navigate('Main');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={imagePath} style={styles.image} />
      <Text style={styles.heading}>Signup</Text>
      <TextInput
        placeholder="Username"
        style={styles.textInput}
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Email"
        style={styles.textInput}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.textInput}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry={true}
        style={styles.textInput}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Already have an account? Login</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {signupSuccess ? (
              <Text style={styles.modalText}>Sign up successful!</Text>
            ) : (
              <Text style={styles.modalText}>Sign up failed. Please try again.</Text>
            )}
            <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#54B435",
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#54B435",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: screenWidth * 0.7,
  },
  signupButton: {
    backgroundColor: "#54B435",
    padding: 10,
    borderRadius: 25,
    width: screenWidth * 0.7,
    alignItems: "center",
    marginTop: 20,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  loginButton: {
    marginTop: 10,
  },
  loginButtonText: {
    color: "#54B435",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#54B435",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Signup;
