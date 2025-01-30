import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type TaskComponentProps = {
  date: string;
  onClose: () => void;
};

export default function TaskComponent({ date, onClose }: TaskComponentProps) {
  const [tasks, setTasks] = useState<string[]>([]);
    const colorScheme = useColorScheme();
  
    const themeColors = Colors[colorScheme ?? 'light'];
  
  const handleAddTask = () => {
    const newTask = `Task ${tasks.length + 1}`;
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={onClose}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Date Text */}
      <ThemedText style={styles.dateText}>{date}</ThemedText>

      {/* Task List (Flexible Space) */}
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ThemedText style={styles.taskItem}>{item}</ThemedText>}
        ListEmptyComponent={<View />} // Keeps layout intact even when empty
        contentContainerStyle={styles.taskList}
      />

      {/* Add Task Button at the Bottom */}
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <ThemedText>Click to add your first task</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'blue'
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 16,
  },
  dateText: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 16,
  },
  taskList: {
    flexGrow: 1, 
    
  },
  taskItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 55, //
    // marginBottom: 5,
  },
});

