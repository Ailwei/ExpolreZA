import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
const FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

const SignInScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://192.168.18.29:3000/api/login', {
        email,
        password
      })
      await AsyncStorage.setItem('token', response.data.token);
      navigation.navigate('Explore', { screen: 'MainScreen' });
    } catch (error: any) {
  if (error.response?.data?.errors) {
    const fieldErrors: { [key: string]: string } = {};
    error.response.data.errors.forEach((err: { field: string; message: string }) => {
      fieldErrors[err.field] = err.message;
    });
    setErrors(fieldErrors);
  } else if (error.response?.data?.message) {
    setErrors({ general: error.response.data.message });
  } else {
    setErrors({ general: 'An error occurred during sign in. Please try again.' });
  }
}
  }
 const isFormValid = email && password;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <FontAwesome5 name="envelope" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="joe@user.com"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Display general error message */}
      {/* Password Input */}
      <View style={styles.inputContainer}>
        <FontAwesome5 name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
{errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
{errors.general && <Text style={styles.errorText}>{errors.general}</Text>}
      {/* Sign in Button */}
     <TouchableOpacity
  onPress={handleSignIn}
  style={[
    styles.button,
    { backgroundColor: isFormValid ? 'green' : 'grey' }
  ]}
  disabled={!isFormValid}
>
  <Text style={styles.buttonText}>Sign In</Text>
</TouchableOpacity>


      <Text>Not Yet registered?</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUpScreen')}
      ><Text style={styles.link}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    display: 'flex',
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
    backgroundColor: '#fff',
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
   error : {
    backgroundColor: 'grey',
    width: width * 0.9,

  },
  errorText:{
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: 1,
  }
});

export default SignInScreen;