import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const handleRegisterUser = async () => {
    try {
      const response = await axios.post('http://192.168.18.29:3000/api/register', {
        email,
        password,
        firstName,
        lastName
      })
     
    navigation.navigate('SignInScreen');
    }catch (error: any) {
  if (error.response?.data?.errors) {
    // Backend returns an array of errors
    const fieldErrors: { [key: string]: string } = {};
    error.response.data.errors.forEach((err: { field: string; message: string }) => {
      fieldErrors[err.field] = err.message;
    });
    setErrors(fieldErrors);
  } else {
    setErrors({ general: error.response?.data?.message || 'Registration failed. Please try again.' });
  }
  console.error('Error registering user:', error);
  }
};

  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.title}>Continue with the registration</Text>

      </View>
      

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="joe@user.com"
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
{errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* First Name Input */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />
      </View>
      {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

      {/* Last Name Input */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
      </View>
      {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
{errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={handleRegisterUser}

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
    marginBottom: 15,
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

export default SignUpScreen;