import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskComponent from '../component/task';
import { Ionicons } from '@expo/vector-icons';

// HomeScreen Component
export default function Days() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dates, setDates] = useState(generateDates());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // Controls the modal visibility
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  // Function to generate past dates
  function generateDates(startDate: Date = new Date(), days = 7) {
    const datesArray = [];
    for (let i = 1; i <= days; i++) {
      const pastDate = new Date(startDate);
      pastDate.setDate(startDate.getDate() - i);
      datesArray.push({ key: pastDate.getTime().toString(), date: pastDate.toDateString() });
    }
    return datesArray;
  }

  // Show the date picker modal
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Hide the date picker modal
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Handle date selection
  const handleConfirm = (date: Date) => {
    setSelectedDate(date.toDateString()); // Set selected date
    hideDatePicker();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {selectedDate ? (
        <TaskComponent date={selectedDate} onClose={() => setSelectedDate(null)} />
      ) : (
        <>
          {/* Search Bar + Calendar Picker */}
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search tasks"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
            {/* Calendar Button */}
            <TouchableOpacity onPress={showDatePicker} style={styles.calendarButton}>
              <Ionicons name="calendar-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Date Picker Modal */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
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
              <TouchableOpacity onPress={() => setSelectedDate(item.date)} style={styles.dateItem}>
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 8,
    height: 50,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    color: 'white',
  },
  calendarButton: {
    padding: 8,
  },
  dateItem: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
