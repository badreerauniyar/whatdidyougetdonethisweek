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
    let currentWeekStart = new Date(today.getFullYear(), 0, 1); // Start from Jan 1st
    let currentWeekEnd = new Date(currentWeekStart); // Copy of start date
  
    while (currentWeekStart.getFullYear() === today.getFullYear()) {
        // Set `currentWeekEnd` to 6 days later
        currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
  
        // Ensure `currentWeekEnd` is a Saturday
        if (currentWeekEnd.getDay() !== 6) {
            const dayDiff = 1+ currentWeekEnd.getDay(); // Days needed to move to Saturday
            currentWeekEnd.setDate(currentWeekEnd.getDate() - dayDiff);
        }
  
        // Ensure `currentWeekEnd` is still within the same year
         if (currentWeekEnd.getFullYear() !== today.getFullYear()) {
             currentWeekEnd = new Date(today.getFullYear(), 11, 31); // Set to Dec 31
         }
  
        // Store week info
        if(currentWeekStart<=today){
          weeksArray.push({
            key: currentWeekStart.getTime().toString(),
            week: `${currentWeekStart.toDateString()} - ${currentWeekEnd.toDateString()}`,
            start: currentWeekStart.toDateString(),
            end: currentWeekEnd.toDateString(),
        });
        }else{
          return weeksArray
        }
  
        currentWeekStart = new Date(currentWeekEnd);
        currentWeekStart.setDate(currentWeekEnd.getDate() + 1);
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
