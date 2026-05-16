import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './bottomTabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigateEnum } from './type';
import { SIGNIN, SIGNUP, FORGET_PASSWORD } from '@src/const/text';
import Signin from '@src/screen/Signin';
import Signup from '@src/screen/Signup';
import ForgetPassword from '@src/screen/ForgetPassword';

const Stack = createNativeStackNavigator();

function Navigator() {
    return (
        <Stack.Navigator>
            {/* Tabs */}
            <Stack.Screen
                name="Main"
                component={BottomTabs}
                options={{
                    headerShown: false,
                }}
            />

            {/* Screen ngoài tab */}
            <Stack.Screen
                name={NavigateEnum.SIGNIN}
                component={Signin}
                options={({ navigation }) => ({
                    title: SIGNIN,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={28} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name={NavigateEnum.SIGNUP}
                component={Signup}
                options={({ navigation }) => ({
                    title: SIGNUP,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={28} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name={NavigateEnum.FORGET_PASSWORD}
                component={ForgetPassword}
                options={({ navigation }) => ({
                    title: FORGET_PASSWORD,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={28} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
        </Stack.Navigator>
    );
}

export default Navigator;
