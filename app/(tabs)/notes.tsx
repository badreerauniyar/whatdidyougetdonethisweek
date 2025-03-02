// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
//   SafeAreaView,
// } from "react-native";
// import { ThemedText } from "@/components/ThemedText";
// import { IconButton, FAB } from "react-native-paper";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from '@/hooks/useColorScheme';
// import NewNote from "../component/newNote";
// import Header from "../component/Header";

// export default function Notes() {
//   const [openNewNote, setOpenNewNote] = useState(false);
//   const [notes, setNotes] = useState([
//     { id: "1", title: "Buy Groceries", content: "Milk, Eggs, Bread, Butter" },
//     { id: "2", title: "Meeting Notes", content: "Discuss project deadlines" },
//     { id: "3", title: "Ideas", content: "App improvements, UI tweaks" },
//   ]);
//   const colorScheme = useColorScheme();
//   const themeColors = Colors[colorScheme ?? 'light'];



//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
//       {openNewNote ? (<NewNote onClose={() => setOpenNewNote(false)} />) :
//         <>
//           <Header title="Notes" onDatePickerPress={() => { }} />
//           <FlatList
//             data={notes}
//             keyExtractor={(item) => item.id}
//             numColumns={2}
//             contentContainerStyle={styles.grid}
//             renderItem={({ item }) => (
//               <TouchableOpacity style={styles.noteCard}>
//                 <ThemedText style={styles.noteTitle}>{item.title}</ThemedText>
//                 <Text style={styles.noteContent}>{item.content}</Text>
//               </TouchableOpacity>
//             )}
//           />

//           <FAB
//             style={styles.fab}
//             icon="plus"
//             onPress={() => setOpenNewNote(true)}
//           />
//           </>
//       }
//     </SafeAreaView>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     // color:'red' ;
//   },
//   grid: {
//     paddingHorizontal: 10,
//     paddingTop: 10,
//   },
//   noteCard: {
//     flex: 1,
//     margin: 5,
//     backgroundColor: "#FFCC80",
//     padding: 15,
//     borderRadius: 10,
//     minHeight: 100,
//     justifyContent: "center",
//   },
//   noteTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   noteContent: {
//     fontSize: 14,
//     color: "#555",
//   },
//   fab: {
//     position: "absolute",
//     right: 20,
//     bottom: 100,
//     backgroundColor: "#FF9800",
//   },
// });

import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskComponent from '../component/task';
import { Ionicons } from '@expo/vector-icons';
import Header from '../component/Header';
import NewNote from '../component/newNote';
import { FAB } from 'react-native-paper';

// HomeScreen Component
export default function Notes() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
    const [openNewNote, setOpenNewNote] = useState(false);
  const [notes, setNotes] = useState([
    { id: "1", title: "Buy Groceries", content: "Milk, Eggs, Bread, Butter" },
    { id: "2", title: "Meeting Notes", content: "Discuss project deadlines" },
    { id: "3", title: "Ideas", content: "App improvements, UI tweaks" },
  ]);
  

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {openNewNote ? (
        <NewNote onClose={() => setOpenNewNote(false)} />
      ) : (
        <>
          {/* Header */}
          <Header title="Tasks" onDatePickerPress={()=>{}} />

          

          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.noteCard}>
                <ThemedText style={styles.noteTitle}>{item.title}</ThemedText>
                <Text style={styles.noteContent}>{item.content}</Text>
              </TouchableOpacity>
            )}
          />
          <FAB
            style={styles.fab}
            icon="plus"
            color='white'
            onPress={() => setOpenNewNote(true)}
          />
        </>
      )}
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
    grid: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  noteCard: {
    flex: 1,
    margin: 5,
    backgroundColor: "#444342",
    padding: 15,
    borderRadius: 10,
    minHeight: 100,
    justifyContent: "center",
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noteContent: {
    fontSize: 14,
    color: "#ffffff",
  },
    fab: {
    position: "absolute",
    right: 20,
    bottom: 100,
    backgroundColor: "#444342",
  },
});