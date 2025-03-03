import { Tabs, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [auth, setAuth] = useState<boolean | null>(null); // `null` means checking auth
  const router = useRouter();
  const segments = useSegments();

  // Simulate fetching authentication status
  useEffect(() => {
    const checkAuth = async () => {
      // Simulating authentication check (replace with actual auth logic)
      const isLoggedIn = await fakeAuthCheck();
      setAuth(false);
    };

    checkAuth();
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (auth === false) {
      router.push('/auth/login'); // Redirect to the login screen
    }
  }, [auth, segments, router]);

  if (auth === null) {
    // 🔄 Show Loading Indicator While Checking Auth
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!auth) {
    return null; // Prevents rendering Tabs before redirect happens
  }
  const getCurrentDate = () => {
    const today = new Date();
    return today.getDate().toString().padStart(2, "0");
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Day",
          tabBarIcon: ({ color }) => (
            <Icon name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="weeks"
        options={{
          title: "Weeks",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: "Notes",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="note" color={color} />,
        }}
      />
      <Tabs.Screen
        name="SearchScreen"
        options={{
          href:null,
          title: "Search",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="note" color={color} />,
        }}
      />
    </Tabs>
  );
}

// 🔍 Simulate authentication check (replace this with real auth logic)
async function fakeAuthCheck() {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => resolve(false), 1000); // Change to `true` for authenticated state
  });
}
