import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialNotes, sampleSchedule } from '../data/initialNotes';
import { hindiNarrations } from '../data/hindiNarrations';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  // Load notes from localStorage or fallback
  const [notes, setNotes] = useState(() => {
    try {
      const stored = localStorage.getItem('shiv_notes_hub_data');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse notes from storage', e);
    }
    return initialNotes;
  });

  // Saved note IDs
  const [savedNoteIds, setSavedNoteIds] = useState(() => {
    try {
      const stored = localStorage.getItem('shiv_saved_notes');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return ['bca-315', 'bca-302'];
  });

  // Current active note and active topic
  const [activeNoteId, setActiveNoteId] = useState('bca-315');
  const [activeTopicId, setActiveTopicId] = useState('bca315-1.2');

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatusTab, setSelectedStatusTab] = useState('All Courses'); // 'All Courses', 'Completed', 'Incomplete', 'Saved'

  // Narration language: 'hi' (Hindi) or 'en' (English)
  const [narrationLang, setNarrationLang] = useState(() => {
    return localStorage.getItem('shiv_narration_lang') || 'hi';
  });

  // Audio / Speech Reader state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1); // 1, 1.25, 1.5, 2
  const [audioProgress, setAudioProgress] = useState(44);

  // Schedule list
  const [schedule, setSchedule] = useState(() => {
    try {
      const stored = localStorage.getItem('shiv_notes_schedule');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return sampleSchedule;
  });

  // Selected schedule date in the weekly bar
  const [selectedDayIndex, setSelectedDayIndex] = useState(3); // Wednesday (Wed 3/6)

  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSolverOpen, setIsSolverOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('shiv_notes_hub_data', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('shiv_saved_notes', JSON.stringify(savedNoteIds));
  }, [savedNoteIds]);

  useEffect(() => {
    localStorage.setItem('shiv_notes_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('shiv_narration_lang', narrationLang);
  }, [narrationLang]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const toggleSaveNote = (id, e) => {
    if (e) e.stopPropagation();
    setSavedNoteIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'Removed from Saved Notes' : 'Saved to My Notes Collection ⭐');
      return next;
    });
  };

  const isSaved = (id) => savedNoteIds.includes(id);

  const toggleScheduleComplete = (itemId) => {
    setSchedule((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const updated = !item.completed;
          showToast(updated ? `Completed: ${item.title}` : `Marked incomplete: ${item.title}`);
          return {
            ...item,
            completed: updated,
            progress: updated ? 100 : Math.max(10, item.progress - 40)
          };
        }
        return item;
      })
    );
  };

  const addNewNote = (newNoteData) => {
    const id = 'note-' + Date.now();
    const created = {
      id,
      code: newNoteData.code || 'BCA 399',
      title: newNoteData.title,
      subtitle: newNoteData.subtitle || 'Shared by Student Community',
      category: newNoteData.category || 'General',
      semester: newNoteData.semester || 'Semester III',
      author: {
        name: newNoteData.authorName || 'Student Peer',
        role: 'Verified Community Scholar',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        rating: 5.0,
        reviews: 1
      },
      duration: newNoteData.duration || '12 min',
      totalLessons: 1,
      progress: 0,
      status: 'Active',
      tags: newNoteData.tags ? newNoteData.tags.split(',').map((t) => t.trim()) : ['Study Note', 'Shiv.org'],
      colorGradient: 'from-fuchsia-600/30 via-pink-500/20 to-purple-800/30',
      coverImage: newNoteData.coverImage || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
      description: newNoteData.description || 'Community shared notes.',
      quickSummary: newNoteData.quickSummary || newNoteData.description?.slice(0, 100),
      units: [
        {
          unitId: 'unit-uploaded-1',
          title: 'Unit 1: Overview & Discussion',
          duration: newNoteData.duration || '15 min',
          lessonsCount: 1,
          topics: [
            {
              id: id + '-topic-1',
              title: newNoteData.title,
              duration: '15 min',
              readTime: '6 min read',
              summary: newNoteData.description?.slice(0, 150) || 'Comprehensive shared note.',
              content: newNoteData.content || `### ${newNoteData.title}\n\n${newNoteData.description || 'No content provided yet.'}`
            }
          ]
        }
      ]
    };

    setNotes((prev) => [created, ...prev]);
    setActiveNoteId(id);
    setActiveTopicId(id + '-topic-1');
    showToast('Note published successfully to Shiv.org Notes Hub! 🚀');
  };

  // Find active note object
  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];
  
  // Find active topic object
  let activeTopic = null;
  if (activeNote && activeNote.units) {
    for (const u of activeNote.units) {
      const found = u.topics?.find((t) => t.id === activeTopicId);
      if (found) {
        activeTopic = found;
        break;
      }
    }
    if (!activeTopic && activeNote.units[0]?.topics?.[0]) {
      activeTopic = activeNote.units[0].topics[0];
    }
  }

  // Get Hindi explanation for active or provided topic
  const getHindiTopicData = (topicId) => {
    const id = topicId || activeTopic?.id;
    return hindiNarrations[id] || {
      titleHindi: activeTopic?.title || 'अध्ययन नोट्स',
      audioText: `नमस्ते, यह शिव डॉट ओआरजी का अध्ययन सारांश है। ${activeTopic?.title || ''}. ${activeTopic?.summary || activeNote?.description || ''}`,
      summaryHindi: activeTopic?.summary || 'विस्तृत अध्ययन नोट्स शिव.org पर उपलब्ध हैं।'
    };
  };

  // TTS audio playback supporting Hindi & English
  const togglePlayAudio = (specificTopic, forceLang) => {
    if (!('speechSynthesis' in window)) {
      showToast('Speech audio simulation active.');
      setIsPlayingAudio(!isPlayingAudio);
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      showToast('Study narration paused.');
      return;
    }

    window.speechSynthesis.cancel();

    const targetTopic = specificTopic || activeTopic;
    const targetLang = forceLang || narrationLang;

    let textToSpeak = '';
    if (targetLang === 'hi') {
      const hiData = getHindiTopicData(targetTopic?.id);
      textToSpeak = hiData.audioText;
    } else {
      const enText = targetTopic?.summary || targetTopic?.content || activeNote?.description || 'Study notes by Shiv.org';
      textToSpeak = enText.replace(/[#*`_$\-\[\]()|]/g, ' ').replace(/\s+/g, ' ').slice(0, 500);
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = audioSpeed;

    // Configure language and voice
    if (targetLang === 'hi') {
      utterance.lang = 'hi-IN';
      // Find Hindi voice if available in browser
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN') || v.name.toLowerCase().includes('hindi') || v.name.toLowerCase().includes('india'));
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }
    } else {
      utterance.lang = 'en-US';
    }

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    showToast(targetLang === 'hi' ? 'हिंदी ऑडियो नोट्स शुरू (Shiv.org Voice)' : 'English narration active (Shiv.org Voice)');
  };

  const cycleAudioSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(audioSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setAudioSpeed(nextSpeed);
    showToast(`Playback speed: ${nextSpeed}x`);
  };

  const toggleLanguage = () => {
    const next = narrationLang === 'hi' ? 'en' : 'hi';
    setNarrationLang(next);
    showToast(next === 'hi' ? 'भाषा: हिंदी (Hindi Narration Active 🇮🇳)' : 'Language: English 🇬🇧');
    // If currently playing, restart in new language
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setTimeout(() => togglePlayAudio(activeTopic, next), 200);
    }
  };

  // Filter notes based on category, search, and status
  const filteredNotes = notes.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCategory =
      selectedCategory === 'All' ||
      n.category.toLowerCase() === selectedCategory.toLowerCase();

    let matchStatus = true;
    if (selectedStatusTab === 'Completed') {
      matchStatus = n.status === 'Completed' || n.progress >= 80;
    } else if (selectedStatusTab === 'Incomplete') {
      matchStatus = n.status === 'Incomplete' || (n.progress < 80 && n.progress > 0);
    } else if (selectedStatusTab === 'Saved') {
      matchStatus = savedNoteIds.includes(n.id);
    }

    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <NotesContext.Provider
      value={{
        notes,
        savedNoteIds,
        activeNote,
        activeNoteId,
        setActiveNoteId,
        activeTopic,
        activeTopicId,
        setActiveTopicId,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedStatusTab,
        setSelectedStatusTab,
        narrationLang,
        setNarrationLang,
        toggleLanguage,
        getHindiTopicData,
        isPlayingAudio,
        audioSpeed,
        audioProgress,
        setAudioProgress,
        schedule,
        selectedDayIndex,
        setSelectedDayIndex,
        isUploadOpen,
        setIsUploadOpen,
        isSolverOpen,
        setIsSolverOpen,
        toastMessage,
        showToast,
        toggleSaveNote,
        isSaved,
        toggleScheduleComplete,
        addNewNote,
        togglePlayAudio,
        cycleAudioSpeed,
        filteredNotes
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
