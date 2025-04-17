import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';


const { height, width } = Dimensions.get('window');

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Continue with the registration</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="joe@user.com"
          keyboardType="email-address"
        />
      </View>

      {/* First Name Input */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
        />
      </View>

      {/* Last Name Input */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('MainStack', { screen: 'MainScreen' })}

        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text>Already have  an acount?</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignInScreen')}
      ><Text style={styles.link}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    width: width * 0.9,

  },
  icon: {
    marginLeft: 10,

  },
  textInput: {
    flex: 1,
    height: height * 0.06,
    fontSize: 16,
    width: width * 0.7,
    marginLeft: 5,
  },
  button: {
    backgroundColor: 'grey',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: width * 0.9,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;