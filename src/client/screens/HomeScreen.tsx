import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useAuthRequest } from 'expo-auth-session';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';

const { height, width } = Dimensions.get('window');

const HomeScreen = () =>{
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    
  // Google Login
  const [googleRequest, googleResponse, googlePromptAsync] = useAuthRequest(
    {
      clientId: 'dummyckdhgdhghgfehgfjewgfjhewgfjwh',
      redirectUri: 'https://auth.expo.io/@your-username/your-app-name',
    },
    {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
    }
  );

  // Facebook Login
  const [fbRequest, fbResponse, fbPromptAsync] = useAuthRequest(
    {
      clientId: 'uryryryryrbbbfhfbbfhrhrh',
      redirectUri: 'https://auth.expo.io/@your-username/your-app-name',
    },
    {
      authorizationEndpoint: 'https://www.facebook.com/v10.0/dialog/oauth',
      tokenEndpoint: 'https://graph.facebook.com/v10.0/oauth/access_token',
    }
  );

  // Handle Google Login Response
  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { authentication } = googleResponse;
      Alert.alert('Google Login Success', JSON.stringify(authentication));
    }
  }, [googleResponse]);

  // Handle Facebook Login Response
  useEffect(() => {
    if (fbResponse?.type === 'success') {
      const { authentication } = fbResponse;
      Alert.alert('Facebook Login Success', JSON.stringify(authentication));
    }
  }, [fbResponse]);

  return (
    <View style={styles.container}>
      <Image 
              source={require('../assets/icon.png')}
              style={styles.logo}
            />
      <Text style={styles.title}>Sign in or Sign Up to get Started!</Text>

      {/* Google Login Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#DB4437' }]}
        onPress={() => googlePromptAsync()}
        disabled={!googleRequest}
      >
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Facebook Login Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4267B2' }]}
        onPress={() => fbPromptAsync()}
        disabled={!fbRequest}
      >
        <Text style={styles.buttonText}>Continue with Facebook</Text>
      </TouchableOpacity>

      {/* Continue with Email */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('SignUpScreen')}
      style={[styles.button, { backgroundColor: 'green' }]}
      >
        <Text style={styles.buttonText}>Continue with Email</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}> OR </Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: 'gray' }]}>
        <Text style={styles.buttonText}>Continue as Guest</Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.buttonTeerms}>
          By using this application you agree to be bound by these terms and
          conditions.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: width * 0.8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTeerms: {
    width: width,
    height: height * 0.1,
    color: 'black',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 20,
    textAlign: 'center',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '80%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  orText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    textAlign: 'center',
  },
  logo:{
    width: width,
    height: height * 0.2,
    marginBottom: 20,

  }
});

export default HomeScreen;