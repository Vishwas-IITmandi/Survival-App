import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import CompassScreen from '../screens/CompassScreen';
import ChatScreen from '../screens/ChatScreen';
import ModelScreen from '../screens/ModelScreen';
import { Model } from '../types';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  const handleModelSelected = (model: Model) => {
    setSelectedModel(model);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF4500',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: '#333',
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Compass"
        component={CompassScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="compass-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="chatbubble-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <ChatScreen selectedModel={selectedModel} />}
      </Tab.Screen>
      <Tab.Screen
        name="Models"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cloud-download-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <ModelScreen onModelSelected={handleModelSelected} selectedModel={selectedModel} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
