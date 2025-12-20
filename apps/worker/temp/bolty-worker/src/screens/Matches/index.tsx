import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useMatches } from '../../context/MatchesContext';

const Matches: React.FC = () => {
  const { matches } = useMatches();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Matches</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.name}>
                {item.name}, {item.age}
              </Text>
              <Text style={styles.job}>{item.job}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No matches yet — swipe right to like someone!</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '800', marginTop: 18, marginLeft: 16, color: '#222' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  avatar: { width: 64, height: 64, borderRadius: 10 },
  name: { fontSize: 16, fontWeight: '700' },
  job: { color: '#ff5864', marginTop: 2 },
  empty: { color: '#666', padding: 16, textAlign: 'center' }
});

export default Matches;