import styles from '@/assets/styles/login.styles'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableNativeFeedbackComponent, TouchableOpacity, View } from 'react-native'
import COLORS from '../../../constants/colors'
import { useAuthStore } from '../../../store/authStore'

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ShowPassword, setShowPassword] = useState(false);

    const { user, isLoading, register, token } = useAuthStore();
    const router = useRouter();

    const handleSignUp = async () => {
        const result = await register(username, email, password);
        if (!result.success) Alert.alert("ERROR", result.error);
    }
    console.log(user);
    console.log(token);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? 'padding' : 'height'}>
            <View style={styles.container}>
                <View style={styles.card}>
                    {/* HEADER */}
                    <View style={styles.header}>
                        <Text style={styles.title}>BookWorm🐛</Text>
                        <Text style={styles.subtitle}>Share your favorite reads</Text>
                    </View>

                    {/* form container */}
                    <View style={styles.formContainer}>
                        {/* Username Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name="person-outline"
                                    size={20}
                                    color={COLORS.primary}
                                    style={styles.inputIcon}
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder="John Doe"
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={username}
                                    onChangeText={setUsername}
                                    autoCapitalize='none'
                                />

                            </View>

                        </View>

                        {/* Email Input */}
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
                                    placeholder="johndoe@gmail.com"
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                />
                            </View>
                        </View>

                        {/* Password Input */}
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
                                    placeholder="********"
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

                        {/*  Sign Up BUTTON */}
                        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
                            {
                                isLoading ? (
                                    <ActivityIndicator color={"#fff"} />
                                ) :
                                    (
                                        <Text style={styles.buttonText}>Sign Up</Text>
                                    )
                            }
                        </TouchableOpacity>

                        {/* FOOTER */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Already have an account ? </Text>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text style={styles.link}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}