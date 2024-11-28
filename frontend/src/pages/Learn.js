import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../utils";
import Header from "./Header";

const questionsData = {
  English: {
    Basic: [
      {
        question: "Which word is a noun in the sentence: 'The dog is barking loudly'?",
        options: ["dog", "barking", "loudly", "is"],
        answer: "dog",
      },
      {
        question: "Choose the correct spelling:",
        options: ["Beter", "Better", "Betar", "Bettar"],
        answer: "Better",
      },
      {
        question: "What is the plural of 'mouse'?",
        options: ["mouses", "mouse", "mice", "mices"],
        answer: "mice",
      },
      {
        question: "Which word is a verb in the sentence: 'She dances beautifully'?",
        options: ["She", "dances", "beautifully", "beautiful"],
        answer: "dances",
      },
      {
        question: "What is the synonym of 'happy'?",
        options: ["Sad", "Excited", "Joyful", "Angry"],
        answer: "Joyful",
      },
    ],
    Intermediate: [
      {
        question: "Identify the adjective in the sentence: 'The tall man is reading a book.'",
        options: ["tall", "man", "reading", "book"],
        answer: "tall",
      },
      {
        question: "What does the idiom 'break the ice' mean?",
        options: [
          "To crack ice in winter",
          "To start a conversation",
          "To cause trouble",
          "To end a meeting"
        ],
        answer: "To start a conversation",
      },
      {
        question: "Choose the sentence with correct punctuation:",
        options: [
          "Can I help you, asked John.",
          "Can I help you asked John?",
          "Can I help you? asked John.",
          "Can I help you?' asked John."
        ],
        answer: "Can I help you?' asked John.",
      },
      {
        question: "What is the antonym of 'generous'?",
        options: ["Kind", "Mean", "Selfless", "Giving"],
        answer: "Mean",
      },
      {
        question: "Identify the sentence in passive voice:",
        options: [
          "She is reading a book.",
          "A book is being read by her.",
          "She will read the book.",
          "The book was read by her."
        ],
        answer: "A book is being read by her.",
      },
    ],
    Advanced: [
      {
        question: "What is the meaning of the word 'ephemeral'?",
        options: [
          "Lasting forever",
          "Short-lived",
          "Permanent",
          "Irrelevant"
        ],
        answer: "Short-lived",
      },
      {
        question: "Which sentence uses the subjunctive mood correctly?",
        options: [
          "If he was here, we would start.",
          "If he were here, we would start.",
          "If he is here, we will start.",
          "If he are here, we would start."
        ],
        answer: "If he were here, we would start.",
      },
      {
        question: "Identify the figurative language: 'The world is a stage.'",
        options: ["Metaphor", "Simile", "Hyperbole", "Personification"],
        answer: "Metaphor",
      },
      {
        question: "What is the correct usage of a semicolon?",
        options: [
          "I have a meeting at 3; please remind me.",
          "I have a meeting at 3, please remind me.",
          "I have a meeting at 3: please remind me.",
          "I have a meeting at 3; and please remind me."
        ],
        answer: "I have a meeting at 3; please remind me.",
      },
      {
        question: "Which sentence demonstrates proper subject-verb agreement?",
        options: [
          "The group of players are practicing.",
          "Each of the answers are correct.",
          "The team is winning the match.",
          "None of the solutions works."
        ],
        answer: "The team is winning the match.",
      },
    ],
  },
  
  Hindi: {
    Basic: [
      {
        question: "हिंदी वर्णमाला में कितने स्वर होते हैं?",
        options: ["10", "12", "14", "16"],
        answer: "12",
      },
      {
        question: "'गाय' का विलोम शब्द क्या है?",
        options: ["बैल", "बकरी", "सांड", "भैंस"],
        answer: "बैल",
      },
      {
        question: "'राम बाजार गया।' इस वाक्य में क्रिया कौन सी है?",
        options: ["राम", "बाजार", "गया", "।"],
        answer: "गया",
      },
      {
        question: "'अच्छा' शब्द का पर्यायवाची क्या है?",
        options: ["सुंदर", "शुभ", "गुणी", "सच्चा"],
        answer: "शुभ",
      },
      {
        question: "'पुस्तक' में कितने वर्ण हैं?",
        options: ["3", "4", "5", "6"],
        answer: "5",
      },
    ],
    Intermediate: [
      {
        question: "'मैं पढ़ाई कर रहा हूँ।' इस वाक्य में काल कौन सा है?",
        options: ["भूतकाल", "वर्तमानकाल", "भविष्यकाल", "निश्चितकाल"],
        answer: "वर्तमानकाल",
      },
      {
        question: "'नदी' का स्त्रीलिंग क्या है?",
        options: ["नदी", "पानी", "सरिता", "झील"],
        answer: "सरिता",
      },
      {
        question: "'धरती' का पर्यायवाची शब्द क्या है?",
        options: ["भूमि", "आकाश", "जल", "अग्नि"],
        answer: "भूमि",
      },
      {
        question: "'किसान खेत में काम करता है।' इस वाक्य में विशेषण कौन सा है?",
        options: ["किसान", "खेत", "काम", "नहीं है"],
        answer: "नहीं है",
      },
      {
        question: "'नमस्ते' शब्द का सही अर्थ क्या है?",
        options: ["नमस्कार", "आशीर्वाद", "विदाई", "सुप्रभात"],
        answer: "नमस्कार",
      },
    ],
    Advanced: [
      {
        question: "'कर्म' शब्द में कितने वर्ण हैं?",
        options: ["2", "3", "4", "5"],
        answer: "2",
      },
      {
        question: "मुहावरे 'नाक कटना' का क्या अर्थ है?",
        options: [
          "सम्मान खोना",
          "गुस्सा करना",
          "बहुत खुश होना",
          "डर जाना"
        ],
        answer: "सम्मान खोना",
      },
      {
        question: "'गति' शब्द का विलोम क्या है?",
        options: ["धीमी", "रुकावट", "विलंब", "स्थिरता"],
        answer: "स्थिरता",
      },
      {
        question: "'रामायण' किस छंद में लिखी गई है?",
        options: ["सवैया", "दोहा", "चौपाई", "रोला"],
        answer: "चौपाई",
      },
      {
        question: "संधि-विच्छेद: 'विद्यालय' क्या होगा?",
        options: ["विद्या + आलय", "विद्य + आलय", "विद + आलय", "विद्या + अलय"],
        answer: "विद्या + आलय",
      },
    ],
  },
  French: {
    Basic: [
      {
        question: "Quel est le féminin de 'roi' ?",
        options: ["reine", "princesse", "dame", "femme"],
        answer: "reine",
      },
      {
        question: "Quel est le pluriel de 'chat' ?",
        options: ["chats", "chattes", "chatte", "chatses"],
        answer: "chats",
      },
      {
        question: "Comment dit-on 'hello' en français ?",
        options: ["Salut", "Hola", "Ciao", "Bonjour"],
        answer: "Bonjour",
      },
      {
        question: "Quelle est la couleur du ciel ?",
        options: ["Bleu", "Vert", "Rouge", "Jaune"],
        answer: "Bleu",
      },
      {
        question: "Quelle est la capitale de la France ?",
        options: ["Paris", "Lyon", "Marseille", "Nice"],
        answer: "Paris",
      },
    ],
    Intermediate: [
      {
        question: "Quel est le verbe dans cette phrase : 'Il mange une pomme.' ?",
        options: ["Il", "mange", "une", "pomme"],
        answer: "mange",
      },
      {
        question: "Quelle phrase est correcte ?",
        options: [
          "Je suis allé au magasin hier.",
          "Je suis allé au magasin hier hier.",
          "Je suis allé au magasins hier.",
          "Je ai allé au magasin hier."
        ],
        answer: "Je suis allé au magasin hier.",
      },
      {
        question: "Quel est l'antonyme de 'grand' ?",
        options: ["petit", "haut", "large", "difficile"],
        answer: "petit",
      },
      {
        question: "Quelle est la bonne conjugaison du verbe 'avoir' pour il/elle ?",
        options: ["avoir", "a", "as", "avons"],
        answer: "a",
      },
      {
        question: "Que signifie l'expression 'avoir un chat dans la gorge' ?",
        options: [
          "Être très fatigué",
          "Avoir mal à la gorge",
          "Avoir du mal à parler",
          "Être triste"
        ],
        answer: "Avoir du mal à parler",
      },
    ],
    Advanced: [
      {
        question: "Quel est le synonyme de 'intelligent' ?",
        options: ["savant", "bête", "sot", "difficile"],
        answer: "savant",
      },
      {
        question: "Quel est l'accord correct de l'adjectif dans la phrase suivante : 'Les femmes sont ___.'",
        options: ["intelligents", "intelligentes", "intelligent", "intelligentes"],
        answer: "intelligentes",
      },
      {
        question: "Quelle phrase utilise le conditionnel correctement ?",
        options: [
          "Si j'étais riche, je voyagerais.",
          "Si j'étais riche, je voyagerai.",
          "Si j'étais riche, je voyagerait.",
          "Si j'étais riche, je voyageras."
        ],
        answer: "Si j'étais riche, je voyagerais.",
      },
      {
        question: "Quelle est la traduction de 'The quick brown fox jumps over the lazy dog' en français ?",
        options: [
          "Le rapide renard brun saute par-dessus le chien paresseux.",
          "Le renard brun rapide saute par-dessus le chien paresseux.",
          "Le renard rapide brun saute par-dessus le chien paresseux.",
          "Le chien paresseux saute par-dessus le renard brun rapide."
        ],
        answer: "Le rapide renard brun saute par-dessus le chien paresseux.",
      },
      {
        question: "Quel est l'infinitif du verbe dans la phrase : 'Elle a mangé une pomme.' ?",
        options: ["manger", "mangé", "mangée", "mange"],
        answer: "manger",
      },
    ],
  },
  Spanish: {
    Basic: [
      {
        question: "¿Cómo se dice 'hello' en español?",
        options: ["Hola", "Bonjour", "Ciao", "Hallo"],
        answer: "Hola",
      },
      {
        question: "¿Cuál es el plural de 'libro'?",
        options: ["libros", "libras", "libroses", "libres"],
        answer: "libros",
      },
      {
        question: "¿Qué significa 'rojo'?",
        options: ["Green", "Red", "Blue", "Yellow"],
        answer: "Red",
      },
      {
        question: "¿Cómo se dice 'good morning' en español?",
        options: ["Buenos días", "Bonjour", "Guten Morgen", "Buongiorno"],
        answer: "Buenos días",
      },
      {
        question: "¿Cuál es la capital de España?",
        options: ["Madrid", "Barcelona", "Sevilla", "Valencia"],
        answer: "Madrid",
      },
    ],
    Intermediate: [
      {
        question: "¿Cuál es el verbo en la oración 'Ella come una manzana'?",
        options: ["Ella", "come", "manzana", "una"],
        answer: "come",
      },
      {
        question: "¿Qué significa la palabra 'feliz'?",
        options: ["Sad", "Happy", "Angry", "Tired"],
        answer: "Happy",
      },
      {
        question: "¿Cuál es el sinónimo de 'grande'?",
        options: ["Enorme", "Pequeño", "Mediano", "Alto"],
        answer: "Enorme",
      },
      {
        question: "Elige la forma correcta del verbo: 'Nosotros ______ al cine mañana.'",
        options: ["vamos", "fue", "iremos", "ir"],
        answer: "iremos",
      },
      {
        question: "¿Qué significa 'tener hambre'?",
        options: ["To be thirsty", "To be hungry", "To be tired", "To be happy"],
        answer: "To be hungry",
      },
    ],
    Advanced: [
      {
        question: "¿Cuál es el sinónimo de 'hermoso'?",
        options: ["Bello", "Feo", "Normal", "Simpático"],
        answer: "Bello",
      },
      {
        question: "¿Cuál es el verbo en subjuntivo en la oración 'Espero que tú ______ bien'? ",
        options: ["estás", "estarás", "estés", "estaba"],
        answer: "estés",
      },
      {
        question: "¿Qué significa la expresión 'estar en las nubes'?",
        options: [
          "To be lost in thought",
          "To be in a hurry",
          "To be very happy",
          "To be confused"
        ],
        answer: "To be lost in thought",
      },
      {
        question: "Elige la forma correcta del adjetivo: 'Ella es una persona ______.'",
        options: ["inteligente", "inteligentes", "inteligentas", "inteligente"],
        answer: "inteligente",
      },
      {
        question: "¿Cuál es el pretérito imperfecto del verbo 'trabajar' para 'yo'?",
        options: ["trabajé", "trabajaba", "trabajó", "trabajando"],
        answer: "trabajaba",
      },
    ],
  },
  German: {
    Basic: [
      {
        question: "Wie sagt man 'hello' auf Deutsch?",
        options: ["Hallo", "Bonjour", "Ciao", "Hola"],
        answer: "Hallo",
      },
      {
        question: "Was ist der Plural von 'Buch'?",
        options: ["Bücher", "Buches", "Buchs", "Bücheres"],
        answer: "Bücher",
      },
      {
        question: "Was bedeutet 'blau'?",
        options: ["Red", "Blue", "Green", "Yellow"],
        answer: "Blue",
      },
      {
        question: "Wie sagt man 'good morning' auf Deutsch?",
        options: ["Guten Morgen", "Bonjour", "Buongiorno", "Good morning"],
        answer: "Guten Morgen",
      },
      {
        question: "Was ist die Hauptstadt von Deutschland?",
        options: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
        answer: "Berlin",
      },
    ],
    Intermediate: [
      {
        question: "Was ist das Verb in dem Satz 'Er trinkt Wasser'?",
        options: ["Er", "trinkt", "Wasser", "den"],
        answer: "trinkt",
      },
      {
        question: "Was bedeutet das Wort 'freundlich'?",
        options: ["Angry", "Friendly", "Shy", "Sad"],
        answer: "Friendly",
      },
      {
        question: "Welche Form ist korrekt: 'Wir ______ in den Park.'",
        options: ["gehen", "gehe", "geht", "gehenen"],
        answer: "gehen",
      },
      {
        question: "Was ist das Gegenteil von 'klein'?",
        options: ["groß", "lang", "hoch", "kurz"],
        answer: "groß",
      },
      {
        question: "Was bedeutet 'Hunger haben'?",
        options: ["To be sleepy", "To be hungry", "To be tired", "To be cold"],
        answer: "To be hungry",
      },
    ],
    Advanced: [
      {
        question: "Was ist das Synonym von 'schön'?",
        options: ["hübsch", "hässlich", "langweilig", "schnell"],
        answer: "hübsch",
      },
      {
        question: "Was ist die korrekte Konjugation des Verbs 'sein' für 'er'?",
        options: ["sind", "ist", "bin", "seht"],
        answer: "ist",
      },
      {
        question: "Was bedeutet die Redewendung 'Jemandem einen Korb geben'?",
        options: [
          "To reject someone",
          "To invite someone",
          "To give someone a gift",
          "To be late"
        ],
        answer: "To reject someone",
      },
      {
        question: "Welche Form ist korrekt? 'Wenn ich Zeit ______, gehe ich schwimmen.'",
        options: ["habe", "hatte", "hätte", "haben"],
        answer: "habe",
      },
      {
        question: "Was ist der Unterschied zwischen 'kennen' und 'wissen'?",
        options: [
          "'kennen' bezieht sich auf Personen oder Dinge, 'wissen' auf Informationen.",
          "'wissen' bezieht sich auf Personen oder Dinge, 'kennen' auf Informationen.",
          "'kennen' und 'wissen' sind Synonyme.",
          "'wissen' ist die formelle Form von 'kennen'."
        ],
        answer: "'kennen' bezieht sich auf Personen oder Dinge, 'wissen' auf Informationen.",
      },
    ],
  },
  Japanese: {
    Basic: [
      {
        question: "「こんにちは」の意味は何ですか？",
        options: ["おはよう", "こんばんは", "こんにちは", "おやすみなさい"],
        answer: "こんにちは",
      },
      {
        question: "「さくらんぼ」の意味は何ですか？",
        options: ["りんご", "もも", "さくらんぼ", "ぶどう"],
        answer: "さくらんぼ",
      },
      {
        question: "「ありがとう」の意味は何ですか？",
        options: ["ごめんなさい", "ありがとう", "お願いします", "すみません"],
        answer: "ありがとう",
      },
      {
        question: "「おはよう」の意味は何ですか？",
        options: ["おやすみなさい", "おはよう", "こんにちは", "こんばんは"],
        answer: "おはよう",
      },
      {
        question: "日本の首都はどこですか？",
        options: ["京都", "大阪", "北海道", "東京"],
        answer: "東京",
      },
    ],
    Intermediate: [
      {
        question: "「食べる」の意味は何ですか？",
        options: ["寝る", "食べる", "飲む", "歩く"],
        answer: "食べる",
      },
      {
        question: "「私は学生です。」の意味は何ですか？",
        options: ["私は学生です。", "私は先生です。", "私は働いています。", "私は医者です。"],
        answer: "私は学生です。",
      },
      {
        question: "「犬」はどの種類の言葉ですか？",
        options: ["動詞", "形容詞", "名詞", "代名詞"],
        answer: "名詞",
      },
      {
        question: "「学校へ行きます」の「行きます」の意味は何ですか？",
        options: ["食べる", "行く", "寝る", "勉強する"],
        answer: "行く",
      },
      {
        question: "「何時ですか？」の意味は何ですか？",
        options: ["いくらですか？", "どこですか？", "何時ですか？", "誰ですか？"],
        answer: "何時ですか？",
      },
    ],
    Advanced: [
      {
        question: "「彼は日本語を上手に話します。」の「上手に」の意味は何ですか？",
        options: ["上手に", "下手に", "速く", "遅く"],
        answer: "上手に",
      },
      {
        question: "「今日はいい天気ですね。」の文法は何ですか？",
        options: ["過去形", "未来形", "現在形", "否定形"],
        answer: "現在形",
      },
      {
        question: "「食べることが好きです。」の「こと」が指しているのは何ですか？",
        options: ["食べる", "寝る", "勉強する", "働く"],
        answer: "食べる",
      },
      {
        question: "「彼女は日本に住んでいます。」の文法の使い方はどれですか？",
        options: ["現在進行形", "過去形", "未来形", "未来進行形"],
        answer: "現在進行形",
      },
      {
        question: "「もし雨が降ったら、私は家にいます。」の「もし」の意味は何ですか？",
        options: ["もし", "なぜなら", "しかし", "たとえ"],
        answer: "もし",
      },
    ],
  },
};

export default function Learn() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [language, setLanguage] = useState("en");
  const [level, setLevel] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    if (!username) {
      navigate("/login");
    } else {
      setLoggedInUser(username);
      setLanguage(savedLanguage);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const startLevel = (selectedLevel) => {
    setLevel(selectedLevel);
    setQuestions(questionsData[language][selectedLevel]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsCompleted(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setSelectedOption("");
  
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCompleted(true);
      localStorage.setItem("quizScore", score + (selectedOption === questions[currentQuestionIndex].answer ? 1 : 0));
    }
  };
  

  const handleRetry = () => {
    setLevel("");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption("");
    setIsCompleted(false);
  };


    return (
      <div className="h-screen flex flex-col bg-black text-gray-100">
          <header className="ml-[16rem] border-b border-gray-500
 fixed bg-black text-white p-4 flex justify-between items-center shadow-md w-5/6 z-10 top-0 left-0">
          <h1 className="text-xl font-bold ml-[2rem] text-green-500"></h1>
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-green-500">Welcome, {loggedInUser}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </header>
  
        <main className="flex-grow p-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* <h1 className="text-4xl font-bold text-blue-400">Learn</h1> */}
            {!level && !isCompleted && (
              <>
                <p className="mt-[6rem] text-lg text-gray-400 ml-32">
                  Select a level to start learning:
                </p>
                <div className="mt-6 flex justify-center space-x-4 ml-32">
                  {["Basic", "Intermediate", "Advanced"].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => startLevel(lvl)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </>
            )}
  
            {level && !isCompleted && questions.length > 0 && (
              <div className="mt-[6rem] ml-[11rem]">
                <h2 className="text-2xl font-semibold text-blue-300">
                  Level: {level}
                </h2>
                <div className="mt-4 p-6 bg-gray-800 shadow-lg rounded-lg ">
                  <p className="text-lg font-medium">
                    Question {currentQuestionIndex + 1} : {"  "}
                    {questions[currentQuestionIndex].question}
                  </p>
                  <div className="mt-4 space-y-2">
                    {questions[currentQuestionIndex].options.map(
                      (option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionSelect(option)}
                          className={`w-full px-4 py-2 text-left border rounded-lg ${
                            selectedOption === option
                              ? "bg-blue-500 text-white border-blue-600"
                              : "bg-gray-700 border-gray-600"
                          } hover:bg-blue-400 transition`}
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    disabled={!selectedOption}
                    className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {currentQuestionIndex + 1 === questions.length
                      ? "Submit"
                      : "Next"}
                  </button>
                </div>
              </div>
            )}
            {isCompleted && (
              <div className="mt-[10rem] ml-[10rem]">
                <h2 className="text-2xl font-semibold text-green-400">
                  Quiz Completed!
                </h2>
                <p className="mt-4 text-lg">
                  Your score:{" "}
                  <span className="font-bold text-yellow-400">{score}</span>/
                  {questions.length}
                </p>
                <div className="mt-6 space-x-4">
                  <button
                    onClick={handleRetry}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
                  >
                    Reattempt
                  </button>
                  <button
                    onClick={() => {
                      setLevel("");
                      setQuestions([]);
                      setCurrentQuestionIndex(0);
                      setIsCompleted(false);
                      setSelectedOption("");
                    }}
                    className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                  >
                    Choose Another Level
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }  