'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, BookOpen, Headphones, PenTool, Video, Globe, Mic } from 'lucide-react'

type ResourceCategory = {
  label: string
  icon: typeof BookOpen
  links: { title: string; url: string }[]
}

type LevelEntry = {
  name: string
  code: string
  color: string
  desc: string
  categories: ResourceCategory[]
}

const levelData: Record<string, LevelEntry> = {
  beginner: {
    name: 'Beginner', code: 'A1', color: '#4ade80',
    desc: 'Commencez votre voyage en anglais avec des exercices simples et progressifs.',
    categories: [
      {
        label: 'Anglais général',
        icon: Globe,
        links: [
          { title: 'BBC Real Easy English', url: 'https://www.bbc.co.uk/learningenglish/english/features/real-easy-english' },
        ],
      },
      {
        label: 'Grammaire',
        icon: BookOpen,
        links: [
          { title: 'ESL Gold – Low Beginner Grammar', url: 'https://eslgold.com/improve-grammar/resources-by-level/low-beginner/' },
          { title: 'ESL Lounge – Level 1a', url: 'http://www.esl-lounge.com/level1a.php' },
          { title: 'GrammarBank – Beginner Lessons', url: 'https://www.grammarbank.com/beginners-esl-lessons.html' },
          { title: 'ESL Games World', url: 'http://eslgamesworld.com/members/games/levels/easy/index.html' },
          { title: 'British Council – Basic Grammar', url: 'https://learnenglish.britishcouncil.org/basic-grammar' },
          { title: 'Oxford Practice Grammar – Basic', url: 'https://elt.oup.com/student/practicegrammar/basic/?cc=global&selLanguage=en' },
        ],
      },
      {
        label: 'Vocabulaire',
        icon: PenTool,
        links: [
          { title: 'ESL Lounge – Vocabulary A1', url: 'http://www.esl-lounge.com/level1avocab.php' },
          { title: 'GrammarBank – Vocabulary', url: 'https://www.grammarbank.com/english-vocabulary-exercises.html' },
          { title: 'British Council – Basic Vocabulary', url: 'https://learnenglish.britishcouncil.org/basic-vocabulary' },
          { title: 'Learning Chocolate', url: 'http://www.learningchocolate.com/' },
          { title: 'Language Guide', url: 'http://www.languageguide.org/english/' },
          { title: 'A4ESL Vocabulary', url: 'http://a4esl.org/a/v.html' },
        ],
      },
      {
        label: 'Écoute',
        icon: Headphones,
        links: [
          { title: 'British Council – Listening A1', url: 'https://learnenglish.britishcouncil.org/skills/listening/beginner-a1' },
          { title: 'Daily Dictation', url: 'https://dailydictation.com/exercises' },
          { title: 'Speechling Dictation', url: 'https://speechling.com/dictation/englishb' },
        ],
      },
      {
        label: 'Expression orale',
        icon: Mic,
        links: [
          { title: 'British Council – Speaking A1', url: 'https://learnenglish.britishcouncil.org/skills/speaking/beginner-a1' },
          { title: 'ESL Gold – Speaking', url: 'http://www.eslgold.com/speaking/low_beginning' },
          { title: 'Daily ESL', url: 'http://www.dailyesl.com/' },
          { title: 'ESL Fast – Robot', url: 'http://www.eslfast.com/robot/' },
        ],
      },
      {
        label: 'Lecture',
        icon: BookOpen,
        links: [
          { title: 'ESL Lounge – Reading A1', url: 'http://www.esl-lounge.com/level1a-reading.php' },
          { title: 'British Council – Reading A1', url: 'https://learnenglish.britishcouncil.org/reading/beginner-a1-reading' },
          { title: 'AJ 3000 – Graded Readers', url: 'http://aj3000.com/wp/free-graded-readers/' },
        ],
      },
    ],
  },
  elementary: {
    name: 'Elementary', code: 'A2', color: '#60a5fa',
    desc: 'Construisez des bases solides avec des exercices de grammaire et de vocabulaire.',
    categories: [
      {
        label: 'Anglais général',
        icon: Globe,
        links: [
          { title: 'LEO Network', url: 'http://www.learn-english-online.org/' },
          { title: 'BBC Learning English – Courses', url: 'https://www.bbc.co.uk/learningenglish/english/courses' },
        ],
      },
      {
        label: 'Grammaire',
        icon: BookOpen,
        links: [
          { title: 'ESL Lounge – Level 1b Grammar', url: 'http://www.esl-lounge.com/level1bstructure.php' },
          { title: 'ESL Gold – High Beginning', url: 'http://www.eslgold.com/grammar/high_beginning/' },
          { title: 'SpeakSpeak – Elementary', url: 'http://speakspeak.com/english-grammar-exercises/elementary' },
          { title: 'English Club – Grammar Quizzes', url: 'http://www.englishclub.com/esl-quizzes/grammar-quizzes.htm' },
          { title: 'English Media Lab – Elementary', url: 'http://www.englishmedialab.com/elementaryquizzes.html' },
        ],
      },
      {
        label: 'Vocabulaire',
        icon: PenTool,
        links: [
          { title: 'ESL Lounge – Vocabulary A2', url: 'http://www.esl-lounge.com/level1bvocab.php' },
          { title: 'English Club – Vocabulary Quizzes', url: 'http://www.englishclub.com/esl-quizzes/vocabulary.htm' },
          { title: 'Picture Dictionary', url: 'http://www.pdictionary.com/' },
        ],
      },
      {
        label: 'Écoute',
        icon: Headphones,
        links: [
          { title: 'British Council – Listening A1', url: 'https://learnenglish.britishcouncil.org/skills/listening/beginner-a1' },
        ],
      },
      {
        label: 'Expression orale',
        icon: Mic,
        links: [
          { title: 'British Council – Speaking A1', url: 'https://learnenglish.britishcouncil.org/skills/speaking/beginner-a1' },
          { title: 'ESL Gold – Speaking High Beginning', url: 'http://www.eslgold.com/speaking/high_beginning.html' },
        ],
      },
      {
        label: 'Lecture',
        icon: BookOpen,
        links: [
          { title: 'ESL Lounge – Reading A2', url: 'http://www.esl-lounge.com/level1breadwrite.php' },
          { title: 'British Council – Reading A1', url: 'https://learnenglish.britishcouncil.org/reading/beginner-a1-reading' },
          { title: 'AJ 3000 – Graded Readers', url: 'http://aj3000.com/wp/free-graded-readers/' },
        ],
      },
    ],
  },
  'pre-intermediate': {
    name: 'Pre-Intermediate', code: 'B1-', color: '#a78bfa',
    desc: 'Développez votre vocabulaire et approfondissez la grammaire.',
    categories: [
      {
        label: 'Grammaire',
        icon: BookOpen,
        links: [
          { title: 'Englisch-Hilfen – Grammar', url: 'https://www.englisch-hilfen.de/en/inhalt_grammar.htm' },
          { title: 'Isabel Pérez – Grammar', url: 'http://www.isabelperez.com/grammar.htm#Grammar' },
          { title: 'A4ESL – Grammar', url: 'http://a4esl.org/q/h/grammar.html' },
          { title: 'Using English – Quizzes', url: 'http://www.usingenglish.com/quizzes/' },
        ],
      },
      {
        label: 'Vocabulaire',
        icon: PenTool,
        links: [
          { title: 'Englisch-Hilfen – Words', url: 'https://www.englisch-hilfen.de/en/words_inhalt.htm' },
          { title: 'English Club – Vocabulary', url: 'http://www.englishclub.com/vocabulary/' },
          { title: 'A4ESL – Vocabulary', url: 'http://a4esl.org/q/h/vocabulary.html' },
        ],
      },
      {
        label: 'Écoute',
        icon: Headphones,
        links: [
          { title: 'British Council – Listening B1', url: 'https://learnenglish.britishcouncil.org/skills/listening/intermediate-b1' },
        ],
      },
      {
        label: 'Expression orale',
        icon: Mic,
        links: [
          { title: 'British Council – Speaking B1', url: 'https://learnenglish.britishcouncil.org/skills/speaking/intermediate-b1' },
        ],
      },
      {
        label: 'Lecture',
        icon: BookOpen,
        links: [
          { title: 'British Council – Reading B1', url: 'https://learnenglish.britishcouncil.org/reading/intermediate-b1-reading' },
          { title: 'AJ 3000 – Graded Readers', url: 'http://aj3000.com/wp/free-graded-readers/' },
        ],
      },
    ],
  },
  intermediate: {
    name: 'Intermediate', code: 'B1', color: '#f59e0b',
    desc: 'Communiquez avec confiance dans des situations variées.',
    categories: [
      {
        label: 'Anglais général',
        icon: Globe,
        links: [
          { title: 'BBC 6-Minute English', url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english' },
        ],
      },
      {
        label: 'Grammaire',
        icon: BookOpen,
        links: [
          { title: 'Englisch-Hilfen – Grammar', url: 'https://www.englisch-hilfen.de/en/inhalt_grammar.htm' },
          { title: 'Isabel Pérez – Grammar', url: 'http://www.isabelperez.com/grammar.htm#Grammar' },
          { title: 'A4ESL – Grammar', url: 'http://a4esl.org/q/h/grammar.html' },
          { title: 'Using English – Quizzes', url: 'http://www.usingenglish.com/quizzes/' },
          { title: 'ESL Gold – High Intermediate', url: 'http://www.eslgold.com/grammar/high_intermediate' },
          { title: 'Oxford Practice Grammar – Intermediate', url: 'https://elt.oup.com/student/practicegrammar/int/?cc=global&selLanguage=en' },
        ],
      },
      {
        label: 'Vocabulaire',
        icon: PenTool,
        links: [
          { title: 'Englisch-Hilfen – Words', url: 'https://www.englisch-hilfen.de/en/words_inhalt.htm' },
          { title: 'English Club – Vocabulary', url: 'http://www.englishclub.com/vocabulary/' },
          { title: 'A4ESL – Vocabulary', url: 'http://a4esl.org/q/h/vocabulary.html' },
          { title: 'A4ESL – Idioms', url: 'http://a4esl.org/q/h/idioms.html' },
          { title: 'Isabel Pérez – Vocabulary', url: 'http://www.isabelperez.com/grammar.htm#Vocabulary' },
        ],
      },
      {
        label: 'Prononciation',
        icon: Mic,
        links: [
          { title: 'Isabel Pérez – Pronunciation', url: 'http://www.isabelperez.com/grammar.htm#pron' },
        ],
      },
      {
        label: 'Écoute',
        icon: Headphones,
        links: [
          { title: 'British Council – Listening B1', url: 'https://learnenglish.britishcouncil.org/skills/listening/intermediate-b1' },
        ],
      },
      {
        label: 'Expression orale',
        icon: Mic,
        links: [
          { title: 'British Council – Speaking B1', url: 'https://learnenglish.britishcouncil.org/skills/speaking/intermediate-b1' },
          { title: 'ESL Gold – Speaking High Intermediate', url: 'http://www.eslgold.com/speaking/high_intermediate' },
        ],
      },
      {
        label: 'Lecture',
        icon: BookOpen,
        links: [
          { title: 'British Council – Reading B1', url: 'https://learnenglish.britishcouncil.org/reading/intermediate-b1-reading' },
          { title: 'AJ 3000 – Graded Readers', url: 'http://aj3000.com/wp/free-graded-readers/' },
        ],
      },
    ],
  },
  'upper-intermediate': {
    name: 'Upper-Intermediate', code: 'B2', color: '#f97316',
    desc: 'Maîtrisez les nuances de la langue anglaise.',
    categories: [
      {
        label: 'Grammaire',
        icon: BookOpen,
        links: [
          { title: 'Englisch-Hilfen – Grammar', url: 'https://www.englisch-hilfen.de/en/inhalt_grammar.htm' },
          { title: 'Isabel Pérez – Grammar', url: 'http://www.isabelperez.com/grammar.htm' },
          { title: 'English Club – Grammar Quizzes', url: 'http://www.englishclub.com/esl-quizzes/grammar-quizzes.htm' },
          { title: 'English Zone', url: 'http://www.english-zone.com/index.php?ID=1' },
        ],
      },
      {
        label: 'Vocabulaire',
        icon: PenTool,
        links: [
          { title: 'Englisch-Hilfen – Words', url: 'https://www.englisch-hilfen.de/en/words_inhalt.htm' },
          { title: 'A4ESL – Vocabulary', url: 'http://a4esl.org/q/h/vocabulary.html' },
          { title: 'English Club – Vocabulary Quizzes', url: 'http://www.englishclub.com/esl-quizzes/vocabulary-quizzes.htm' },
        ],
      },
      {
        label: 'Écoute',
        icon: Headphones,
        links: [
          { title: 'British Council – Listening C1', url: 'https://learnenglish.britishcouncil.org/skills/listening/advanced-c1' },
          { title: 'ESL Bits', url: 'http://esl-bits.net/' },
          { title: 'ELLLO', url: 'http://www.elllo.org/english/home.htm' },
        ],
      },
      {
        label: 'Expression orale',
        icon: Mic,
        links: [
          { title: 'Daily ESL', url: 'http://www.dailyesl.com/' },
          { title: 'English Zone – Speaking', url: 'http://www.english-zone.com/index.php?ID=40' },
        ],
      },
      {
        label: 'Lecture',
        icon: BookOpen,
        links: [
          { title: 'British Council – Reading C1', url: 'https://learnenglish.britishcouncil.org/reading/advanced-c1-reading' },
          { title: 'AJ 3000 – Graded Readers', url: 'http://aj3000.com/wp/free-graded-readers/' },
        ],
      },
    ],
  },
  advanced: {
    name: 'Advanced', code: 'C1', color: '#ef4444',
    desc: 'Perfectionnez votre anglais avec des contenus authentiques.',
    categories: [
      {
        label: 'Grammaire',
        icon: BookOpen,
        links: [
          { title: 'Englisch-Hilfen – Grammar', url: 'https://www.englisch-hilfen.de/en/inhalt_grammar.htm' },
          { title: 'Isabel Pérez – Grammar', url: 'http://www.isabelperez.com/grammar.htm' },
          { title: 'English Club – Grammar Quizzes', url: 'http://www.englishclub.com/esl-quizzes/grammar-quizzes.htm' },
          { title: 'English Zone', url: 'http://www.english-zone.com/index.php?ID=1' },
          { title: 'Oxford Practice Grammar – Advanced', url: 'https://elt.oup.com/student/practicegrammar/advanced/?cc=global&selLanguage=en' },
        ],
      },
      {
        label: 'Vocabulaire',
        icon: PenTool,
        links: [
          { title: 'Englisch-Hilfen – Words', url: 'https://www.englisch-hilfen.de/en/words_inhalt.htm' },
          { title: 'A4ESL – Vocabulary', url: 'http://a4esl.org/q/h/vocabulary.html' },
          { title: 'ESL Gold – Advanced Vocabulary', url: 'http://www.eslgold.com/vocabulary/advanced' },
          { title: 'English Club – Vocabulary', url: 'http://www.englishclub.com/vocabulary/index.htm' },
          { title: 'ESL Gold – Academic Quiz', url: 'http://eslgold.com/vocabulary/academic_quiz/' },
        ],
      },
      {
        label: 'Écoute',
        icon: Headphones,
        links: [
          { title: 'British Council – Listening C1', url: 'https://learnenglish.britishcouncil.org/skills/listening/advanced-c1' },
          { title: 'ESL Bits', url: 'http://esl-bits.net/' },
          { title: 'ELLLO', url: 'http://www.elllo.org/english/home.htm' },
          { title: 'Dictations Online', url: 'http://www.dictationsonline.com/' },
        ],
      },
      {
        label: 'Expression orale',
        icon: Mic,
        links: [
          { title: 'Daily ESL', url: 'http://www.dailyesl.com/' },
          { title: 'English Zone – Speaking', url: 'http://www.english-zone.com/index.php?ID=40' },
          { title: 'ESL Gold – Advanced Speaking', url: 'http://www.eslgold.com/speaking/advanced' },
        ],
      },
      {
        label: 'Lecture',
        icon: BookOpen,
        links: [
          { title: 'British Council – Reading C1', url: 'https://learnenglish.britishcouncil.org/reading/advanced-c1-reading' },
          { title: 'ESL Gold – Advanced Reading', url: 'http://www.eslgold.com/reading/advanced' },
          { title: 'Project Gutenberg', url: 'http://www.gutenberg.org/' },
        ],
      },
      {
        label: 'Écriture',
        icon: PenTool,
        links: [
          { title: 'British Council – Writing C1', url: 'https://learnenglish.britishcouncil.org/writing/advanced-c1-writing' },
        ],
      },
      {
        label: 'Prononciation',
        icon: Mic,
        links: [
          { title: 'Isabel Pérez – Pronunciation', url: 'http://www.isabelperez.com/grammar.htm#pron' },
        ],
      },
    ],
  },
  aviation: {
    name: 'Aviation English', code: 'AVI', color: '#38bdf8',
    desc: 'Phraséologie et communications aériennes pour les professionnels de l\'aviation.',
    categories: [
      {
        label: 'Ressources principales',
        icon: Globe,
        links: [
          { title: 'Going Airside', url: 'http://www.goingairside.com/' },
          { title: 'ICAO – Site officiel', url: 'https://www.icao.int/Pages/default.aspx' },
          { title: 'ICAO English Test Sample Questions', url: 'https://aviationenglish.com/icao-english-test-questions/sample-questions-for-the-icao-english-test-personal-information' },
          { title: 'Revise Before Flight', url: 'https://www.revisebeforeflight.com/' },
          { title: 'Aviation English Vocabulary', url: 'http://english4aviation.pbworks.com/w/page/24013737/Vocabulary%20Resource' },
          { title: 'Tyrone Bishop Aviation', url: 'https://www.tyronebishop.com/' },
        ],
      },
      {
        label: 'Écoute – Dialectes',
        icon: Headphones,
        links: [
          { title: 'FluentU – Listen to English', url: 'https://www.fluentu.com/blog/english/listen-to-english/' },
          { title: 'Dialects Archive', url: 'https://www.dialectsarchive.com/test-your-english-comprehension' },
          { title: 'Sound Comparisons – Englishes', url: 'https://soundcomparisons.com/#/en/Englishes/map/daughter/Lgs_Sln' },
        ],
      },
      {
        label: 'Podcasts & Blogs',
        icon: Video,
        links: [
          { title: 'Airplane Geeks Podcast', url: 'http://www.airplanegeeks.com/' },
          { title: 'Wayne Farley Aviation', url: 'http://waynefarleyaviation.com/' },
          { title: 'The Finer Points – Podcasts', url: 'https://www.learnthefinerpoints.com/podcast/?Podcasts=all' },
          { title: 'Aviation English Blog', url: 'http://aviationenglishasia.wordpress.com/2010/07/04/free-aviation-english-for-pilots-and-controllers/' },
        ],
      },
      {
        label: 'Ressources techniques',
        icon: BookOpen,
        links: [
          { title: 'Landings', url: 'http://www.landings.com/' },
          { title: 'See How It Flies', url: 'http://www.av8n.com/how/' },
          { title: 'Pilot Friend', url: 'http://www.pilotfriend.com/' },
          { title: 'Skybrary Aviation Safety', url: 'http://www.skybrary.aero/' },
          { title: 'Live ATC', url: 'http://liveatc.net/' },
          { title: 'Airport Technology', url: 'http://www.airport-technology.com' },
          { title: 'ATC Network', url: 'http://www.atc-network.com' },
          { title: 'Aviation Week', url: 'http://aviationweek.com/' },
        ],
      },
    ],
  },
  business: {
    name: 'Business English', code: 'BUS', color: '#34d399',
    desc: 'Anglais professionnel pour les réunions, emails et présentations.',
    categories: [
      {
        label: 'Ressources Business',
        icon: Globe,
        links: [
          { title: 'BBC Learning English – Business', url: 'https://www.bbc.co.uk/learningenglish/english/features/the-english-we-speak' },
          { title: 'Business English Pod', url: 'https://www.businessenglishpod.com/' },
          { title: 'English Club – Business', url: 'https://www.englishclub.com/business-english/' },
          { title: 'BBC 6-Minute Business', url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english' },
        ],
      },
      {
        label: 'Écoute & Expression orale',
        icon: Headphones,
        links: [
          { title: 'British Council – Listening B2', url: 'https://learnenglish.britishcouncil.org/skills/listening/upper-intermediate-b2' },
          { title: 'ELLLO Business', url: 'http://www.elllo.org/english/home.htm' },
        ],
      },
      {
        label: 'Écriture professionnelle',
        icon: PenTool,
        links: [
          { title: 'British Council – Writing B2', url: 'https://learnenglish.britishcouncil.org/writing/upper-intermediate-b2-writing' },
          { title: 'Oxford Business English', url: 'https://www.oup.com/elt/catalogue/business-english/?cc=global&selLanguage=en' },
        ],
      },
    ],
  },
  cae: {
    name: 'C1 Advanced (CAE)', code: 'CAE', color: '#c084fc',
    desc: 'Préparation intensive à la certification Cambridge C1 Advanced.',
    categories: [
      {
        label: 'Préparation officielle',
        icon: Globe,
        links: [
          { title: 'Cambridge English – C1 Advanced', url: 'https://www.cambridgeenglish.org/exams-and-tests/advanced/' },
          { title: 'British Council – CAE', url: 'https://www.britishcouncil.org/exam/cambridge-c1' },
          { title: 'Exam English – CAE Practice', url: 'https://www.examenglish.com/CAE/index.php' },
          { title: 'Test English – CAE', url: 'https://test-english.com/exams/cambridge-advanced/' },
        ],
      },
      {
        label: 'Grammaire & Vocabulaire',
        icon: BookOpen,
        links: [
          { title: 'Oxford Practice Grammar – Advanced', url: 'https://elt.oup.com/student/practicegrammar/advanced/?cc=global&selLanguage=en' },
          { title: 'Englisch-Hilfen', url: 'https://www.englisch-hilfen.de/en/inhalt_grammar.htm' },
        ],
      },
      {
        label: 'Écoute',
        icon: Headphones,
        links: [
          { title: 'British Council – Listening C1', url: 'https://learnenglish.britishcouncil.org/skills/listening/advanced-c1' },
          { title: 'Dictations Online', url: 'http://www.dictationsonline.com/' },
        ],
      },
      {
        label: 'Lecture & Écriture',
        icon: PenTool,
        links: [
          { title: 'British Council – Reading C1', url: 'https://learnenglish.britishcouncil.org/reading/advanced-c1-reading' },
          { title: 'British Council – Writing C1', url: 'https://learnenglish.britishcouncil.org/writing/advanced-c1-writing' },
          { title: 'Project Gutenberg', url: 'http://www.gutenberg.org/' },
        ],
      },
    ],
  },
  ielts: {
    name: 'IELTS Preparation', code: 'IELTS', color: 'rgb(173,145,45)',
    desc: 'Atteignez le score IELTS visé grâce à des tests et exercices officiels.',
    categories: [
      {
        label: 'Sites officiels',
        icon: Globe,
        links: [
          { title: 'IELTS.org – Site officiel', url: 'https://www.ielts.org' },
          { title: 'IELTS Essentials – Préparation', url: 'https://www.ieltsessentials.com/global/prepare' },
          { title: 'British Council – Free Practice Tests', url: 'https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-practice-tests' },
          { title: 'IDP IELTS – Prepare', url: 'https://idpielts.me/prepare/' },
        ],
      },
      {
        label: 'Tests pratiques',
        icon: BookOpen,
        links: [
          { title: 'Exam English – IELTS Tests', url: 'http://www.examenglish.com/IELTS/index.php' },
          { title: 'Test English – IELTS', url: 'https://test-english.com/exams/ielts/' },
          { title: 'IELTS Online Tests', url: 'https://ieltsonlinetests.com/ielts-exam-library' },
          { title: 'IELTS Exam.net – Practice', url: 'https://www.ielts-exam.net/practice_tests/' },
          { title: 'Mini IELTS', url: 'https://mini-ielts.com/' },
          { title: 'Exam English IELTS', url: 'https://www.examenglish.com/IELTS/index.html' },
          { title: 'IELTS Blog – Online Tests', url: 'https://www.ielts-blog.com/ielts-online-practice-tests/' },
        ],
      },
      {
        label: 'Guides & Préparation',
        icon: PenTool,
        links: [
          { title: 'IELTS Buddy', url: 'http://www.ieltsbuddy.com/' },
          { title: 'IELTS Up – Listening Practice', url: 'https://ielts-up.com/listening/ielts-listening-practice.html' },
          { title: 'Daily Dictation – IELTS Listening', url: 'https://dailydictation.com/exercises/ielts-listening' },
          { title: 'English Online – Exams', url: 'http://www.english-online.org.uk/exam.htm' },
        ],
      },
    ],
  },
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

const ICON_MAP: Record<string, typeof BookOpen> = {
  'Grammaire': BookOpen,
  'Vocabulaire': PenTool,
  'Écoute': Headphones,
  'Écoute – Dialectes': Headphones,
  'Expression orale': Mic,
  'Lecture': BookOpen,
  'Écriture': PenTool,
  'Prononciation': Mic,
  'Anglais général': Globe,
  'Ressources principales': Globe,
  'Ressources Business': Globe,
  'Sites officiels': Globe,
}

export default function LevelPage() {
  const { slug } = useParams<{ slug: string }>()
  const level = levelData[slug]

  if (!level) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Niveau introuvable
        </h1>
        <Link href="/dashboard" className="text-sm" style={{ color: 'rgb(173,145,45)' }}>
          ← Retour au tableau de bord
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <Link href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm mb-8 hover:text-gold transition-colors"
        style={{ color: 'var(--text-muted)' }}
      >
        <ArrowLeft size={14} /> Retour
      </Link>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-lg text-sm font-bold font-mono"
            style={{ background: `${level.color}18`, color: level.color, border: `1px solid ${level.color}30` }}>
            {level.code}
          </span>
        </div>
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          {level.name}
        </h1>
        <p className="text-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          {level.desc}
        </p>
        <div className="mt-4">
          <a href={`https://ihjoburg.netlanguages.com/`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: `${level.color}15`, color: level.color, border: `1px solid ${level.color}25` }}>
            <ExternalLink size={13} /> Net Languages – Plateforme IH Joburg
          </a>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-8">
        {level.categories.map(cat => {
          const CatIcon = ICON_MAP[cat.label] || cat.icon
          return (
            <motion.section key={cat.label} variants={item}>
              <div className="flex items-center gap-2 mb-3">
                <CatIcon size={16} style={{ color: level.color }} />
                <h2 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  {cat.label}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {cat.links.map(link => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-sm transition-all hover:scale-[1.01]"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                  >
                    <span className="font-medium group-hover:text-gold transition-colors truncate" style={{ color: 'var(--text-primary)' }}>
                      {link.title}
                    </span>
                    <ExternalLink size={12} className="flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: level.color }} />
                  </a>
                ))}
              </div>
            </motion.section>
          )
        })}
      </motion.div>

      {/* Footer note */}
      <div className="mt-12 pt-8 text-center" style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Ressources officielles de{' '}
          <a href="https://sites.google.com/view/clickclick/home" target="_blank" rel="noopener noreferrer"
            className="hover:text-gold transition-colors" style={{ color: 'rgb(173,145,45)' }}>
            Click-Click
          </a>{' '}
          · International House Johannesburg
        </p>
      </div>
    </div>
  )
}