import React from "react";
import { View, Text, FlatList, StyleSheet , TouchableOpacity} from "react-native";
import { useRoute } from "@react-navigation/native";
const FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;

const ViewFavouritesScreen: React.FC = () => {
  const route = useRoute();
  const { favourites = [] } = route.params as { favourites: any[] };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={favourites}
        keyExtractor={(item, idx) => item.id?.toString() || idx.toString()}
        renderItem={({ item }) => (
          console.log("Favourites Item:", item),
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.activity.data?.locationName || item.data?.name || "Unnamed"}
            </Text>
            <Text style={styles.deleteIcon}>
              <TouchableOpacity>

            <FontAwesome5 name="trash" size={16} color="grey" />
              </TouchableOpacity>
            </Text>
          </View>
        )}
      />
      
    </View>
    
  );
  
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  itemText: { fontSize: 16 },
  deleteIcon: { position: "absolute", right: 10, top: 10 },
});

export default ViewFavouritesScreen;