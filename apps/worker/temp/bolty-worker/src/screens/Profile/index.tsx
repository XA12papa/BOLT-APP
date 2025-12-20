import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1545996124-8ba5b6d1d4b0?w=800&q=80' }}
          style={styles.avatar}
        />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.name}>You</Text>
          <Text style={styles.subtitle}>Seen by others</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <Text style={styles.sectionText}>Demo settings for the clone.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About this clone</Text>
        <Text style={styles.sectionText}>A lightweight Tinder-style clone built with Expo & React Native.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 18 },
  avatar: { width: 96, height: 96, borderRadius: 12 },
  name: { fontSize: 22, fontWeight: '800' },
  subtitle: { color: '#666', marginTop: 6 },
  section: { marginTop: 24 },
  sectionTitle: { fontWeight: '700', fontSize: 16, color: '#222' },
  sectionText: { color: '#666', marginTop: 6 }
});

export default Profile;