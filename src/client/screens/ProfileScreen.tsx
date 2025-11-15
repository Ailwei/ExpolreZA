import React, { useEffect, useState } from "react";
import { View, Text, Image,ScrollView, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import CompletedScreen from "./Comleted";

const Feeds = () => (
    <ScrollView style={styles.tabContent}>
        <Text>Feeds</Text>
    </ScrollView>
);
const Reviews = () => (
    <View style={styles.tabContent}>
        <Text>Reviews</Text>
    </View>
);
const Posts = () => (
    <View style={styles.tabContent}>
        <Text>Posts</Text>
    </View>
);
const Completed = () => (
  <ScrollView
    contentContainerStyle={{ padding: 10 }}
    showsVerticalScrollIndicator={true}
    nestedScrollEnabled={true}
  >
    <CompletedScreen />
  </ScrollView>
);



const { height, width } = Dimensions.get('window');
type UserProfile = {
    firstName?: string;
    lastName?: string;
    followers?: any[];
    following?: any[];
    profilePic?: string;
};

const ProfileScreen = () => {
    const [uploading, setUploading] = useState(false);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'feeds', title: 'Feeds' },
        { key: 'reviews', title: 'Reviews' },
        { key: 'posts', title: 'Posts' },
        { key: 'completed', title: 'Completed' },
    ]);
    const renderScene = SceneMap({
        feeds: Feeds,
        reviews: Reviews,
        posts: Posts,
        completed: Completed,
    });

    const fetchProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const res = await axios.get('http://192.168.18.29:3000/api/getProfile', config);
                setProfile(res.data.user);
                console.log("User profile fetched successfully:", res.data.user);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

   
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            setUploading(true);
            const token = await AsyncStorage.getItem('token');
            const formData = new FormData();
            formData.append('profilePic', {
                uri: result.assets[0].uri,
                name: 'profile.jpg',
                type: 'image/jpeg',
            } as any);

            await axios.post('http://192.168.18.29:3000/api/uploadProfilePic', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            await fetchProfile(); 
            setUploading(false);
        }
    };

    return (
        <ScrollView style={{ flex: 1 }} >
         <View style={{ flex: 1 }}>
   
        <View style={styles.imageContainer}>
            
            <TouchableOpacity onPress={pickImage} disabled={uploading}>
                <Image
                    source={
                        profile?.profilePic
                            ? { uri: `http://192.168.18.29:3000/uploads/${profile.profilePic}` }
                            : require('../assets/defaultPic.png')
                    }
                    style={styles.profile}
                />
            </TouchableOpacity>

            <Text style={styles.userNameLabel}>
                {profile?.firstName} {profile?.lastName}
            </Text>

            <View style={styles.followersContainer}>
                <TouchableOpacity>
                    <Text style={styles.followersLabel}>
                        Followers: {profile?.followers?.length ?? 0}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.followingLabel}>
                        Following: {profile?.following?.length ?? 0}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{height: height }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: width }}
                    renderTabBar={(props) => (
                        <TabBar
                            {...props}
                            style={{ backgroundColor: 'grey' }}
                            indicatorStyle={{ backgroundColor: 'white' }}
                            scrollEnabled
                        />
                    )}
                    
                />
            </View>

        </View>
    </View>
        </ScrollView>

);
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    profile: {
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#000',
        marginLeft: 20,
        borderRadius: 60,
        width: width * 0.21,
        height: height * 0.10,
    },
    userNameLabel: {
        fontSize: 15,
        marginTop: 10,
        color: '#000',
        marginLeft: 20,
    },
    followersLabel: {
        color: "white",
        fontSize: 18,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 2,
        width: width * 0.4,
        height: height * 0.05,
        backgroundColor: "green",
        textAlign: 'center',
    },
    followingLabel: {
        fontSize: 18,
        marginTop: 10,
        color: 'white',
        borderRadius: 10,
        borderWidth: 2,
        width: width * 0.4,
        height: height * 0.05,
        backgroundColor: "green",
        textAlign: 'center',
    },
    followersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 2,
    },
    containerProfileAcivity: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    tabContent: {
        padding: 10,
    }
});

export default ProfileScreen;