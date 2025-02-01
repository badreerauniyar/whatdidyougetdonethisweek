import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import WeekTaskComponent from '../component/weeksComponent';


// HomeScreen Component
export default function Weeks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [weeks, setWeeks] = useState(generateWeeks());
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  // Generate all weeks from Sunday to Saturday for the current year
  function generateWeeks() {
    const weeksArray = [];
    const startDate = new Date(new Date().getFullYear(), 0, 1);
    let currentWeekStart = startDate;

    while (currentWeekStart.getFullYear() === startDate.getFullYear()) {
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(weekEnd.getDate() + 6); // Saturday of the week

      weeksArray.push({
        key: currentWeekStart.getTime().toString(),
        week: `${currentWeekStart.toDateString()} - ${weekEnd.toDateString()}`,
        start: currentWeekStart.toDateString(),
        end: weekEnd.toDateString(),
      });

      currentWeekStart = new Date(weekEnd);
      currentWeekStart.setDate(currentWeekStart.getDate() + 1); // Move to next Sunday
    }

    return weeksArray;
  }

  // Show the date picker modal
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Hide the date picker modal
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Handle week selection (find nearest Sunday)
  const handleConfirm = (date: Date) => {
    const selectedSunday = new Date(date);
    selectedSunday.setDate(selectedSunday.getDate() - selectedSunday.getDay()); // Go to the nearest Sunday

    const selectedSaturday = new Date(selectedSunday);
    selectedSaturday.setDate(selectedSunday.getDate() + 6); // Saturday of that week

    setSelectedWeek(`${selectedSunday.toDateString()} - ${selectedSaturday.toDateString()}`);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {selectedWeek ? (
        <WeekTaskComponent week={selectedWeek} onClose={() => setSelectedWeek(null)} />
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

          {/* List of Weeks */}
          <FlatList
            data={weeks}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedWeek(item.week)} style={styles.dateItem}>
                <ThemedText>{item.week}</ThemedText>
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
