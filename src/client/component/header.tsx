import React , {useState} from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import SearchFilter from '../screens/SearchFilter';
import SearchFilterScreen from '../screens/SearchFilter';

const { height, width } = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isSearching, setIsSearching] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Google Places Autocomplete */}
        <GooglePlacesAutocomplete
          placeholder="Search for a location"
          onPress={(data, activityDetails = null) => {
            console.log(data, activityDetails);
            setIsSearching(false);
          }}
          query={{
            key: "09058695789ugrjhgbgbtvh4b756584576",
            language: "en",
          }}
          styles={{
            textInput: styles.searchInput,
            container: styles.searchContainer,
          
          }}
        />
        <Icon name="search" size={20} color="gray" style={styles.searchIcon} />

        {/* Filter Button */}
        <TouchableOpacity 
        onPress={() => navigation.navigate('SearchFilterScreen')}
        style={styles.filterButton}
        >
          <Icon name="sliders-h" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    marginTop: 2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: height * 0.2,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    height: height * 0.06,
    borderColor: 'gray',
    borderWidth: 3,
    borderRadius: 10,
    paddingLeft: 80,
    backgroundColor: '#fff',
    justifyContent: "space-between",
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
  },
  searchIcon: {
   left: 20,
    height: height * 0.1,
    position: 'absolute',
    bottom: 10,
   
  },
});

export default Header;