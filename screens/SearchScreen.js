import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RECENT = ['ধারা ৩০২', 'জামিন', 'চুরির শাস্তি'];
const POPULAR = ['ধারা ৩০২', 'জামিন', 'আত্মরক্ষা', 'গ্রেফতার', 'নারী ও শিশু'];
const FILTERS = ['সব', 'দণ্ডবিধি', 'CrPC', 'সাক্ষ্য আইন', 'বিশেষ ক্ষমতা'];

const RESULTS = [
  { section: '৩০২', title: 'নরহত্যার দণ্ড', category: 'দণ্ডবিধি', preview: 'যে ব্যক্তি নরহত্যা করে সেই ব্যক্তি মৃত্যুদণ্ডে বা যাবজ্জীবন কারাদণ্ডে দণ্ডিত হইবে...' },
  { section: '২৯৯', title: 'অপরাধমূলক নরহত্যা', category: 'দণ্ডবিধি', preview: 'যে ব্যক্তি মৃত্যু ঘটাইবার উদ্দেশ্যে কিংবা মৃত্যু ঘটিতে পারে এমন দৈহিক জখম করিবার উদ্দেশ্যে...' },
  { section: '৫৪', title: 'বিনা পরোয়ানায় গ্রেফতার', category: 'CrPC', preview: 'কোন পুলিশ অফিসার ম্যাজিস্ট্রেটের আদেশ ছাড়াই গ্রেফতার করতে পারেন...' },
  { section: '৯৬', title: 'আত্মরক্ষার অধিকার', category: 'দণ্ডবিধি', preview: 'প্রত্যেক ব্যক্তির নিজের দেহ রক্ষার জন্য আত্মরক্ষার অধিকার রয়েছে...' },
  { section: '৪৩৬', title: 'জামিনযোগ্য অপরাধে জামিন', category: 'CrPC', preview: 'জামিনযোগ্য অপরাধে অভিযুক্ত ব্যক্তি জামিন পাওয়ার অধিকারী...' },
];

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('সব');
  const [recentSearches, setRecentSearches] = useState(RECENT);

  const filteredResults = RESULTS.filter(r => {
    const matchQuery = query === '' || r.title.includes(query) || r.section.includes(query);
    const matchFilter = activeFilter === 'সব' || r.category === activeFilter;
    return matchQuery && matchFilter;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={26} color="#c9a84c" />
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#94a3b8" style={{ marginRight: 8 }} />
          <TextInput
            autoFocus
            value={query}
            onChangeText={setQuery}
            placeholder="আইন বা ধারা খুঁজুন..."
            placeholderTextColor="#94a3b880"
            style={styles.searchInput}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>বাতিল</Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContainer}>
        {FILTERS.map(f => (
          <TouchableOpacity key={f} onPress={() => setActiveFilter(f)} style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}>
            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>

        {/* Recent Searches */}
        {query === '' && recentSearches.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>সাম্প্রতিক অনুসন্ধান</Text>
              <TouchableOpacity onPress={() => setRecentSearches([])}>
                <Text style={styles.clearText}>মুছুন</Text>
              </TouchableOpacity>
            </View>
            {recentSearches.map((item, i) => (
              <TouchableOpacity key={i} style={styles.recentItem} onPress={() => setQuery(item)}>
                <View style={styles.recentLeft}>
                  <Ionicons name="time-outline" size={20} color="#94a3b8" />
                  <Text style={styles.recentText}>{item}</Text>
                </View>
                <TouchableOpacity onPress={() => setRecentSearches(recentSearches.filter((_, j) => j !== i))}>
                  <Ionicons name="close" size={18} color="#64748b" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Popular Tags */}
        {query === '' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="trending-up" size={18} color="#c9a84c" />
              <Text style={styles.sectionTitle}>জনপ্রিয়:</Text>
            </View>
            <View style={styles.tagsWrap}>
              {POPULAR.map((tag, i) => (
                <TouchableOpacity key={i} style={styles.tag} onPress={() => setQuery(tag)}>
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Results */}
        {query.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ফলাফল ({filteredResults.length})</Text>
            {filteredResults.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={styles.emptyText}>কোনো ফলাফল পাওয়া যায়নি</Text>
              </View>
            ) : (
              filteredResults.map((item, i) => (
                <TouchableOpacity key={i} style={styles.resultCard}
                  onPress={() => navigation.navigate('LawDetail', { law: { section: item.section, title: item.title, category: item.category, summary: item.preview, content: item.preview, related: [] } })}>
                  <View style={styles.resultTop}>
                    <View style={styles.resultLeft}>
                      <View style={styles.sectionBadge}>
                        <Text style={styles.sectionBadgeText}>{item.section}</Text>
                      </View>
                      <View>
                        <Text style={styles.resultTitle}>{item.title}</Text>
                        <View style={styles.categoryBadge}>
                          <Text style={styles.categoryBadgeText}>{item.category}</Text>
                        </View>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#64748b" />
                  </View>
                  <Text style={styles.resultPreview} numberOfLines={2}>{item.preview}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a1628' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#c9a84c15' },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#11223a', borderWidth: 1, borderColor: '#c9a84c', borderRadius: 24, paddingHorizontal: 14, height: 46 },
  searchInput: { flex: 1, color: '#ffffff', fontSize: 15 },
  cancelText: { color: '#c9a84c', fontSize: 14, fontWeight: '500' },
  filterScroll: { maxHeight: 52 },
  filterContainer: { paddingHorizontal: 16, paddingVertical: 8, gap: 10 },
  filterChip: { paddingHorizontal: 18, height: 34, borderRadius: 17, borderWidth: 1, borderColor: '#c9a84c40', backgroundColor: '#11223a', justifyContent: 'center' },
  filterChipActive: { backgroundColor: '#c9a84c', borderColor: '#c9a84c' },
  filterText: { fontSize: 13, color: '#cbd5e1' },
  filterTextActive: { color: '#0a1628', fontWeight: 'bold' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  section: { marginBottom: 28 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 6 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#94a3b8', letterSpacing: 2, textTransform: 'uppercase' },
  clearText: { fontSize: 12, color: '#c9a84c' },
  recentItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#11223a', borderRadius: 10, padding: 12, marginBottom: 8 },
  recentLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  recentText: { fontSize: 15, color: '#e2e8f0' },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tag: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: '#c9a84c40' },
  tagText: { fontSize: 13, color: '#cbd5e1' },
  resultCard: { backgroundColor: '#11223a', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#ffffff08' },
  resultTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 },
  resultLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  sectionBadge: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#c9a84c', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  sectionBadgeText: { color: '#0a1628', fontWeight: 'bold', fontSize: 12 },
  resultTitle: { fontSize: 16, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  categoryBadge: { backgroundColor: '#c9a84c15', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  categoryBadgeText: { color: '#c9a84c', fontSize: 11 },
  resultPreview: { fontSize: 13, color: '#94a3b8', lineHeight: 20, paddingLeft: 56 },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 16, color: '#e2e8f0', fontWeight: 'bold' },
});