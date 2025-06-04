import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

type RootStackParamList = {
  LoginScreen: undefined;
};

const SettingsScreeen = () => {
    const navigation = useNavigation<any>();

    const handleLogout = async () => {
      await AsyncStorage.removeItem('token');
      navigation.navigate('HomeScreen');
    };

    return (
        <ScrollView>
            <View style={styles.Container}>
                <Text style={styles.title}>Preferences</Text>
                <TouchableOpacity>
                <Text style={styles.subTitle}>Units</Text>
                <Text style={styles.subofsubTitle}>Metric</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.subTitle}>Cordinates System</Text>
                <Text style={styles.subofsubTitle}>Decimal degrees</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.subTitle}>Default map type</Text>
                <Text style={styles.subofsubTitle}>All trails</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.subTitle}>GPS tracking method</Text>
                <Text style={styles.subofsubTitle}>Better accuracy</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.subTitle}>Acvivity time Preference</Text>
                <Text style={styles.subofsubTitle}>Show pace</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.subTitle}>Calorie counter info</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.Container}>
                <Text style={styles.title}>Account</Text>
                <TouchableOpacity>
                <Text style={styles.subTitle}>Restore in-app purchase</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.subTitle}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.subTitle}>Contacts</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.subTitle}>Privacy Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.subTitle}>Email prefrences</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.subTitle}>Push notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.subTitle}>Marketing Language</Text>
                <Text style={styles.subofsubTitle}>You will recieve marketing communications in the languange selected above.</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.subTitle}>Manage Subscriptions</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.subTitle}>Delete Account</Text>
                </TouchableOpacity>
                </View>
              <View style={styles.Container}>
              <Text style={styles.title}>Data</Text>
              <TouchableOpacity>
                <Text style={styles.subTitle}>Download map types</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.subTitle}>Mapa download network</Text>
                <Text style={styles.subofsubTitle}>WiFi or cellular</Text>
              </TouchableOpacity>
              </View>
                <View style={styles.Container}>
                <Text style={styles.title}>Legal</Text>
                <TouchableOpacity>
                <Text style={styles.subTitle}>Privacy policy</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.subTitle}>Terms of service</Text>
              </TouchableOpacity>
                </View>
               <View style={styles.Container}>
               <Text style={styles.title}>Support</Text>
               <TouchableOpacity>
                <Text style={styles.subTitle}>Help centre</Text>
               </TouchableOpacity>
               <TouchableOpacity>
                <Text style={styles.subTitle}>Send log file</Text>
               </TouchableOpacity>
               <TouchableOpacity>
                <Text style={styles.subTitle}>Rate on the Google Play Store</Text>
               </TouchableOpacity>
               </View>
               <View style={styles.Container}>
               <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.subTitle}>Log out</Text>
               </TouchableOpacity>
               </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 10,
        borderBottomWidth: 2,
        borderBottomColor: "grey",
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },
    subTitle: {
        fontSize: 25,
        fontWeight: 'semibold',
        marginBottom: 20,
        marginTop: 20,
    },
    subofsubTitle: {
        fontSize: 20,
        marginBottom: 20,
    }
})
export default SettingsScreeen;