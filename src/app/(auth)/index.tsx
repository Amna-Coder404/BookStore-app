import styles from "@/assets/styles/login.styles";
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../../constants/colors";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ShowPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => { }

    return (
        <View style={styles.container}>
            {/* ILLUSTRATION */}
            <View style={styles.topIllustration}>
                <Image source={require("../../../assets/images/i.png")}
                    style={styles.illustrationImage}
                    resizeMode='contain'
                />
            </View>

            <View style={styles.card}>
                <View style={styles.formContainer}>
                    {/* EMAIL  */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="mail-outline"
                                size={20}
                                color={COLORS.primary}
                                style={styles.inputIcon}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Enter you email"
                                placeholderTextColor={COLORS.placeholderText}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                        </View>

                    </View>
                    {/* PASSWORD */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputContainer}>
                            {/* LEFT ICON */}
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color={COLORS.primary}
                                style={styles.inputIcon}
                            />
                            {/* INPUT */}
                            <TextInput
                                style={styles.input}
                                placeholder="Enter you password"
                                placeholderTextColor={COLORS.placeholderText}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!ShowPassword}
                            />

                            {/* RIGHT ICON */}
                            <TouchableOpacity onPress={() => setShowPassword(!ShowPassword)} style={styles.eyeIcon}>
                                <Ionicons
                                    name={ShowPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </View>
        </View>
    )
}

