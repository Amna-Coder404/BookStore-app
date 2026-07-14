import styles from "@/assets/styles/create.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import COLORS from "../../../constants/colors";

import * as ImagePicker from "expo-image-picker";
import { API_URL } from "../../../constants/api";
import { useAuthStore } from "../../../store/authStore";
export default function Create() {
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [rating, setRating] = useState(0);
    const [image, setImage] = useState<string | null>(null);//to display the selected image
    const [imageBase64, setImageBase64] = useState<string | null>(null);//image to text link 
    const [loading, setLoading] = useState(false);


    const router = useRouter();
    const { token } = useAuthStore()

    const pickImage = async () => {
        try {
            // Request permission if needed
            if (Platform.OS !== "web") {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

                if (status !== "granted") {
                    Alert.alert("Permission Denied", "We need camera roll permissions to upload an image");
                    return;
                }
            }

            // launch image library
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: "images",
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5,
                base64: true
            });


            if (!result.canceled) {
                setImage(result.assets[0].uri);

                // if base64 is provided,use it 
                if (result.assets[0].base64) {
                    setImageBase64(result.assets[0].base64);
                }
            }

        } catch (error) {

        }
    }

    const handleSubmit = async () => {
        if (!title || !caption || !imageBase64 || !rating || !image) {
            Alert.alert("ERROR ", "Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            // get file extension from URI or default to jpeg
            const uriParts = image.split(".");
            const fileType = uriParts[uriParts.length - 1];
            const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";

            const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

            const response = await fetch(`${API_URL}/books`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    caption,
                    rating: rating.toString(),
                    image: imageDataUrl,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Something went wrong");

            Alert.alert("Success", "Your book recommendation has been posted!");

            // Reset 
            setTitle("");
            setCaption("");
            setRating(0);
            setImage(null);
            setImageBase64(null);

            router.push("/");
        } catch (error) {
            const e = error as Error;
            console.error("Error creating post :", e);
            Alert.alert("ERROR", e.message || "Somthing went wrong");
        } finally {
            setLoading(false);
        }
    }


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
    console.log("Token is", token);
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
                                    <View style={styles.previewImage}>
                                        <Image source={{ uri: image }} style={styles.previewImage} />
                                    </View>
                                ) : (
                                    <View style={styles.placeholderContainer}>
                                        <Ionicons name="image" size={40} color={COLORS.textSecondary} />
                                        <Text style={styles.placeholderText}>Tab to select image</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Caption */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Caption</Text>

                            <TextInput
                                placeholder="Write your review or thoughts about the book....."
                                placeholderTextColor={COLORS.placeholderText}
                                value={caption}
                                onChangeText={setCaption}
                                style={[styles.textArea, { paddingTop: 0 }]}
                                multiline
                            />

                        </View>

                        {/* Post Button */}
                        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                            {loading ?
                                (
                                    <ActivityIndicator color={COLORS.white} />
                                ) :
                                (
                                    <>
                                        <Ionicons name="cloud-upload" style={styles.buttonIcon} size={20} color={"white"} />
                                        <Text style={styles.buttonText}>Post Recommendation</Text>
                                    </>
                                )}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ---------------------End-View------------ */}
            </ScrollView>
        </KeyboardAvoidingView >
    )
}