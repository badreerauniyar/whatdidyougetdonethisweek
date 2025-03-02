import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity,useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

type NewNoteProps = {
    onClose: () => void;
}
export default function NewNote({onClose}: NewNoteProps) {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [lastEdited, setLastEdited] = useState<Date | null>(null);

    const handleSave = () => {
        setLastEdited(new Date());
        // Save the note logic here
    };
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TextInput
                style={styles.titleInput}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.noteInput}
                placeholder="Write your note here..."
                value={note}
                onChangeText={setNote}
                multiline
            />
            {lastEdited && (
                <Text style={styles.lastEdited}>
                    Last edited: {lastEdited.toLocaleString()}
                </Text>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // backgroundColor: '#fff',
    },
    backButton: {
        alignSelf: 'flex-start',
        padding: 16,
      },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        // marginBottom: 16,
        padding:16 ,
        color: 'white'
    },
    noteInput: {
        flexGrow: 1,
        fontSize: 18,
        textAlignVertical: 'top',
        padding:16 ,
        color: 'white'

    },
    lastEdited: {
        fontSize: 14,
        color: '#888',
        marginTop: 16,
    },
});
