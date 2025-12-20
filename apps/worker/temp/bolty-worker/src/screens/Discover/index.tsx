import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Card from '../../components/Card';
import { PROFILES, Profile } from '../../data/profiles';
import { useMatches } from '../../context/MatchesContext';

const Discover: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>(PROFILES);
  const { addMatch } = useMatches();

  const handleSwipeLeft = (p: Profile) => {
    setProfiles((prev) => prev.filter((x) => x.id !== p.id));
  };
  const handleSwipeRight = (p: Profile) => {
    addMatch(p);
    setProfiles((prev) => prev.filter((x) => x.id !== p.id));
  };

  const renderCards = () => {
    if (profiles.length === 0) {
      return (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No more profiles — check your matches!</Text>
        </View>
      );
    }
    return profiles
      .map((p, index) => {
        const isTop = index === 0;
        return <Card key={p.id} profile={p} onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight} isTop={isTop} />;
      })
      .reverse();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.subtitle}>Swipe right to like, left to pass</Text>
      </View>

      <View style={styles.deck}>{renderCards()}</View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#ffd3d8' }]}
          onPress={() => profiles[0] && handleSwipeLeft(profiles[0])}
        >
          <Text style={{ color: '#ff5864', fontWeight: '700' }}>NOPE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#eafef7' }]}
          onPress={() => profiles[0] && handleSwipeRight(profiles[0])}
        >
          <Text style={{ color: '#00c48c', fontWeight: '700' }}>LIKE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#222' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 6 },
  deck: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  actions: { flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 20 },
  actionBtn: {
    width: 140,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  empty: { alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#666', fontSize: 16 }
});

export default Discover;