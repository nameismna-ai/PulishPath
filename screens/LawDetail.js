import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LawDetail({ navigation, route }) {
  const [fontSize, setFontSize] = useState(17);
  const [bookmarked, setBookmarked] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(true);

  const law = route?.params?.law || {
    section: '৩০২',
    title: 'নরহত্যার দণ্ড',
    category: 'দণ্ডবিধি',
    summary: 'যে ব্যক্তি নরহত্যা করে, সে মৃত্যুদণ্ডে বা যাবজ্জীবন কারাদণ্ডে দণ্ডিত হবে এবং তদুপরি অর্থদণ্ডেও দণ্ডিত হবে।',
    content: `৩০২। যে ব্যক্তি নরহত্যা করে, সে মৃত্যুদণ্ডে বা যাবজ্জীবন কারাদণ্ডে দণ্ডিত হবে এবং তদুপরি অর্থদণ্ডেও দণ্ডিত হবে।\n\nব্যাখ্যা: এই ধারার অধীনে অপরাধী সাব্যস্ত করার জন্য এটি প্রমাণ করা আবশ্যক যে, অভিযুক্ত ব্যক্তি এমন একটি কাজ করেছে যার ফলে মৃত্যু ঘটেছে।\n\nউদাহরণ: ক ইচ্ছাকৃতভাবে খ-কে আঘাত করে যার ফলে খ-এর মৃত্যু হয়। এক্ষেত্রে ক নরহত্যার অপরাধে দোষী সাব্যস্ত হবে।`,
    related: ['ধারা ৩০০', 'ধারা ৩০৪', 'ধারা ৩০৭', 'ধারা ৩০৯'],
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color="#c9a84c" />
        </TouchableOpacity>
        <View style={styles.categoryChip}>
          <Text style={styles.categoryText}>{law.category}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setBookmarked(!bookmarked)} style={styles.iconBtn}>
            <Ionicons name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={22} color="#c9a84c" />
          </TouchableOpacity>
          <View style={styles.fontControls}>
            <TouchableOpacity onPress={() => setFontSize(f => Math.max(13, f - 1))}>
              <Text style={styles.fontBtn}>A-</Text>
            </TouchableOpacity>
            <View style={styles.fontDivider} />
            <TouchableOpacity onPress={() => setFontSize(f => Math.min(24, f + 1))}>
              <Text style={styles.fontBtnLarge}>A+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionNum}>ধারা {law.section}</Text>
        <Text style={styles.sectionTitle}>{law.title}</Text>

        {/* Summary */}
        <TouchableOpacity style={styles.summaryBox} onPress={() => setSummaryOpen(!summaryOpen)}>
          <View style={styles.summaryLabel}>
            <Text style={styles.summaryLabelText}>সারসংক্ষেপ</Text>
            <Ionicons name={summaryOpen ? 'chevron-up' : 'chevron-down'} size={16} color="#c9a84c" />
          </View>
          {summaryOpen && <Text style={styles.summaryText}>{law.summary}</Text>}
        </TouchableOpacity>

        {/* Content */}
        <Text style={[styles.content, { fontSize }]}>{law.content}</Text>

        {/* Related */}
        <Text style={styles.relatedLabel}>সম্পর্কিত ধারা:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {law.related.map((item, i) => (
            <TouchableOpacity key={i} style={styles.relatedChip}>
              <Text style={styles.relatedChipText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#c9a84c" />
          <Text style={styles.navBtnText}>পূর্ববর্তী</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mcqFab} onPress={() => navigation.navigate('Quiz')}>
          <Ionicons name="help-circle" size={28} color="#0a192f" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <Text style={styles.navBtnText}>পরবর্তী</Text>
          <Ionicons name="arrow-forward" size={20} color="#c9a84c" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a192f' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#c9a84c20' },
  iconBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, backgroundColor: '#112240', borderWidth: 1, borderColor: '#c9a84c40' },
  categoryText: { color: '#c9a84c', fontSize: 13, fontWeight: '500' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  fontControls: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#112240', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: '#c9a84c30', gap: 6 },
  fontBtn: { color: '#c9a84c80', fontSize: 12, fontWeight: 'bold' },
  fontBtnLarge: { color: '#c9a84c', fontSize: 15, fontWeight: 'bold' },
  fontDivider: { width: 1, height: 12, backgroundColor: '#c9a84c30' },
  scroll: { flex: 1 },
  scrollContent: { padding: 20 },
  sectionNum: { fontSize: 36, fontWeight: 'bold', color: '#c9a84c', marginBottom: 4 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 20 },
  summaryBox: { backgroundColor: '#112240', borderWidth: 2, borderStyle: 'dashed', borderColor: '#c9a84c50', borderRadius: 12, padding: 16, marginBottom: 24 },
  summaryLabel: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  summaryLabelText: { color: '#c9a84c', fontSize: 11, fontWeight: 'bold', letterSpacing: 2 },
  summaryText: { color: '#a8b8cc', fontSize: 14, lineHeight: 22 },
  content: { color: '#a8b8cc', lineHeight: 28, marginBottom: 28 },
  relatedLabel: { color: '#c9a84c', fontSize: 12, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 },
  relatedChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#112240', borderWidth: 1, borderColor: '#c9a84c40', marginRight: 10 },
  relatedChipText: { color: '#c9a84c', fontSize: 13 },
  bottomBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0d1b2e', borderTopWidth: 1, borderTopColor: '#c9a84c20', paddingHorizontal: 24, paddingVertical: 16, paddingBottom: 32 },
  navBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  navBtnText: { color: '#c9a84c', fontSize: 14, fontWeight: '500' },
  mcqFab: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#c9a84c', alignItems: 'center', justifyContent: 'center' },
});