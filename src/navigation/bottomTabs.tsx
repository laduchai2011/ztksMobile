import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HOME, PROFILE } from '@src/const/text';
import { NavigateEnum } from './type';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '@src/screen/Home';
import Profile from '@src/screen/Profile';

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#1E90FF', // màu nền header
                },
                headerTintColor: '#fff', // màu chữ + icon
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Tab.Screen
                name={NavigateEnum.HOME}
                component={Home}
                options={({ navigation }) => ({
                    title: HOME,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={28} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Tab.Screen
                name={NavigateEnum.PROFILE}
                component={Profile}
                options={({ navigation }) => ({
                    title: PROFILE,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={28} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
        </Tab.Navigator>
    );
}

export default BottomTabs;
