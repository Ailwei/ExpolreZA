import React , {useState} from 'react';
import { View,TextInput, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import SearchFilter from '../screens/SearchFilter';
import SearchFilterScreen from '../screens/SearchFilter';

const { height, width } = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isSearching, setIsSearching] = useState(false);
    const [searchText, setSearchText] = useState('');


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
                
{!isSearching ? (
          <TouchableOpacity onPress={() => setIsSearching(true)}>
            <Icon name="search" size={22} color="gray" />
          </TouchableOpacity>
        ) : (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
            />
           <TouchableOpacity
    onPress={() => {
      setSearchText('');
      setIsSearching(false); 
    }}
    style={styles.closeButton}
  >
              <Icon name="times" size={18} color="gray" />
            </TouchableOpacity>
          </View>
        )}
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
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: height  * 0.05,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
},
  searchInput: {
    flex: 1,
    height: 40,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  closeButton: {
    marginLeft: 8,
  },
});

export default Header;