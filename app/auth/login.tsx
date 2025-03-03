// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { useWindowDimensions } from "react-native";
// import { ThemedText } from "@/components/ThemedText";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import { AntDesign } from "@expo/vector-icons";
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";

// WebBrowser.maybeCompleteAuthSession();

// // ✅ Firebase Configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBgsrw8VHo_B6D9gOoNTruATftMcHMAebU",
//   authDomain: "whatdidyougetdonethiswee-ca4a3.firebaseapp.com",
//   projectId: "whatdidyougetdonethiswee-ca4a3",
//   storageBucket: "whatdidyougetdonethiswee-ca4a3.firebasestorage.app",
//   messagingSenderId: "523153839670",
//   appId: "1:523153839670:web:d1cfed2ce3d0f7f54cea97",
//   measurementId: "G-3QDGTRMV8G"
// };

// // ✅ Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export default function LoginScreen() {
//   const router = useRouter();
//   const { width } = useWindowDimensions();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // ✅ Google Authentication
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     // clientId: "YOUR_CLIENT_ID.apps.googleusercontent.com",
//     // androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
//     iosClientId: "523153839670-4piri59j03ok06gdiv4hv60fs5ouvh4m.apps.googleusercontent.com",
//   });

//   useEffect(() => {
//     if (response?.type === "success") {
//       const idToken = response?.authentication?.idToken;
//       if (idToken) {
//         const credential = GoogleAuthProvider.credential(idToken);

//       // 🔥 Sign in with Firebase
//       signInWithCredential(auth, credential)
//         .then((userCredential) => {
//           console.log("User signed in:", userCredential.user);
//           router.replace("/"); // Redirect to home after login
//         })
//       }
//     }
//   }, [response]);

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{ flex: 1 }}
//     >
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             padding: 16,
//           }}
//         >
//           <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
//             Login
//           </ThemedText>

//           {/* Email Input */}
//           <TextInput
//             placeholder="Enter your Gmail ID"
//             keyboardType="email-address"
//             autoCapitalize="none"
//             value={email}
//             onChangeText={setEmail}
//             style={{
//               width: width * 0.9,
//               maxWidth: 400,
//               height: 50,
//               borderColor: "#ccc",
//               color: "white",
//               borderWidth: 1,
//               borderRadius: 10,
//               paddingHorizontal: 15,
//               marginVertical: 10,
//             }}
//           />

//           {/* Password Input */}
//           <TextInput
//             placeholder="Enter your password"
//             secureTextEntry
//             autoCapitalize="none"
//             value={password}
//             onChangeText={setPassword}
//             style={{
//               width: width * 0.9,
//               maxWidth: 400,
//               height: 50,
//               borderColor: "#ccc",
//               color: "white",
//               borderWidth: 1,
//               borderRadius: 10,
//               paddingHorizontal: 15,
//               marginVertical: 10,
//             }}
//           />

//           {/* Login Button */}
//           <TouchableOpacity
//             style={{
//               width: width * 0.9,
//               maxWidth: 400,
//               backgroundColor: "#007AFF",
//               paddingVertical: 12,
//               borderRadius: 10,
//               alignItems: "center",
//               marginVertical: 10,
//             }}
//           >
//             <Text style={{ color: "white", fontSize: 16 }}>Login</Text>
//           </TouchableOpacity>

//           {/* Forgot Password */}
//           <TouchableOpacity onPress={() => alert("Forgot Password clicked!")}>
//             <Text style={{ color: "#007AFF", marginBottom: 20 }}>
//               Forgot Password?
//             </Text>
//           </TouchableOpacity>

//           {/* Google Login Button (Icon) */}
//           <TouchableOpacity
//             onPress={() => promptAsync()}
//             style={{
//               backgroundColor: "white",
//               padding: 12,
//               borderRadius: 50,
//               alignItems: "center",
//               justifyContent: "center",
//               elevation: 5,
//               shadowColor: "#000",
//               shadowOffset: { width: 1, height: 1 },
//               shadowOpacity: 0.3,
//               shadowRadius: 3,
//             }}
//           >
//             <AntDesign name="google" size={24} color="#DB4437" />
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

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
