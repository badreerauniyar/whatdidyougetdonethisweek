import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
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
  const [isWeekPickerVisible, setWeekPickerVisibility] = useState(false);
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
  
        // Ensure `currentWeekEnd` is a Sunday
        if (currentWeekEnd.getDay() !== 0) {
            const dayDiff = 7 - currentWeekEnd.getDay(); // Days needed to move to Sunday
            currentWeekEnd.setDate(currentWeekEnd.getDate() + dayDiff);
        }
  
        // Ensure `currentWeekEnd` is still within the same year
         if (currentWeekEnd.getFullYear() !== today.getFullYear()) {
             currentWeekEnd = new Date(today.getFullYear(), 11, 31); // Set to Dec 31
         }
  
        // Store week info
        if(currentWeekStart<=today){
          weeksArray.push({
            key: currentWeekStart.getTime().toString(),
            week: `${formatDateWithDay(currentWeekStart)} - ${formatDateWithDay(currentWeekEnd)}`,
            start: formatDateWithDay(currentWeekStart),
            databaseStoreFormat:`${currentWeekStart.getTime().toString()}-${currentWeekEnd.getTime().toString()}`,
            end: formatDateWithDay(currentWeekEnd),
          });
        }else{
          return weeksArray.reverse()
        }
        
        currentWeekStart = new Date(currentWeekEnd);
        currentWeekStart.setDate(currentWeekEnd.getDate() + 1);
    }
  
    return weeksArray.reverse();
  }

  function formatDateWithDay(date: Date): string {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }
  
  const showWeekPicker = () => {
    setWeekPickerVisibility(true);
  };

  const hideWeekPicker = () => {
    setWeekPickerVisibility(false);
  };

  const handleSelectWeek = (day: any) => {
    const selectedMonday = new Date(day.dateString);
    selectedMonday.setDate(selectedMonday.getDate() - ((selectedMonday.getDay() + 6) % 7));
  
    const selectedSunday = new Date(selectedMonday);
    selectedSunday.setDate(selectedMonday.getDate() + 6);
  
    setSelectedWeek(`${formatDateWithDay(selectedMonday)} - ${formatDateWithDay(selectedSunday)}`);
    hideWeekPicker();
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
            <TouchableOpacity onPress={showWeekPicker} style={styles.calendarButton}>
              <Ionicons name="calendar-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={weeks}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedWeek(item.week)} style={styles.dateItem}>
                <ThemedText>{item.week}</ThemedText>
              </TouchableOpacity>
            )}
          />

          <Modal visible={isWeekPickerVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Calendar
                  onDayPress={handleSelectWeek}
                  markingType={'period'}
                  markedDates={{
                    ...(selectedWeek ? { [selectedWeek]: { selected: true, marked: true, selectedColor: 'blue' } } : {}),
                  }}
                  firstDay={1} // Start the week on Monday
                />
                <TouchableOpacity onPress={hideWeekPicker} style={styles.closeButton}>
                  <ThemedText>Close</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  closeButton: {
    marginTop: 16,
    alignItems: 'center',
  },
});