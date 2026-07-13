import styles from "@/assets/styles/create.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import COLORS from "../../../constants/colors";

import * as ImagePicker from "expo-image-picker";
export default function Create() {
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [rating, setRating] = useState(0);
    const [image, setImage] = useState("");//to display the selected image
    const [imageBase64, setImageBase64] = useState(null);//image to text link 
    const [loading, setLoading] = useState(false);


    const router = useRouter();

    const pickImage = async () => {
        console.log("Button pressed");
        try {
            // Request permission if needed
            if (Platform.OS !== "web") {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

                console.log("Permission:", status);

                if (status !== "granted") {
                    Alert.alert("Permission Denied");
                    return;
                }
            }

            // launch image library
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5,
            });

            console.log(result);
            if (!result.canceled) {
                console.log("result are : ", result);
                setImage(result.assets[0].uri);
            }

        } catch (error) {

        }
    }

    const handleSubmit = async () => { }


    // Renders an interactive 5-star rating picker.
    const renderRatingPicker = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starButton}>
                    <Ionicons
                        name={i <= rating ? "star" : "star-outline"}
                        size={32}
                        color={i <= rating ? "#f4b400" : COLORS.textSecondary}
                    />
                </TouchableOpacity>
            )
        }

        return <View style={styles.ratingContainer}>{stars}</View>
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle} >

                <View style={styles.card}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Add Book Recommendation</Text>
                        <Text style={styles.subtitle}>Share your favorite reads with others</Text>
                    </View>

                    {/* FeedBack Form  */}
                    <View style={styles.form}>
                        {/* Book Title */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Book title</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="book-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter book title"
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={title}
                                    onChangeText={setTitle}
                                />
                            </View>
                        </View>

                        {/* Rating */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Your Rating</Text>
                            {renderRatingPicker()}
                        </View>

                        {/* Book Image */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Book Image</Text>
                            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                                {image ? (
                                    <View style={styles.previewImage}></View>
                                ) : (
                                    <View style={styles.placeholderContainer}>
                                        <Ionicons name="image" size={40} color={COLORS.textSecondary} />
                                        <Text style={styles.placeholderText}>Tab to select image</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* ---------------------End-View------------ */}
            </ScrollView>
        </KeyboardAvoidingView >
    )
}