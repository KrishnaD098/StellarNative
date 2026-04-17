import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<any[]>([]);

  const handleSaveNote = () => {
    if (name.trim() === '' || note.trim() === '') return;

    const newNote = {
      id: Date.now().toString(),
      name: name,
      note: note,
      rating: '⭐⭐⭐⭐⭐',
    };

    setNotes([newNote, ...notes]);
    setName('');
    setNote('');
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
          <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
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
          <View style={styles.noteCard}>
            <View style={styles.noteHeader}>
              <Text style={styles.noteName}>{item.name}</Text>
              <Text style={styles.noteRating}>{item.rating}</Text>
            </View>
            <Text style={styles.noteText}>{item.note}</Text>
          </View>
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
    fontSize: 18,
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
