export type RootStackParamList = {
   Explore: {
    screen:
    | 'EditProfileScreen'
    | 'SettingsScreen'
    | 'HomeScreen'
    | 'ShareProfileScreen'
    | 'SettingsScreen'
    | 'SignUpScreen'
    | 'SignInScreen'
    | 'SearchFilterScreen'
    | 'CreateNewListScreen'
    | 'MainScreen'
    | 'ForgotPassword';
    params?: {
      onListCreated?: (newListId: string) => void;
    };
  };
    Home: undefined;
    SignUpScreen: undefined; 
    Profile: undefined, 
    SearchFilterScreen: undefined;
    SignInScreen: undefined;
    EditProfileScreen: undefined;
    ForgotPassword: undefined;
  };