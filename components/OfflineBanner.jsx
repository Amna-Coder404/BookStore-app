import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/colors";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

const OfflineBanner = () => {
    const { isOnline } = useNetworkStatus();

    if (isOnline) {
        return null;
    }

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: COLORS.card,
                    borderBottomColor: COLORS.primary,
                },
            ]}
        >
            <View
                style={[
                    styles.iconContainer,
                    {
                        backgroundColor: COLORS.primary,
                    },
                ]}
            >
                <Ionicons
                    name="cloud-offline-outline"
                    size={18}
                    color="#FFFFFF"
                />
            </View>

            <View style={styles.textContainer}>
                <Text
                    style={[
                        styles.title,
                        { color: "#FFFFFF" },
                    ]}
                >
                    You're offline
                </Text>

                <Text
                    style={[
                        styles.subtitle,
                        { color: "#AAAAAA" },
                    ]}
                >
                    Check your connection. Some features may not be available.
                </Text>
            </View>

            <View
                style={[
                    styles.statusDot,
                    { backgroundColor: "#FF4D00" },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        elevation: 9999,

        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,

        backgroundColor: COLORS.cardBackground,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
    },

    textContainer: {
        flex: 1,
    },

    title: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 2,
    },

    subtitle: {
        fontSize: 12,
        lineHeight: 17,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 10,
    },
});

export default OfflineBanner;