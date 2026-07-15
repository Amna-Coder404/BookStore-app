import styles from '@/assets/styles/home.styles';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
import { useAuthStore } from '../../../store/authStore';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from "expo-image";
import Loader from "../../../components/Loader";
import { API_URL } from '../../../constants/api';
import COLORS from '../../../constants/colors';
import { formatPublishDate } from "../../../lib/utils";

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));




export default function Home() {
    const { token } = useAuthStore();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(1);



    const fetchBooks = async (pageNum = 1, refresh = false) => {

        try {
            if (refresh) setRefreshing(true);
            else if (pageNum === 1) setLoading(true);


            const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=2`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Faild to fetch books");

            // if (pageNum === 1 || refresh) {
            //     setBooks(data.books);
            // } else {
            //     setBooks((prev) => [...prev, ...data.books]);
            // }


            const uniqueBooks =
                refresh || pageNum === 1
                    ? data.books
                    : Array.from(new Set([...books, ...data.books].map((book) => book._id))).map((id) =>
                        [...books, ...data.books].find((book) => book._id === id)
                    );

            setBooks(uniqueBooks);



            setHasMore(pageNum < data.totalPages);
            setPage(pageNum)

        } catch (error) {
            console.log("Error fetching books", error);
        } finally {
            if (refresh) setRefreshing(false);
            else setLoading(false);
        }
    }


    useEffect(() => {
        fetchBooks();
    }, []);


    const handleLoadMore = async () => {
        if (hasMore && !loading && !refreshing) {
            await sleep(1000);
            await fetchBooks(page + 1);
        }
    };

    if (loading) return <Loader size={"large"} />

    // Render Book Cards
    const renderItem = ({ item }) => (
        <View style={styles.bookCard}>
            <View style={styles.bookHeader}>
                <View style={styles.userInfo}>
                    <Image source={{ uri: item.user.profileImage }} style={styles.avatar} />
                    <Text style={styles.username}>{item.user.username}</Text>
                </View>
            </View>
            <View style={styles.bookImageContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.bookImage}
                    contentFit='cover'
                />
            </View>
            <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
                <Text style={styles.caption}>{item.caption}</Text>
                <Text style={styles.date}>Shared on {formatPublishDate(item.createdAt)}</Text>
            </View>

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


    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => fetchBooks(1, true)}
                        colors={[COLORS.primary]}
                        tintColor={COLORS.primary}
                    />
                }
                onEndReachedThreshold={0.2}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>BookWorm 🐛</Text>
                        <Text style={styles.headerSubtitle}>Discover great reads from the community👇</Text>
                    </View>
                }
                ListFooterComponent={
                    hasMore && books.length > 0 ? (
                        <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} />
                    ) : null
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="book-outline" size={60} color={COLORS.textSecondary} />
                        <Text style={styles.emptyText}>No recommendations yet</Text>
                        <Text style={styles.emptySubtext}>Be the first to share a book!</Text>
                    </View>
                }
            />
        </View>
    )
}