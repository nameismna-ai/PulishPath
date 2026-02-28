import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ALL_LAWS = [
  { id: 1, title: 'দণ্ডবিধি ১৮৬০', sections: '৫১১ টি ধারা', progress: 45 },
  { id: 2, title: 'ফৌজদারি কার্যবিধি', sections: '৫৬৫ টি ধারা', progress: 20 },
  { id: 3, title: 'সাক্ষ্য আইন', sections: '১৬৭ টি ধারা', progress: 0 },
  { id: 4, title: 'পুলিশ রেগুলেশন বেঙ্গল (PRB)', sections: '১২৯০ টি প্রবিধান', progress: 75 },
  { id: 5, title: 'বিশেষ ক্ষমতা আইন ১৯৭৪', sections: '৩৪ টি ধারা', progress: 0 },
  { id: 6, title: 'পুলিশ আইন ১৮৬১', sections: '৪৬ টি ধারা', progress: 10 },
  { id: 7, title: 'মাদকদ্রব্য নিয়ন্ত্রণ আইন ১৯৯০', sections: '৪৫ টি ধারা', progress: 0 },
  { id: 8, title: 'অস্ত্র আইন ১৮৭৮', sections: '৩৫ টি ধারা', progress: 0 },
  { id: 9, title: 'নারী ও শিশু নির্যাতন দমন আইন ২০০০', sections: '৩৪ টি ধারা', progress: 5 },
  { id: 10, title: 'তথ্য ও যোগাযোগ প্রযুক্তি আইন ২০০৬', sections: '৯৪ টি ধারা', progress: 0 },
  { id: 11, title: 'দুর্নীতি দমন কমিশন আইন ২০০৪', sections: '৩৩ টি ধারা', progress: 0 },
  { id: 12, title: 'ডিজিটাল নিরাপত্তা আইন ২০১৮', sections: '৬৩ টি ধারা', progress: 0 },
  { id: 13, title: 'মানব পাচার প্রতিরোধ আইন ২০১২', sections: '৪৩ টি ধারা', progress: 0 },
  { id: 14, title: 'যৌতুক নিরোধ আইন ২০১৮', sections: '১৩ টি ধারা', progress: 0 },
  { id: 15, title: 'সন্ত্রাসবিরোধী আইন ২০০৯', sections: '৪৩ টি ধারা', progress: 0 },
  { id: 16, title: 'মানি লন্ডারিং প্রতিরোধ আইন ২০১২', sections: '৪৭ টি ধারা', progress: 0 },
];

const TABS = ['সব', 'দণ্ডবিধি', 'ফৌজদারি', 'সাক্ষ্য আইন', 'PRB', 'অন্যান্য'];

export default function LawBrowser({ navigation }) {
  const [activeTab, setActiveTab] = useState('সব');

  const filtered = ALL_LAWS.filter(law => {
    if (activeTab === 'সব') return true;
    if (activeTab === 'দণ্ডবিধি') return law.title.includes('দণ্ডবিধি');
    if (activeTab === 'ফৌজদারি') return law.title.includes('ফৌজদারি');
    if (activeTab === 'সাক্ষ্য আইন') return law.title.includes('সাক্ষ্য');
    if (activeTab === 'PRB') return law.title.includes('PRB');
    if (activeTab === 'অন্যান্য') return !law.title.includes('দণ্ডবিধি') && !law.title.includes('ফৌজদারি') && !law.title.includes('সাক্ষ্য') && !law.title.includes('PRB');
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color="#c9a84c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>আইনসমূহ</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.iconBtn}>
          <Ionicons name="search" size={22} color="#c9a84c" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll} contentContainerStyle={styles.tabContainer}>
        {TABS.map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && styles.tabActive]}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.list} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {filtered.map(law => (
          <TouchableOpacity key={law.id} style={styles.lawCard}
            onPress={() => navigation.navigate('LawDetail', {
              law: { section: '১', title: law.title, category: law.title, summary: '', content: law.title + ' সম্পর্কিত বিস্তারিত তথ্য এখানে থাকবে।', related: [] }
            })}>
            <View style={styles.ringContainer}>
              <Text style={styles.ringText}>{law.progress}%</Text>
              <View style={[styles.ringOuter, { borderColor: law.progress > 0 ? '#c9a84c' : '#233554' }]} />
            </View>
            <View style={styles.lawInfo}>
              <Text style={styles.lawTitle}>{law.title}</Text>
              <Text style={styles.lawSections}>{law.sections}</Text>
            </View>
            <View style={styles.lawActions}>
              <Ionicons name="bookmark-outline" size={20} color="#c9a84c" />
              <Ionicons name="chevron-forward" size={20} color="#c9a84c70" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a1628' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 52, paddingBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#c9a84c' },
  iconBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  tabScroll: { maxHeight: 56 },
  tabContainer: { paddingHorizontal: 16, gap: 10, alignItems: 'center' },
  tab: { paddingHorizontal: 20, height: 36, borderRadius: 18, borderWidth: 1, borderColor: '#c9a84c50', backgroundColor: '#0a1628', justifyContent: 'center' },
  tabActive: { backgroundColor: '#c9a84c', borderColor: '#c9a84c' },
  tabText: { fontSize: 13, fontWeight: '500', color: '#c9a84c' },
  tabTextActive: { color: '#0a1628', fontWeight: 'bold' },
  list: { flex: 1 },
  lawCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#112240', borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#c9a84c80', padding: 16, marginBottom: 12, gap: 12 },
  ringContainer: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  ringOuter: { position: 'absolute', width: 48, height: 48, borderRadius: 24, borderWidth: 3 },
  ringText: { fontSize: 10, fontWeight: 'bold', color: '#c9a84c', zIndex: 1 },
  lawInfo: { flex: 1 },
  lawTitle: { fontSize: 15, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  lawSections: { fontSize: 12, color: '#8892b0' },
  lawActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});