import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.badgeIcon}>
            <Ionicons name="shield" size={24} color="#c9a84c" />
          </View>
          <View>
            <Text style={styles.appName}>পুলিশপাঠ</Text>
            <Text style={styles.appSub}>বাংলাদেশ পুলিশ</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#c9a84c" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Greeting */}
        <Text style={styles.greeting}>শুভেচ্ছা!</Text>
        <Text style={styles.subGreeting}>আজ কোন আইন পড়বেন?</Text>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <Text style={styles.progressLabel}>আজকের লক্ষ্য</Text>
            <Text style={styles.progressPercent}>৬০%</Text>
          </View>
          <Text style={styles.progressTime}>১৮ <Text style={styles.progressSub}>মিনিট / ৩০ মিনিট</Text></Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>

        {/* Feature Grid */}
        <View style={styles.grid}>
          {[
            { icon: 'book', label: 'আইন পড়ুন', screen: 'LawBrowser' },
            { icon: 'trophy', label: 'MCQ অনুশীলন', screen: 'Quiz' },
            { icon: 'bookmark', label: 'বুকমার্ক', screen: 'Bookmark' },
            { icon: 'document-text', label: 'নোটস', screen: null },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.card}
              onPress={() => item.screen && navigation.navigate(item.screen)}
            >
              <View style={styles.cardIcon}>
                <Ionicons name={item.icon} size={28} color="#c9a84c" />
              </View>
              <Text style={styles.cardLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent */}
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>সম্প্রতি পড়েছেন</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LawBrowser')}>
            <Text style={styles.seeAll}>সব দেখুন</Text>
          </TouchableOpacity>
        </View>
        {[
          { icon: 'hammer', title: 'দণ্ডবিধি - ধারা ৩০২', sub: '১৮৬০ সালের দণ্ডবিধি' },
          { icon: 'shield', title: 'পুলিশ আইন - ধারা ২৯', sub: '১৮৬১ সালের পুলিশ আইন' },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={styles.recentCard}
            onPress={() => navigation.navigate('LawDetail', { law: { section: '৩০২', title: item.title, category: 'দণ্ডবিধি', summary: '', content: '', related: [] } })}>
            <View style={styles.recentIcon}>
              <Ionicons name={item.icon} size={20} color="#c9a84c" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.recentCardTitle}>{item.title}</Text>
              <Text style={styles.recentCardSub}>{item.sub}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#a8b8cc50" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a1628' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 52, borderBottomWidth: 1, borderBottomColor: '#c9a84c20' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  badgeIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#112240', borderWidth: 1, borderColor: '#c9a84c50', alignItems: 'center', justifyContent: 'center' },
  appName: { fontSize: 20, fontWeight: 'bold', color: '#c9a84c' },
  appSub: { fontSize: 10, color: '#a8b8cc70', letterSpacing: 2 },
  scroll: { padding: 20, paddingBottom: 40 },
  greeting: { fontSize: 30, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  subGreeting: { fontSize: 16, color: '#a8b8cc', marginBottom: 20 },
  progressCard: { backgroundColor: '#112240', borderWidth: 1, borderColor: '#c9a84c30', borderRadius: 16, padding: 20, marginBottom: 24 },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { color: '#a8b8cc', fontSize: 13, fontWeight: '600' },
  progressPercent: { color: '#c9a84c', fontSize: 13, fontWeight: 'bold' },
  progressTime: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 8 },
  progressSub: { fontSize: 14, fontWeight: 'normal', color: '#a8b8cc' },
  progressBar: { height: 8, backgroundColor: '#0a1628', borderRadius: 4 },
  progressFill: { width: '60%', height: 8, backgroundColor: '#c9a84c', borderRadius: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 24 },
  card: { width: '47%', backgroundColor: '#112240', borderWidth: 1, borderColor: '#c9a84c30', borderRadius: 16, padding: 24, alignItems: 'center', gap: 12 },
  cardIcon: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#c9a84c15', alignItems: 'center', justifyContent: 'center' },
  cardLabel: { fontSize: 14, fontWeight: 'bold', color: '#a8b8cc' },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  recentTitle: { fontSize: 18, fontWeight: 'bold', color: '#a8b8cc' },
  seeAll: { fontSize: 12, color: '#c9a84c' },
  recentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#112240', borderWidth: 1, borderColor: '#c9a84c15', borderRadius: 12, padding: 16, marginBottom: 12, gap: 12 },
  recentIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#0a1628', alignItems: 'center', justifyContent: 'center' },
  recentCardTitle: { fontSize: 16, fontWeight: 'bold', color: '#ffffff', marginBottom: 2 },
  recentCardSub: { fontSize: 12, color: '#a8b8cc60' },
});