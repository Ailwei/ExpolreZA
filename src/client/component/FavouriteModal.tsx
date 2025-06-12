import React from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import FavouritesScreen from "../screens/FavouritesScreen";

type FavouritesModalProps = {
    visible: boolean;
    onClose: () => void;
    onSelectList: (listId: string) => void;
    onListCreated?: (newListId: string) => void;
    
};

const FavouritesModal: React.FC<FavouritesModalProps> = ({ visible, onClose, onSelectList , onListCreated}) => (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <View style={styles.overlay}>
            <View style={styles.content}>
                 <FavouritesScreen
                    onSelectList={onSelectList}
                    isModal
                    onListCreated={onListCreated}
                />
                
                <TouchableOpacity onPress={onClose} style={{ marginTop: 10 }}>
                    <Text style={{ color: "red", textAlign: "center" }}>Cancel</Text>
                </TouchableOpacity>
                
            </View>
        
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        width: "90%",
        maxHeight: "80%"
    }
});

export default FavouritesModal;