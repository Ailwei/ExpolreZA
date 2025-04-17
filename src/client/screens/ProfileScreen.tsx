import React, { useState } from "react";
import { View, Text, Image, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { TabView, SceneMap, TabBar } from "react-native-tab-view";


const Feeds = () => (
    <View style={styles.tabContent}>
        <Text>Feeds</Text>
    </View>
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
const Photos = () => (
    <View style={styles.tabContent}>
        <Text>Photos</Text>
    </View>
);

const { height, width } = Dimensions.get('window')
const ProfileScreen = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'feeds', title: 'Feeds' },
        { key: 'reviews', title: 'Reviews' },
        { key: 'posts', title: 'Posts' },
        { key: 'photos', title: 'Photos' },
    ]);
    const renderScene = SceneMap({
        feeds: Feeds,
        reviews: Reviews,
        posts: Posts,
        photos: Photos,
    });
    return (
        <View style={styles.imageContainer}>
            <Image source={require('../assets/mess.jpg')}
                style={styles.profile}
                resizeMode="contain"
            />
            <View>
                <Text style={styles.userNameLabel}>Lionel Messi</Text>
                <View>
                    <Text style={styles.locationLabel}>Rosario, Santa Fe , Argentina</Text>
                </View>
                <View style={styles.followersContainer}>
                    <TouchableOpacity
                        onPress={() => console.log('Followers')}
                    >
                        <Text style={styles.followersLabel} >Folowers(25)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log('Following')}
                    >
                        <Text style={styles.followingLabel}>Following(20)</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get('window').width }}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        style={{ backgroundColor: 'grey' }}
                        indicatorStyle={{ backgroundColor: 'white' }}
                        scrollEnabled={true}
                        tabStyle={{ width: width * 0.25 }}
                    />
                )}
            />
        </View>

    )
}

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
        width: width * 0.31,
        height: height * 0.14,
    },
    userNameLabel: {
        fontSize: 25,
        marginTop: 10,
        color: '#000',
        marginLeft: 20,

    },
    locationLabel: {
        fontSize: 15,
        marginTop: 10,
        color: '#000',
        marginLeft: 20,
    },
    followersLabel: {
        color: "white",
        fontSize: 25,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 2,
        width: width * 0.4,
        height: height * 0.04,
        backgroundColor: "green",
        textAlign: 'center',
    },
    followingLabel: {
        fontSize: 25,
        marginTop: 10,
        color: 'white',
        borderRadius: 10,
        borderWidth: 2,
        width: width * 0.4,
        height: height * 0.04,
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
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",

    }

})
export default ProfileScreen