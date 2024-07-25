import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../utils/hooks/supabase';
import { useAuthentication } from '../utils/hooks/useAuthentication';

export default function SettingsScreen() {
  const { user } = useAuthentication();
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('01/01/1998'); // Default random date
  const [initialDisplayName, setInitialDisplayName] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  const [editingDisplayName, setEditingDisplayName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingDateOfBirth, setEditingDateOfBirth] = useState(false);

  useEffect(() => {
    if (user !== null) {
      setLoading(false);
      setDisplayName(user.email.split('@')[0]); // Initialize display name
      setEmail(user.email); // Initialize email
      setInitialDisplayName(user.email.split('@')[0]); // Store initial display name
      setInitialEmail(user.email); // Store initial email
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error.message);
      } else {
        // Handle successful sign out (e.g., redirect to login screen)
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const saveDisplayName = async () => {
    // Placeholder for saving display name to backend (Supabase or other)
    setEditingDisplayName(false); // Exit editing mode
    setInitialDisplayName(displayName); // Update initial value
  };

  const saveEmail = async () => {
    // Placeholder for saving email to backend (Supabase or other)
    setEditingEmail(false); // Exit editing mode
    setInitialEmail(email); // Update initial value
  };

  const saveDateOfBirth = async () => {
    // Placeholder for saving date of birth to backend (Supabase or other)
    setEditingDateOfBirth(false); // Exit editing mode
  };

  const cancelEditDisplayName = () => {
    // Cancel editing display name and revert to initial value
    setDisplayName(initialDisplayName);
    setEditingDisplayName(false);
  };

  const cancelEditEmail = () => {
    // Cancel editing email and revert to initial value
    setEmail(initialEmail);
    setEditingEmail(false);
  };

  const cancelEditDateOfBirth = () => {
    // Cancel editing date of birth and revert to initial value
    setDateOfBirth('01/01/1998');
    setEditingDateOfBirth(false);
  };

  if (!loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Account Settings</Text>

        {/* Display Name */}
        <View style={styles.settingBar}>
          <Text>Display Name</Text>
          {editingDisplayName ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="Enter your display name"
              />
              <View style={styles.buttonContainer}>
                <Button onPress={saveDisplayName} title="Save" />
                <Button onPress={cancelEditDisplayName} title="Cancel" />
              </View>
            </View>
          ) : (
            <Text style={styles.databaseData}>{displayName}</Text>
          )}
          {!editingDisplayName && (
            <Button onPress={() => setEditingDisplayName(true)} title="Edit" />
          )}
        </View>

        {/* Email */}
        <View style={styles.settingBar}>
          <Text>Email</Text>
          {editingEmail ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
              />
              <View style={styles.buttonContainer}>
                <Button onPress={saveEmail} title="Save" />
                <Button onPress={cancelEditEmail} title="Cancel" />
              </View>
            </View>
          ) : (
            <Text style={styles.databaseData}>{email}</Text>
          )}
          {!editingEmail && (
            <Button onPress={() => setEditingEmail(true)} title="Edit" />
          )}
        </View>

        {/* Date of Birth */}
        <View style={styles.settingBar}>
          <Text>Date of Birth</Text>
          {editingDateOfBirth ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                placeholder="MM/DD/YYYY"
              />
              <View style={styles.buttonContainer}>
                <Button onPress={saveDateOfBirth} title="Save" />
                <Button onPress={cancelEditDateOfBirth} title="Cancel" />
              </View>
            </View>
          ) : (
            <Text style={styles.databaseData}>{dateOfBirth}</Text>
          )}
          {!editingDateOfBirth && (
            <Button onPress={() => setEditingDateOfBirth(true)} title="Edit" />
          )}
        </View>

        {/* Log Out Button */}
        <Button onPress={handleSignOut} title="Log Out" style={styles.button} />
      </View>
    );
  } else {
    return <Text>Loading...</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 15,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  settingBar: {
    marginTop: 10,
  },
  databaseData: {
    color: 'grey',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
