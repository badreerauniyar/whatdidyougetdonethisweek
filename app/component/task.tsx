// components/TaskComponent.tsx
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

type TaskComponentProps = {
  date: string;
  onClose: () => void;
};

export default function TaskComponent({ date, onClose }: TaskComponentProps) {
  const [tasks, setTasks] = useState<string[]>([]);

  const handleAddTask = () => {
    const newTask = `Task ${tasks.length + 1}`;
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <ThemedText style={styles.dateText}>{date}</ThemedText>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ThemedText style={styles.taskItem}>{item}</ThemedText>}
      />
      <TouchableOpacity style={styles.emptyState} onPress={handleAddTask}>
        <ThemedText>Click to add your first task</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    display: 'flex'
  },
  button: {
    marginBottom: 16
  },
  dateText: {
    fontSize: 24,
    marginBottom: 16,
  },
  taskItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  emptyState: {
    // padding: 6,
    // borderWidth: 1,
    // borderColor: '#ddd',
    // borderRadius: 8,
    // alignItems: 'center',
  },
});
