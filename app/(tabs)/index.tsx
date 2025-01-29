import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskComponent from '../component/task';


// HomeScreen Component
export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dates, setDates] = useState(generateDates());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  // Function to generate dates dynamically
  function generateDates(startDate: Date = new Date(), days = 7) {
    const datesArray = [];
    for (let i = 1; i <= days; i++) {
      const pastDate = new Date(startDate);
      pastDate.setDate(startDate.getDate() - i);
      datesArray.push({ key: pastDate.getTime().toString(), date: pastDate.toDateString() });
    }
    return datesArray;
  }

  // Handle date click to show TaskComponent
  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  // Close TaskComponent
  const handleCloseTaskComponent = () => {
    setSelectedDate(null);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {selectedDate ? (
        <TaskComponent date={selectedDate} onClose={handleCloseTaskComponent} />
      ) : (
        <>
          {/* Search Bar */}
          <TextInput
            placeholder="Search tasks"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />

          {/* List of Dates */}
          <FlatList
            data={dates}
            keyExtractor={(item) => item.key}
            onEndReached={() => {
              const moreDates = generateDates(new Date(dates[dates.length - 1].date), 7);
              setDates((prevDates) => [...prevDates, ...moreDates]);
            }}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleDateClick(item.date)} style={styles.dateItem}>
                <ThemedText>{item.date}</ThemedText>
              </TouchableOpacity>
            )}
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 8,
  },
  dateItem: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

