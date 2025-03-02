import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { IconButton, FAB } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from '@/hooks/useColorScheme';
import NewNote from "../component/newNote";

const Notes = () => {
  const [openNewNote, setOpenNewNote] = useState(false);
  const [notes, setNotes] = useState([
    { id: "1", title: "Buy Groceries", content: "Milk, Eggs, Bread, Butter" },
    { id: "2", title: "Meeting Notes", content: "Discuss project deadlines" },
    { id: "3", title: "Ideas", content: "App improvements, UI tweaks" },
  ]);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const renderHeader = () => (
    <View style={styles.header}>
      <ThemedText style={styles.headerText}>Notes</ThemedText>
      <IconButton icon="magnify" size={24} />
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {openNewNote ?( <NewNote onClose={() => setOpenNewNote(false)} />):
      <>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        ListHeaderComponent={renderHeader}
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
        onPress={() => setOpenNewNote(true)}
      /></>
    }
    </ThemedView>
    
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFF8E1",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  grid: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  noteCard: {
    flex: 1,
    margin: 5,
    backgroundColor: "#FFCC80",
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
    color: "#555",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 100,
    backgroundColor: "#FF9800",
  },
});