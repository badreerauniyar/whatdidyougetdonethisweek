import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import WeekTaskComponent from '../component/weeksComponent';


export default function Weeks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [weeks, setWeeks] = useState(generateWeeks());
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  function generateWeeks() {
    const weeksArray = [];
    const today = new Date();
    let currentWeekStart = new Date(today);
    currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay()); // Set to last Sunday

    while (currentWeekStart.getFullYear() === today.getFullYear()) {
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(weekEnd.getDate() + 6); // Saturday of the week

      if (currentWeekStart > today) break; // Stop generating future weeks

      weeksArray.unshift({
        key: currentWeekStart.getTime().toString(),
        week: `${currentWeekStart.toDateString()} - ${weekEnd.toDateString()}`,
        start: currentWeekStart.toDateString(),
        end: weekEnd.toDateString(),
      });

      currentWeekStart.setDate(currentWeekStart.getDate() - 7); // Move to previous Sunday
    }
    return weeksArray;
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const selectedSunday = new Date(date);
    selectedSunday.setDate(selectedSunday.getDate() - selectedSunday.getDay()); // Get nearest Sunday

    const selectedSaturday = new Date(selectedSunday);
    selectedSaturday.setDate(selectedSunday.getDate() + 6); // Get Saturday of that week

    setSelectedWeek(`${selectedSunday.toDateString()} - ${selectedSaturday.toDateString()}`);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}> 
      {selectedWeek ? (
        <WeekTaskComponent week={selectedWeek} onClose={() => setSelectedWeek(null)} />
      ) : (
        <>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search tasks"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
            <TouchableOpacity onPress={showDatePicker} style={styles.calendarButton}>
              <Ionicons name="calendar-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

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
