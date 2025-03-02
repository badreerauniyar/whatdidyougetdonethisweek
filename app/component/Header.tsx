import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  onDatePickerPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onDatePickerPress }) => {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.iconContainer}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Search')}> */}
        <TouchableOpacity onPress={()=>router.push('/SearchScreen')}>
          <Ionicons name="search-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDatePickerPress} style={styles.icon}>
          <Ionicons name="calendar-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 16,
  },
});

export default Header;