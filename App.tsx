import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* 1. Header Area */}
      <Text style={styles.title}>StellarNote</Text>
      <Text style={styles.subtitle}>Founder's Field Journal</Text>

      {/* 2. Input Section */}
      <TextInput 
        placeholder="Investor Name" 
        style={styles.input}
      />

      <TextInput 
        placeholder="Quick Note..." 
        style={[styles.input, styles.textArea]}
        multiline={true}
        numberOfLines={4}
      />

      {/* 3. Star Rating Placeholder */}
      <View style={styles.ratingRow}>
        <Text style={styles.label}>Interest Level:</Text>
        <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
      </View>

      {/* 4. Action Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Note</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7', // Standard iOS light gray background
    alignItems: 'center',
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  input: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    // Add a slight shadow for that "Apple" look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top', // Important for Android multiline
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginRight: 12,
  },
  stars: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#007AFF', // Standard iOS Blue
    width: '90%',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
