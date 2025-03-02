import React from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.viewContainer}>
        <TouchableOpacity >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
        />
      </ThemedView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer:{
    // flex: 1,
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    flexGrow:1,
    paddingLeft: 8,
    marginLeft: 8,
  },
});