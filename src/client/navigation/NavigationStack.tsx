import React from 'react';
import FavouriteHeaderIcon from '../component/FavouriteIconHedaer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
const FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { View } from 'react-native';


// Screens
import HomeScreen from '../screens/HomeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SearchFilterScreen from '../screens/SearchFilter';
import MainScreen from '../screens/mainScreen';
import CommunityScreen from '../screens/CommunityScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import SignInScreen from '../screens/SignInScreen';
import { TouchableOpacity } from 'react-native';
import { Menu, PaperProvider } from 'react-native-paper';
import { useState } from 'react';
import { RootStackParamList } from '../types/RootStackParamList';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import SettingsScreeen from '../screens/SettingsScreen';
import ForgotPassword from '../screens/forgotPassowrd';
import CreateNewListScreen from '../screens/CreateNewList';
import ActivityDetails from '../screens/activityDetails';
import ShareHeaderIcon from '../component/shareIcon';
import CompletedHeaderIcon from '../component/comlptedIcon';
import ViewFavouritesScreen from '../screens/viewFavouritesScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const FavouritesStack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name="CreateNewListScreen" component={CreateNewListScreen} />
      <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: true }} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreeen} options={{ headerShown: true }} />
      <Stack.Screen name="SearchFilterScreen" component={SearchFilterScreen} options={{ headerShown: true }} />
      <Stack.Screen
        name="ActivityDetails"
        component={ActivityDetails}
        options={({ route }) => ({
          headerShown: true,
          title: '',
          headerRight: () => {
            const navigation = useNavigation<NavigationProp<RootStackParamList>>();
            const params = route.params as { isFavourited: boolean };
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                
                <ShareHeaderIcon isFavourited={false} onPress={() => { }} />
                <CompletedHeaderIcon isFavourited={false} onPress={() => { }} />
                <FavouriteHeaderIcon
                  isFavourited={params?.isFavourited ?? false}
                  onPress={() => {
                    navigation.navigate('Favourites' as never);
                  }}
                /> 
              </View>
            );
          },
        })}

      />
    </Stack.Navigator>
  );
}
function FavouritesStackScreen() {
  return (
    <FavouritesStack.Navigator>
      <FavouritesStack.Screen name="FavouritesScreen" component={FavouritesScreen}  options={{headerShown: true, title:"Lists"}}/>
      <FavouritesStack.Screen name="ViewFavouritesScreen" component={ViewFavouritesScreen} options={{ headerShown: true, title: "Favourites" }} />
    </FavouritesStack.Navigator>
  );
}
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';
        const hideTabBar =
          route.name === 'Explore' &&
          (routeName === 'HomeScreen' || routeName === 'SearchFilterScreen' || routeName === 'SignUpScreen');

        return {
          tabBarStyle: hideTabBar
            ? { display: 'none' }
            : {
              backgroundColor: '#f8f8f8',
              borderTopWidth: 1,
              borderTopColor: '#ddd',
            },
          tabBarIcon: ({ color, size }) => {
            let iconName = '';

            if (route.name === 'Profile') {
              iconName = 'user';
            } else if (route.name === 'Explore') {
              iconName = 'search';
            } else if (route.name === 'Community') {
              iconName = 'users';
            } else if (route.name === 'Favourites') {
              iconName = 'bookmark';
            }

            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007BFF',
          tabBarInactiveTintColor: 'gray',
        };
      }}
    >
    <Tab.Screen
  name="Explore"
  component={MainStack}
  listeners={({ navigation, route }) => ({
    tabPress: e => {
      const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';

      if (navigation.isFocused() && routeName !== 'HomeScreen') {
        e.preventDefault();
      }
    },
  })}
  options={({ route }) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';
    const hideTabBar =
      routeName === 'HomeScreen' ||
      routeName === 'SearchFilterScreen' ||
      routeName === 'SignUpScreen' ||
      routeName === 'SignInScreen';

    return {
      headerShown: false,
      tabBarStyle: hideTabBar ? { display: 'none' } : undefined,
    };
  }}
/>

      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Favourites" component={FavouritesStackScreen} options={{headerShown: false}} /> 
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerRight: () => {

            const navigation = useNavigation<NavigationProp<RootStackParamList>>();
            const [visible, setVisible] = useState(false);

            const showMenu = () => setVisible(true);
            const hideMenu = () => setVisible(false);

            return (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, paddingBottom: 4 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Explore', { screen: 'SettingsScreen' })}

                  style={{ marginRight: 10 }}
                >

                  <FontAwesome5 name="cog" size={24} color="black" />
                </TouchableOpacity>

                <Menu
                  visible={visible}
                  anchor={
                    <TouchableOpacity onPress={showMenu}
                    >
                      <FontAwesome5 name="ellipsis-v" size={24} color="black" />
                    </TouchableOpacity>
                  }
                  onDismiss={hideMenu}
                >
                  <Menu.Item
                    onPress={() => {
                      hideMenu();
                      navigation.navigate('Explore', { screen: 'EditProfileScreen' });
                    }}
                    title="Edit Profile"
                  />
                  <Menu.Item
                    onPress={() => {
                      hideMenu();
                      navigation.navigate('Explore', { screen: 'ShareProfileScreen' });
                    }}
                    title="ShareProfile" />
                </Menu>
              </View>
            );
          }
        }}

      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <PaperProvider>
      <BottomTabs />
    </PaperProvider>
  );
}

export default AppNavigator;