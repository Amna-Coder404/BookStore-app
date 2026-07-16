import styles from '@/assets/styles/profile.styles';
import { ActivityIndicator, Alert, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';


import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { sleep } from '.';
import Loader from '../../../components/Loader';
import LogoutButton from "../../../components/LogoutButton";
import ProfileHeader from "../../../components/ProfileHeader";
import { API_URL } from '../../../constants/api';
import COLORS from '../../../constants/colors';
import { useAuthStore } from '../../../store/authStore';



export default function Profile() {
    const { token } = useAuthStore();

    const [books, setbooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [deleteBookId, setDeleteBookId] = useState(null);


    const router = useRouter();



    const fetchData = async () => {
        try {
            setIsLoading(true);

            const response = await fetch(`${API_URL}/books/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            })
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch user books");

            setbooks(data);

        } catch (error) {
            console.log("Error fetchinh data:", error);
            Alert.alert("ERROR", "Faild to load profile data. Pull down to refresh.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // Delete Recommendation
    const handleDeleteBook = async (bookId) => {
        try {
            setDeleteBookId(bookId);
            const response = await fetch(`${API_URL}/books/${bookId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Faild to delete book");


            setbooks(books.filter((book) => book._id !== bookId));
            Alert.alert("SUCCESS", "Recommendation deleted successfully");

        } catch (error) {
            console.log('Error deleting recommendations', error);
            Alert.alert(error.message || "Faild to delete recommendation")
        } finally {
            setDeleteBookId(null);
        }
    }

    const confirmDelete = (bookId) => {
        Alert.alert("Delete Recommendation", "Are you sure you want to delete this recommendation?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", onPress: () => handleDeleteBook(bookId), style: "destructive" },
        ])
    }

    const renderBookItem = ({ item }) => (
        <View style={styles.bookItem}>
            <Image source={{ uri: item.image }} style={styles.bookImage} />
            <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
                <Text style={styles.caption}>{item.caption}</Text>
                <Text style={styles.bookDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>

            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item._id)}>
                {deleteBookId === item._id ? (
                    <ActivityIndicator size={'small'} color={COLORS.primary} />
                ) : (
                    <>
                        <Ionicons name='trash-outline' size={20} color={COLORS.primary} />
                    </>
                )}
            </TouchableOpacity>
        </View>
    )
    // renderRating Star 
    const renderRatingStars = (rating) => {
        const star = [];
        for (let i = 1; i <= 5; i++) {
            star.push(
                <Ionicons
                    key={i}
                    name={i <= rating ? "star" : "star-outline"}
                    size={16}
                    color={i <= rating ? "#f4b400" : COLORS.textSecondary}
                    style={{ marginRight: 2 }}
                />
            );

        }

        return star;
    }



    const handleRefresh = async () => {
        setRefreshing(true)
        await sleep(500);
        await fetchData();
        setRefreshing(false)
    }
    if (isLoading && !refreshing) return <Loader />;
    return (
        <View style={styles.container}>
            <ProfileHeader />
            <LogoutButton />

            {/* YOUR RECOMMENDATION */}
            <View style={styles.booksHeader}>
                <Text style={styles.booksTitle}>Your Recommendations 📚</Text>
                <Text style={styles.booksCount}>{books.length} books</Text>
            </View>

            <FlatList
                data={books}
                renderItem={renderBookItem}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.booksList}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[COLORS.primary]}
                        tintColor={COLORS.primary}
                    />
                }

                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="book-outline" size={60} color={COLORS.textSecondary} />
                        <Text style={styles.emptyText}>No recommendations yet</Text>

                        <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
                            <Text style={styles.addButtonText}>Add Your First Book</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    )
}