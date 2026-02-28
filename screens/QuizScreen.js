import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const QUESTIONS = [
  { id: 1, category: 'দণ্ডবিধি · ধারা ৩০০-৩১০', question: 'খুন করার জন্য সর্বোচ্চ শাস্তি কী?', options: ['১০ বছরের কারাদণ্ড', 'মৃত্যুদণ্ড', 'যাবজ্জীবন কারাদণ্ড', '১৪ বছরের কারাদণ্ড'], correct: 1, explanation: 'দণ্ডবিধির ৩০২ ধারা অনুযায়ী, নরহত্যার সর্বোচ্চ শাস্তি মৃত্যুদণ্ড।' },
  { id: 2, category: 'দণ্ডবিধি · ধারা ৯৬-১০৬', question: 'আত্মরক্ষার অধিকার কোন ধারায়?', options: ['ধারা ৯৪', 'ধারা ৯৫', 'ধারা ৯৬', 'ধারা ৯৭'], correct: 2, explanation: 'দণ্ডবিধির ৯৬ ধারায় আত্মরক্ষার সাধারণ অধিকার বর্ণিত।' },
  { id: 3, category: 'CrPC · ধারা ৫০-৬০', question: 'বিনা পরোয়ানায় গ্রেফতারের ক্ষমতা কোন ধারায়?', options: ['ধারা ৫২', 'ধারা ৫৩', 'ধারা ৫৪', 'ধারা ৫৫'], correct: 2, explanation: 'CrPC-এর ৫৪ ধারায় পুলিশকে বিনা পরোয়ানায় গ্রেফতারের ক্ষমতা দেওয়া হয়েছে।' },
  { id: 4, category: 'সাক্ষ্য আইন', question: 'সাক্ষ্য আইন কত সালে প্রণীত?', options: ['১৮৫০', '১৮৬০', '১৮৭২', '১৮৮০'], correct: 2, explanation: 'বাংলাদেশ সাক্ষ্য আইন ১৮৭২ সালে প্রণীত হয়।' },
  { id: 5, category: 'দণ্ডবিধি · ধারা ৩৭৯', question: 'চুরির সর্বোচ্চ শাস্তি কত বছর?', options: ['১ বছর', '৩ বছর', '৫ বছর', '৭ বছর'], correct: 1, explanation: 'দণ্ডবিধির ৩৭৯ ধারায় চুরির সর্বোচ্চ শাস্তি ৩ বছর কারাদণ্ড।' },
];

const LABELS = ['A', 'B', 'C', 'D'];

export default function QuizScreen({ navigation }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[currentQ];

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    if (selected === question.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQ + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setSubmitted(false);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const percent = Math.round((score / QUESTIONS.length) * 100);
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 32 }]}>
        <Text style={{ fontSize: 64, marginBottom: 12 }}>{percent >= 70 ? '🎉' : '📚'}</Text>
        <Text style={styles.resultHeading}>{percent >= 70 ? 'দারুণ!' : 'আরো পড়ুন!'}</Text>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreText}>{score}/{QUESTIONS.length}</Text>
          <Text style={styles.scorePercent}>{percent}%</Text>
        </View>
        <View style={styles.statRow}>
          <View style={[styles.statCard, { borderColor: '#2ecc71' }]}>
            <Text style={[styles.statNum, { color: '#2ecc71' }]}>{score}</Text>
            <Text style={styles.statLabel}>✅ সঠিক</Text>
          </View>
          <View style={[styles.statCard, { borderColor: '#e74c3c' }]}>
            <Text style={[styles.statNum, { color: '#e74c3c' }]}>{QUESTIONS.length - score}</Text>
            <Text style={styles.statLabel}>❌ ভুল</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.restartBtn} onPress={handleRestart}>
          <Text style={styles.restartBtnText}>আবার চেষ্টা করুন</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('HomeMain')}>
          <Text style={styles.homeBtnText}>হোমে ফিরুন</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MCQ অনুশীলন</Text>
        <View style={styles.headerRight}>
          <Text style={styles.progress}>{currentQ + 1}/{QUESTIONS.length}</Text>
          <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={22} color="#c9a84c" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }]} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.categoryTag}>
          <Ionicons name="book-outline" size={14} color="#c9a84c" />
          <Text style={styles.categoryTagText}>{question.category}</Text>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {question.options.map((opt, i) => {
          let optStyle = styles.option;
          let circleStyle = styles.optionCircle;
          let circleTextStyle = styles.optionCircleText;
          let icon = null;

          if (submitted) {
            if (i === question.correct) {
              optStyle = { ...styles.option, borderColor: '#c9a84c', backgroundColor: '#112240' };
              circleStyle = { ...styles.optionCircle, backgroundColor: '#c9a84c', borderColor: '#c9a84c' };
              circleTextStyle = { ...styles.optionCircleText, color: '#0a1628' };
              icon = <Ionicons name="checkmark-circle" size={22} color="#c9a84c" />;
            } else if (i === selected && i !== question.correct) {
              optStyle = { ...styles.option, borderColor: '#e74c3c', backgroundColor: '#e74c3c15' };
              circleStyle = { ...styles.optionCircle, borderColor: '#e74c3c' };
              circleTextStyle = { ...styles.optionCircleText, color: '#e74c3c' };
              icon = <Ionicons name="close-circle" size={22} color="#e74c3c" />;
            }
          } else if (i === selected) {
            optStyle = { ...styles.option, borderColor: '#c9a84c', backgroundColor: '#112240' };
            circleStyle = { ...styles.optionCircle, backgroundColor: '#c9a84c', borderColor: '#c9a84c' };
            circleTextStyle = { ...styles.optionCircleText, color: '#0a1628' };
          }

          return (
            <TouchableOpacity key={i} style={optStyle} onPress={() => !submitted && setSelected(i)} disabled={submitted}>
              <View style={circleStyle}>
                <Text style={circleTextStyle}>{LABELS[i]}</Text>
              </View>
              <Text style={styles.optionText}>{opt}</Text>
              {icon && <View style={{ marginLeft: 'auto' }}>{icon}</View>}
            </TouchableOpacity>
          );
        })}

        {submitted && (
          <View style={styles.explanation}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Ionicons name="bulb-outline" size={16} color="#c9a84c" />
              <Text style={styles.explanationLabel}>ব্যাখ্যা:</Text>
            </View>
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        {!submitted ? (
          <TouchableOpacity style={[styles.actionBtn, selected === null && { opacity: 0.5 }]} onPress={handleSubmit} disabled={selected === null}>
            <Text style={styles.actionBtnText}>উত্তর দিন</Text>
            <Ionicons name="arrow-forward" size={20} color="#0a1628" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.actionBtn} onPress={handleNext}>
            <Text style={styles.actionBtnText}>{currentQ + 1 >= QUESTIONS.length ? 'ফলাফল দেখুন' : 'পরের প্রশ্ন'}</Text>
            <Ionicons name="arrow-forward" size={20} color="#0a1628" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a1628' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#ffffff' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  progress: { fontSize: 18, fontWeight: 'bold', color: '#c9a84c' },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#11223a', borderWidth: 1, borderColor: '#ffffff15', alignItems: 'center', justifyContent: 'center' },
  progressBar: { height: 4, backgroundColor: '#11223a' },
  progressFill: { height: 4, backgroundColor: '#c9a84c', borderRadius: 2 },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 12 },
  categoryTag: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'center', paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: '#c9a84c40', backgroundColor: '#c9a84c15', marginBottom: 4 },
  categoryTagText: { fontSize: 12, fontWeight: '600', color: '#c9a84c' },
  questionCard: { backgroundColor: '#112240', borderRadius: 16, padding: 24, borderWidth: 1, borderColor: '#ffffff08', marginBottom: 8 },
  questionText: { fontSize: 20, fontWeight: 'bold', color: '#ffffff', lineHeight: 30 },
  option: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#11223a', borderRadius: 12, borderWidth: 1, borderColor: '#ffffff15', padding: 16, marginBottom: 8 },
  optionCircle: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#c9a84c80', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  optionCircleText: { fontSize: 14, fontWeight: 'bold', color: '#c9a84c' },
  optionText: { fontSize: 15, color: '#e2e8f0', fontWeight: '500', flex: 1 },
  explanation: { backgroundColor: '#11223a', borderRadius: 12, borderWidth: 1, borderColor: '#ffffff10', padding: 16, marginTop: 8 },
  explanationLabel: { fontSize: 13, fontWeight: 'bold', color: '#c9a84c' },
  explanationText: { fontSize: 13, color: '#cbd5e1', lineHeight: 20 },
  bottomBar: { padding: 16, paddingBottom: 32, backgroundColor: '#0a1628' },
  actionBtn: { backgroundColor: '#c9a84c', borderRadius: 14, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  actionBtnText: { fontSize: 17, fontWeight: 'bold', color: '#0a1628' },
  resultHeading: { fontSize: 32, fontWeight: 'bold', color: '#ffffff', marginBottom: 24 },
  scoreCircle: { width: 140, height: 140, borderRadius: 70, borderWidth: 4, borderColor: '#c9a84c', alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  scoreText: { fontSize: 32, fontWeight: 'bold', color: '#ffffff' },
  scorePercent: { fontSize: 16, color: '#c9a84c' },
  statRow: { flexDirection: 'row', gap: 16, marginBottom: 32 },
  statCard: { flex: 1, backgroundColor: '#112240', borderRadius: 12, borderWidth: 1, padding: 16, alignItems: 'center' },
  statNum: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  statLabel: { fontSize: 13, color: '#a8b8cc' },
  restartBtn: { width: '100%', backgroundColor: '#c9a84c', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginBottom: 12 },
  restartBtnText: { fontSize: 16, fontWeight: 'bold', color: '#0a1628' },
  homeBtn: { width: '100%', borderWidth: 1, borderColor: '#c9a84c40', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  homeBtnText: { fontSize: 15, color: '#c9a84c' },
});