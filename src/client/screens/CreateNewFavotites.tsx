import React, { useState } from "react";
import { Text, View, TextInput, Dimensions, TouchableOpacity, StyleSheet } from "react-native";

const { height, width } = Dimensions.get('window');

const CreateFavoriteScreen = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedPrivacy, setSelectedPrivacy] = useState("Privacy level");

    const handleSelect = (option: string) => {
        setSelectedPrivacy(option);
        setShowDropdown(false);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.listNameInput}
                placeholder="List Name"
            />

            <TextInput
                style={styles.descriptionInput}
                placeholder="Description"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
            />

            <View style={styles.dropdownWrapper}>
                <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} style={styles.dropdownButton}>
                    <Text style={styles.dropdownText}>{selectedPrivacy}</Text>
                </TouchableOpacity>

                {showDropdown && (
                    <View style={styles.dropdownOptions}>
                        {["Public", "Private", "Followers Only"].map(option => (
                            <TouchableOpacity key={option} onPress={() => handleSelect(option)} style={styles.option}>
                                <Text>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    listNameInput: {
        marginTop: 50,
        fontSize: 18,
        width: width * 0.95,
        height: height * 0.06,
        borderWidth: 2,
        borderColor: "grey",
        paddingHorizontal: 10,
    },
    descriptionInput: {
        fontSize: 18,
        width: width * 0.95,
        height: height * 0.2,
        borderWidth: 2,
        borderColor: "grey",
        paddingHorizontal: 10,
        marginVertical: 20,
        textAlignVertical: "top",
    },
    dropdownWrapper: {
        width: width * 0.95,
    },
    dropdownButton: {
        borderWidth: 2,
        borderColor: "grey",
        padding: 12,
        borderRadius: 5,
    },
    dropdownText: {
        fontSize: 16,
    },
    dropdownOptions: {
        marginTop: 5,
        borderWidth: 2,
        borderColor: "grey",
        borderRadius: 5,
        backgroundColor: "#f9f9f9",
    },
    option: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    saveButton: {
        backgroundColor: "grey",
        width: width * 0.95,
        height: height * 0.06,
        marginTop: 30,
        borderRadius: 10,
        justifyContent: "center",
    },
    saveButtonText: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: "center",
        color: "#fff",
    },
});

export default CreateFavoriteScreen;
