import { Text, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../../../store/authStore';

export default function Profile() {
    const { user, logout } = useAuthStore();
    return (
        <View>
            <Text>Hello  {user?.username}</Text>
            <Text>Email : {user?.email}</Text>


            <TouchableOpacity onPress={() => logout()}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}