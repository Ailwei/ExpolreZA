import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';


const { height, width } = Dimensions.get('window');

const EditProfileScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="joe@user.com"
          keyboardType="email-address"
        />
      </View>

      {/* First Name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
        />
      </View>

      {/* Last Name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('MainStack', { screen: 'HomeScreen' })}

      style={styles.button}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Profile')}

      style={styles.button}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
   
    </View>
  );
};

const styles = StyleSheet.create({
  link:{
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
    backgroundColor: 'green',
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

export default EditProfileScreen;