import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BOOKMARKS = [
  { id: 1, section: '৩০২', title: 'নরহত্যার দণ্ড', law: 'দণ্ডবিধি ১৮৬০', date: '২ দিন আগে' },
  { id: 2, section: '৩২৪', title: 'স্বেচ্ছাকৃতভাবে জখম করা', law: 'দণ্ডবিধি ১৮৬০', date: '৫ দিন আগে' },
  { id: 3, section: '৫৪', title: 'গ্রেফতার প্রক্রিয়া', law: 'ফৌজদারি কার্যবিধি', date: '১ সপ্তাহ আগে' },
];

const HIGHLIGHTS = [
  { id: 1, text: '"যাবজ্জীবন কারাদণ্ডে দণ্ডিত কোনো ব্যক্তি যদি নরহত্যা করে, তবে সে মৃত্যুদণ্ডে দণ্ডিত হবে।"', source: 'দণ্ডবিধি - ধারা ৩০৩' },
  { id: 2, text: '"প্রত্যেক ব্যক্তির নিজের শরীর রক্ষার জন্য আত্মরক্ষার অধিকার রয়েছে।"', source: 'দণ্ডবিধি - ধারা ৯৬' },
];

export default function BookmarkScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('bookmark');
  const [bookmarks, setBookmarks] = useState(BOOKMARKS);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>সংরক্ষিত</Text>
        <TouchableOpacity style={styles.sortBtn}>
          <Ionicons name="swap-vertical" size={22} color="#c9a84c" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('bookmark')}>
          <Text style={[styles.tabText, activeTab === 'bookmark' && styles.tabTextActive]}>বুকমার্ক</Text>
          {activeTab === 'bookmark' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('highlight')}>
          <Text style={[styles.tabText, activeTab === 'highlight' && styles.tabTextActive]}>হাইলাইট</Text>
          {activeTab === 'highlight' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'bookmark' && (
          <>
            {bookmarks.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🔖</Text>
                <Text style={styles.emptyTitle}>এখনও কিছু বুকমার্ক করেননি</Text>
                <Text style={styles.emptyHint}>আইন পড়ার সময় bookmark icon চাপুন</Text>
              </View>
            ) : (
              bookmarks.map(item => (
                <View key={item.id} style={styles.bookmarkCard}>
                  <View style={styles.bookmarkLeft}>
                    <Ionicons name="bookmark" size={22} color="#c9a84c" />
                    <View style={styles.sectionBadge}>
                      <Text style={styles.sectionBadgeText}>{item.section}</Text>
                    </View>
                  </View>
                  <View style={styles.bookmarkInfo}>
                    <Text style={styles.bookmarkTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.bookmarkMeta}>{item.law} • {item.date}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setBookmarks(bookmarks.filter(b => b.id !== item.id))}>
                    <Ionicons name="trash-outline" size={18} color="#e74c3c" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </>
        )}

        {activeTab === 'highlight' && (
          <>
            {HIGHLIGHTS.map(item => (
              <View key={item.id} style={styles.highlightCard}>
                <View style={styles.highlightBar} />
                <View style={styles.highlightContent}>
                  <Text style={styles.highlightText}>{item.text}</Text>
                  <View style={styles.highlightSource}>
                    <Ionicons name="quote" size={14} color="#94a3b8" />
                    <Text style={styles.highlightSourceText}>{item.source}</Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a1628' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 52, paddingBottom: 12 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#c9a84c' },
  sortBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#11223a', alignItems: 'center', justifyContent: 'center' },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ffffff10', marginHorizontal: 20 },
  tab: { flex: 1, paddingBottom: 12, alignItems: 'center', position: 'relative' },
  tabText: { fontSize: 15, fontWeight: '500', color: '#94a3b8' },
  tabTextActive: { color: '#c9a84c', fontWeight: 'bold' },
  tabIndicator: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, backgroundColor: '#c9a84c', borderRadius: 2 },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  bookmarkCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#112240', borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#c9a84c', padding: 16, marginBottom: 12, gap: 12 },
  bookmarkLeft: { alignItems: 'center', gap: 6 },
  sectionBadge: { backgroundColor: '#c9a84c15', borderWidth: 1, borderColor: '#c9a84c30', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
  sectionBadgeText: { color: '#c9a84c', fontSize: 10, fontWeight: 'bold' },
  bookmarkInfo: { flex: 1 },
  bookmarkTitle: { fontSize: 16, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  bookmarkMeta: { fontSize: 12, color: '#94a3b8' },
  highlightCard: { flexDirection: 'row', backgroundColor: '#11223a', borderRadius: 12, borderWidth: 1, borderColor: '#ffffff08', padding: 16, marginBottom: 12 },
  highlightBar: { width: 3, backgroundColor: '#c9a84c', borderRadius: 2, marginRight: 14 },
  highlightContent: { flex: 1 },
  highlightText: { fontSize: 14, color: '#ffffffee', fontStyle: 'italic', lineHeight: 22, marginBottom: 10 },
  highlightSource: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  highlightSourceText: { fontSize: 12, color: '#94a3b8' },
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 16, fontWeight: 'bold', color: '#e2e8f0', marginBottom: 8 },
  emptyHint: { fontSize: 13, color: '#64748b', textAlign: 'center' },
});
