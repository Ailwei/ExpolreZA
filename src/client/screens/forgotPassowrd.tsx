import React from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome5';


const { width, height } = Dimensions.get("window");

const ForgotPassword = () => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Enter your Email Address</Text>
       <View style={styles.inputContainer}>
               <Icon name="envelope" size={20} color="gray" style={styles.icon} />
               <TextInput
                 style={styles.textInput}
                 placeholder="joe@user.com"
                 keyboardType="email-address"
               />
             </View>
             <TouchableOpacity style={styles.button}><Text>Submit</Text></TouchableOpacity>
        </View>
        
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        paddingHorizontal: 20,
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
});
export default ForgotPassword;