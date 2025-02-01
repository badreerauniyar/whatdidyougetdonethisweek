import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type WeekTaskComponentProps = {
  week: string;
  onClose: () => void;
};

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function WeekTaskComponent({ week, onClose }: WeekTaskComponentProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

  const handleAddTask = () => {
    const newTask: Task = { id: tasks.length + 1, text: '', completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleToggleComplete = (id: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
    );
  };

  const handleTextChange = (id: number, newText: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => task.id === id ? { ...task, text: newText } : task)
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onClose}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Week Text */}
      <ThemedText style={styles.weekText}>{week}</ThemedText>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <TouchableOpacity onPress={() => handleToggleComplete(item.id)} style={styles.radioButton}>
              <Ionicons name={item.completed ? "radio-button-on" : "radio-button-off"} size={20} color="white" />
            </TouchableOpacity>
            <TextInput
              style={[styles.taskInput, { textDecorationLine: item.completed ? 'line-through' : 'none' }]}
              value={item.text}
              placeholder="Write a task"
              onChangeText={(text) => handleTextChange(item.id, text)}
            />
          </View>
        )}
      />

      {/* Add Task Button */}
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <ThemedText>Add a new task</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16
    },
    backButton: {
      alignSelf: 'flex-start',
      padding: 16,
    },
    weekText: {
      fontSize: 24,
      textAlign: 'center',
      marginVertical: 16,
      color: 'white',
    },
    taskList: {
      flexGrow: 1,
    },
    taskRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#333',
      padding: 10,
      borderRadius: 8,
      marginBottom: 8,
    },
    radioButton: {
      padding: 8,
    },
    taskInput: {
      flex: 1,
      color: 'white',
      paddingVertical: 8,
      paddingHorizontal: 10,
    },
    infoButton: {
      padding: 8,
    },
    button: {
      padding: 16,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 55,
    },
  });