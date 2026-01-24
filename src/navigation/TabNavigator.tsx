import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CompassScreen from '../screens/CompassScreen';
import ChatScreen from '../screens/ChatScreen';
import ModelScreen from '../screens/ModelScreen';
import { Model } from '../types';
import { colors } from '../styles/globalStyles';
import CompassIcon from '../assets/icons/CompassIcon';
import ChatIcon from '../assets/icons/ChatIcon';
import ModelsIcon from '../assets/icons/ModelsIcon';

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
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.surfaceDark,
          borderTopColor: colors.border,
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
            <CompassIcon size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        options={{
          tabBarIcon: ({ color, size }) => (
            <ChatIcon size={size} color={color} />
          ),
        }}
      >
        {() => <ChatScreen selectedModel={selectedModel} />}
      </Tab.Screen>
      <Tab.Screen
        name="Models"
        options={{
          tabBarIcon: ({ color, size }) => (
            <ModelsIcon size={size} color={color} />
          ),
        }}
      >
        {() => <ModelScreen onModelSelected={handleModelSelected} selectedModel={selectedModel} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
