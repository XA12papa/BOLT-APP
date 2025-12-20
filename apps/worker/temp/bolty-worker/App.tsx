import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Discover from './src/screens/Discover';
import Matches from './src/screens/Matches';
import Profile from './src/screens/Profile';
import { Ionicons } from '@expo/vector-icons';
import { MatchesProvider } from './src/context/MatchesContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <MatchesProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: '#FF5864',
              tabBarInactiveTintColor: '#555',
              tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#eee' },
              tabBarIcon: ({ color, size }) => {
                const name =
                  route.name === 'Discover'
                    ? 'heart-outline'
                    : route.name === 'Matches'
                    ? 'chatbubble-outline'
                    : 'person-outline';
                return <Ionicons name={name as any} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Discover" component={Discover} />
            <Tab.Screen name="Matches" component={Matches} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        </NavigationContainer>
      </MatchesProvider>
    </SafeAreaProvider>
  );
}