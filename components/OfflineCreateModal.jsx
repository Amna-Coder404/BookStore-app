import { Ionicons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import COLORS from "../constants/colors";

const OfflineCreateModal = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>

                    {/* ICON */}
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="cloud-offline-outline"
                            size={34}
                            color={COLORS.primary}
                        />
                    </View>

                    {/* TITLE */}
                    <Text style={styles.title}>
                        You're offline
                    </Text>

                    {/* DESCRIPTION */}
                    <Text style={styles.description}>
                        Connect to the internet to create a new book.
                        Your existing books are still available.
                    </Text>

                    {/* BUTTON */}
                    <TouchableOpacity
                        onPress={onClose}
                        activeOpacity={0.85}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            Got it
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        backgroundColor: "rgba(0, 0, 0, 0.45)",
    },

    modal: {
        width: "100%",
        maxWidth: 360,
        alignItems: "center",
        paddingHorizontal: 28,
        paddingVertical: 30,
        borderRadius: 20,
        backgroundColor: COLORS.background,
    },

    iconContainer: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: COLORS.cardBackground,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    title: {
        color: COLORS.textDark,
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 10,
        textAlign: "center",
    },

    description: {
        color: COLORS.textSecondary,
        fontSize: 14,
        lineHeight: 21,
        textAlign: "center",
        marginBottom: 28,
    },

    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 13,
        paddingHorizontal: 40,
        borderRadius: 12,
    },

    buttonText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "700",
    },
});

export default OfflineCreateModal;