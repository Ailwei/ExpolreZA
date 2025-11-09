export type RootStackParamList = {
  Explore: {
    screen:
      | 'EditProfileScreen'
      | 'SettingsScreen'
      | 'HomeScreen'
      | 'ShareProfileScreen'
      | 'SignUpScreen'
      | 'SignInScreen'
      | 'SearchFilterScreen'
      | 'CreateNewListScreen'
      | 'MainScreen'
      | 'ForgotPassword'
      | 'ActivityDetails'
      | 'ViewFavouritesScreen'
      | 'ViewMapScreen';

    params?: any;
  };
  Home: undefined;
  SignUpScreen: undefined;
  Profile: undefined;
  SearchFilterScreen: undefined;
  SignInScreen: undefined;
  EditProfileScreen: undefined;
  ForgotPassword: undefined;
  ActivityDetails: { activity: any; isFavourited: boolean };
  ViewFavouritesScreen: { favourites: any[] };
  ViewMapScreen: { lat: number; lng: number; title?: string };


};