import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

export default function App() {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(3);
  const [notes, setNotes] = useState<any[]>([]);

  // 1. LOAD notes from disk when app starts
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@stellar_notes');
        if (jsonValue !== null) {
          setNotes(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Failed to load notes', e);
      }
    };
    loadNotes();
  }, []);

  // 2. SAVE notes to disk whenever the notes list changes
  useEffect(() => {
    const saveNotes = async () => {
      try {
        const jsonValue = JSON.stringify(notes);
        await AsyncStorage.setItem('@stellar_notes', jsonValue);
      } catch (e) {
        console.error('Failed to save notes', e);
      }
    };
    
    if (notes.length > 0 || (notes.length === 0)) {
      saveNotes();
    }
  }, [notes]);

  const handleSaveNote = () => {
    if (name.trim() === '' || note.trim() === '') return;

    // Trigger Heavy Impact Haptic (more noticeable)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    const newNote = {
      id: Date.now().toString(),
      name: name,
      note: note,
      rating: '⭐'.repeat(rating),
    };

    setNotes([newNote, ...notes]);
    setName('');
    setNote('');
    setRating(3); // Reset rating to default
  };

  const deleteNote = (id: string) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to remove this investor note?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => setNotes(notes.filter(item => item.id !== id)) 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* 1. Header Area */}
      <View style={styles.header}>
        <Text style={styles.title}>StellarNote</Text>
        <Text style={styles.subtitle}>Founder's Field Journal</Text>
      </View>

      {/* 2. Input Section */}
      <View style={styles.inputSection}>
        <TextInput 
          placeholder="Investor Name" 
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput 
          placeholder="Quick Note..." 
          style={[styles.input, styles.textArea]}
          multiline={true}
          numberOfLines={4}
          value={note}
          onChangeText={setNote}
        />

        <View style={styles.ratingRow}>
          <Text style={styles.label}>Interest:</Text>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity key={num} onPress={() => setRating(num)}>
                <Text style={styles.stars}>
                  {num <= rating ? '⭐' : '☆'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSaveNote}>
          <Text style={styles.buttonText}>Save Note</Text>
        </TouchableOpacity>
      </View>

      {/* 3. Notes List */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onLongPress={() => deleteNote(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.noteCard}>
              <View style={styles.noteHeader}>
                <Text style={styles.noteName}>{item.name}</Text>
                <Text style={styles.noteRating}>{item.rating}</Text>
              </View>
              <Text style={styles.noteText}>{item.note}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  inputSection: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  input: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  stars: {
    fontSize: 24,
    marginHorizontal: 2,
  },
  starContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#007AFF',
    width: '90%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    padding: 20,
  },
  noteCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  noteRating: {
    fontSize: 14,
  },
  noteText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 20,
  },
});
