import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import LawBrowser from './screens/LawBrowser';
import LawDetail from './screens/LawDetail';
import SearchScreen from './screens/SearchScreen';
import QuizScreen from './screens/QuizScreen';
import BookmarkScreen from './screens/BookmarkScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="LawBrowser" component={LawBrowser} />
      <Stack.Screen name="LawDetail" component={LawDetail} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0a1628',
            borderTopColor: '#c9a84c30',
            paddingBottom: 8,
            height: 60,
          },
          tabBarActiveTintColor: '#c9a84c',
          tabBarInactiveTintColor: '#a8b8cc',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Bookmark') iconName = focused ? 'bookmark' : 'bookmark-outline';
            else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: 'হোম' }} />
        <Tab.Screen name="Bookmark" component={BookmarkScreen} options={{ tabBarLabel: 'সংরক্ষিত' }} />
        <Tab.Screen name="Profile" component={BookmarkScreen} options={{ tabBarLabel: 'প্রোফাইল' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}