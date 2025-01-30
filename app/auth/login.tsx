import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText>Login Screen</ThemedText>
      <Button title="Go to Home" onPress={() => router.replace("/")} />
    </View>
  );
}
