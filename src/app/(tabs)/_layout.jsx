import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../../constants/colors';


export default function TabsLayout() {
    const insets = useSafeAreaInsets();

    const TAB_BAR_HEIGHT = 60;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,

                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textSecondary,

                tabBarStyle: {
                    backgroundColor: COLORS.cardBackground,

                    borderTopColor: COLORS.border,
                    borderTopWidth: 1,

                    height: TAB_BAR_HEIGHT + insets.bottom,

                    paddingTop: 6,
                    paddingBottom: insets.bottom + 4,

                    elevation: 0,
                    shadowOpacity: 0,
                },

                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                    marginTop: 2,
                },

                tabBarIconStyle: {
                    marginBottom: 0,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",

                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="home-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="create"
                options={{
                    title: "Create",

                    tabBarIcon: ({ color, size }) => (
                        <AntDesign
                            name="plus-circle"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",

                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}