import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Trophy, 
  User, 
  Settings, 
  Play, 
  Check, 
  X, 
  Heart, 
  Flame, 
  Star,
  Volume2,
  ChevronRight,
  Lock,
  Crown,
  Zap
} from 'lucide-react';

// Datos mockeados
const mockLessons = [
  { id: 1, title: "Saludos Básicos", level: 1, completed: true, locked: false, stars: 3 },
  { id: 2, title: "Números 1-10", level: 2, completed: true, locked: false, stars: 3 },
  { id: 3, title: "Colores", level: 3, completed: true, locked: false, stars: 2 },
  { id: 4, title: "Familia", level: 4, completed: false, locked: false, stars: 0 },
  { id: 5, title: "Comida", level: 5, completed: false, locked: true, stars: 0 },
  { id: 6, title: "Animales", level: 6, completed: false, locked: true, stars: 0 },
];

// Preguntas específicas por lección
const lessonQuestions = {
  1: [ // Saludos Básicos
    {
      id: 1,
    type: 'translate',
    question: '¿Cómo se dice "Hola" en mixe ?',
    options: ['Min', 'Jëj', 'Pääj', 'Määy'],
    correct: 0,
    audio: 'Min' // Asumo que ya tienes un audio de "Min"
  },
  {
    id: 2,
    type: 'multiple',
    question: 'Selecciona la traducción correcta de "Buenos días" en mixe ',
    options: ['Tëëk', 'Määy', 'Te\'ns pyë', 'Kajpxy'],
    correct: 1,
    audio: 'Määy' // Asumo que ya tienes un audio de "Määy"
  },
  {
    id: 3,
    type: 'audio',
    question: 'Escucha y selecciona la traducción correcta de "¿Cómo estás?" en mixe ',
    options: ['¿Pajën?', '¿Jam jaay?', '¿Jampyëk?', '¿Jaaw pyëk?'],
    correct: 0,
    audio: 'Pajën' // Esto es una aproximación, necesitarías el audio real de "¿Pajën?"
  },
  {
    id: 4,
    type: 'translate',
    question: '¿Cómo se dice "Adiós" en mixe?',
    options: ['Min', 'Naax', 'Tëjk', 'Pa\'y'],
    correct: 1,
    audio: 'Naax' // Asumo que ya tienes un audio de "Naax"
    }
  ],
  2: [ // Números 1-10
    {
    id: 1,
    type: 'translate',
    question: '¿Cuál es el número "cinco" en mixe?',
    options: ['Tujts', 'Nax', 'Jëëp', 'Pook'],
    correct: 1, // 'Nax'
    audio: 'Nax' // Asumo que ya tienes un audio para "Nax"
  },
  {
    id: 2,
    type: 'multiple',
    question: 'Selecciona el número correcto en mixe : "Ocho"',
    options: ['Tsëën', 'Tuk', 'Txan', 'Mëk'],
    correct: 1, // 'Tuk - Ocho'
    audio: 'Tuk' // Asumo que ya tienes un audio para "Tuk"
  },
  {
    id: 3,
    type: 'translate',
    question: '¿Cómo se escribe "3" en mixe?',
    options: ['Tëjk', 'Tujts', 'Pook', 'Nax'],
    correct: 1, // 'Tujts'
    audio: 'Tujts' // Asumo que ya tienes un audio para "Tujts"
  },
  {
    id: 4,
    type: 'audio',
    question: 'Escucha y selecciona el número correcto en mixe ',
    options: ['Juun', 'Mëk', 'Kuun', 'Tëjk'],
    correct: 1, // 'Mëk'
    audio: 'Mëk' // Asumo que ya tienes un audio para "Mëk"
  }
  ],
  3: [ // Colores
    {
    id: 1,
    type: 'translate',
    question: '¿Cómo se dice "Rojo" en mixe?',
    options: ['Tsaaj', 'Mooy', 'Tsëk', 'Pook'],
    correct: 2, // 'Tsëk'
    audio: 'Tsëk' // Asumo que ya tienes un audio para "Tsëk"
  },
  {
    id: 2,
    type: 'multiple',
    question: 'Selecciona la traducción de "Azul" en mixe ',
    options: ['Paat', 'Juuj', 'Nëëj', 'Tujts'],
    correct: 2, // 'Nëëj'
    audio: 'Nëëj' // Asumo que ya tienes un audio para "Nëëj"
  },
  {
    id: 3,
    type: 'translate',
    question: '¿De qué color es el sol en mixe ? (Amarillo)',
    options: ['Tsëk', 'Tsajaay', 'Mooy', 'Nëëj'],
    correct: 1, // 'Tsajaay'
    audio: 'Tsajaay' // Asumo que ya tienes un audio para "Tsajaay"
  },
  {
    id: 4,
    type: 'audio',
    question: 'Escucha y selecciona el color correcto en mixe ',
    options: ['Mooy', 'Tsëk', 'Pook', 'Juuj'],
    correct: 0, // 'Mooy'
    audio: 'Mooy' // Asumo que ya tienes un audio para "Mooy"
  }
  ],
  4: [ // Familia
    {
    id: 1,
    type: 'translate',
    question: '¿Cómo se dice "Madre" en mixe?',
    options: ['Tsooj', 'Na', 'Wëën', 'Tëëy'],
    correct: 1, // 'Na'
    audio: 'Na' // Asumo que ya tienes un audio para "Na"
  },
  {
    id: 2,
    type: 'multiple',
    question: 'Selecciona la traducción de "Hermano" en mixe ',
    options: ['Wëën', 'Tsëëk', 'Pëjk', 'Tëjk'],
    correct: 2, // 'Pëjk'
    audio: 'Pëjk' // Asumo que ya tienes un audio para "Pëjk"
  },
  {
    id: 3,
    type: 'translate',
    question: '¿Cómo se dice "Abuelo" en mixe?',
    options: ['Tsooj', 'Tëëy', 'Wëën', 'Pëjk'],
    correct: 0, // 'Tsooj'
    audio: 'Tsooj' // Asumo que ya tienes un audio para "Tsooj"
  },
  {
    id: 4,
    type: 'audio',
    question: 'Escucha y selecciona el miembro de la familia en mixe ',
    options: ['Wëën', 'Na', 'Tëëy', 'Tsooj'],
    correct: 0, // 'Wëën'
    audio: 'Wëën' // Asumo que ya tienes un audio para "Wëën"
  }
  ]
};

const mockUser = {
  name: "Emily Tovar",
  level: 15,
  xp: 2450,
  streak: 7,
  hearts: 3,
  gems: 250,
  achievements: 12
};

const LenguaVivaApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [currentQuestions, setCurrentQuestions] = useState([]);

  // Componente Header
  const Header = () => (
    <div className="bg-gradient-to-r from-[#7f2f2f] to-[#A74C2F] text-white p-4 shadow-lg">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center space-x-3">
          <img 
              src="src/components/Imagen_de_WhatsApp_2025-06-11_a_las_08.34.21_147af465-removebg-preview.png" 
              alt="Descripción de la imagen"
                className="w-14 h-14 "
              />
          <h1 className="text-2xl font-bold">Lengua Viva</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-orange-300" />
            <span className="font-semibold">{mockUser.streak}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-300" />
            <span className="font-semibold">{hearts}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-300" />
            <span className="font-semibold">{mockUser.gems}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Componente Home
  const HomeView = () => (
    <div className="max-w-4xl mx-auto p-6">
      {/* Panel de usuario */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#80312D] to-[#aa563cba] rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{mockUser.name}</h2>
              <p className="text-gray-600">Nivel {mockUser.level} • {mockUser.xp} XP</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">{mockUser.achievements} logros</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full" style={{width: '65%'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Lecciones */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 text-gray-800">Lecciones de Español</h3>
        <div className="grid gap-4">
          {mockLessons.map((lesson, index) => (
            <div key={lesson.id} className="relative">
              {/* Línea conectora */}
              {index < mockLessons.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-8"></div>
              )}
              
              <div className={`
                flex items-center p-4 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer
                ${lesson.locked ? 'bg-gray-100 opacity-60' : lesson.completed ? 'bg-[#965b4927] border-2 border-[#965b4988]' : 'bg-blue-50 border-2 border-blue-200'}
              `} onClick={() => !lesson.locked && startLesson(lesson)}>
                
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center mr-4
                  ${lesson.locked ? 'bg-gray-300' : lesson.completed ? 'bg-[#80322E]' : 'bg-blue-500'}
                `}>
                  {lesson.locked ? (
                    <Lock className="w-8 h-8 text-gray-600" />
                  ) : lesson.completed ? (
                    <Check className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white" />
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-gray-800">{lesson.title}</h4>
                  <p className="text-gray-600">Nivel {lesson.level}</p>
                  {lesson.stars > 0 && (
                    <div className="flex mt-1">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < lesson.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  )}
                </div>

                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Componente de Lección
  const LessonView = () => {
    const question = currentQuestions[currentQuestion];
    
    if (!question) {
      return (
        <div className="max-w-2xl mx-auto p-6 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Lección no disponible</h2>
            <p className="text-gray-600 mb-6">Esta lección aún no tiene preguntas disponibles.</p>
            <button 
              onClick={() => setCurrentView('home')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="max-w-2xl mx-auto p-6">
        {/* Barra de progreso */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <button 
              onClick={() => {
                setCurrentView('home');
                setCurrentLesson(null);
                setCurrentQuestion(0);
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              <X className="w-6 h-6 cursor-pointer transition-all duration-300 hover:ease-in-out hover:scale-115" />
            </button>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span>{hearts}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-300" 
              style={{width: `${((currentQuestion + 1) / currentQuestions.length) * 100}%`}}
            ></div>
          </div>
        </div>

        {/* Pregunta */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="text-center mb-6">
            {question.type === 'audio' && (
              <button className="mb-4 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full">
                <Volume2 className="w-8 h-8" />
              </button>
            )}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{question.question}</h2>
            {question.audio && question.type !== 'audio' && (
              <button className="text-blue-500 hover:text-blue-600">
                <Volume2 className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Opciones */}
          <div className="grid gap-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`
                  p-4 rounded-xl border-2 text-left cursor-pointer transition-all duration-300 hover:shadow-lg
                  ${selectedAnswer === index 
                    ? showResult 
                      ? isCorrect 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-red-500 bg-red-50'
                      : 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                  ${showResult && index === question.correct && selectedAnswer !== index ? 'border-green-500 bg-green-50' : ''}
                `}
              >
                <span className="font-medium">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resultado */}
        {showResult && (
          <div className={`
            p-6 rounded-xl mb-6
            ${isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}
          `}>
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center
                ${isCorrect ? 'bg-green-500' : 'bg-red-500'}
              `}>
                {isCorrect ? (
                  <Check className="w-8 h-8 text-white" />
                ) : (
                  <X className="w-8 h-8 text-white" />
                )}
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? '¡Correcto!' : '¡Incorrecto!'}
              </h3>
              {!isCorrect && (
                <p className="text-gray-600 mb-4">
                  La respuesta correcta es: <strong>{question.options[question.correct]}</strong>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Botón continuar */}
        {showResult && (
          <button
            onClick={handleNextQuestion}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200"
          >
            {currentQuestion === currentQuestions.length - 1 ? 'Completar Lección' : 'Continuar'}
          </button>
        )}
      </div>
    );
  };

  // Componente de navegación inferior
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 ">
      <div className="flex justify-around max-w-md mx-auto">
        {[
          { icon: Home, label: 'Inicio', view: 'home' },
          { icon: Trophy, label: 'Logros', view: 'achievements' },
          { icon: User, label: 'Perfil', view: 'profile' },
          { icon: Settings, label: 'Ajustes', view: 'settings' }
        ].map(({ icon: Icon, label, view }) => (
          <button
            key={view}
            onClick={() => setCurrentView(view)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 cursor-pointer hover:shadow-lg hover:border-1
              ${currentView === view ? 'text-[#7E302B] bg-[#965b4927]' : 'text-gray-600 hover:text-gray-800'}
            `}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Vista de logros
  const AchievementsView = () => (
    <div className="max-w-4xl mx-auto p-6 pb-20">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Logros</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { title: "Primera Lección", description: "Completa tu primera lección", icon: "🎯", earned: true },
          { title: "Racha de 7 días", description: "Mantén una racha de 7 días", icon: "🔥", earned: true },
          { title: "Perfeccionista", description: "Obtén 3 estrellas en una lección", icon: "⭐", earned: true },
          { title: "Estudiante Dedicado", description: "Completa 5 lecciones", icon: "📚", earned: false },
          { title: "Políglota", description: "Completa un curso completo", icon: "🌍", earned: false },
          { title: "Maestro", description: "Ayuda a otros estudiantes", icon: "👨‍🏫", earned: false }
        ].map((achievement, index) => (
          <div key={index} className={`p-4 rounded-xl border-2 ${achievement.earned ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{achievement.icon}</div>
              <div className="flex-1">
                <h3 className={`font-bold ${achievement.earned ? 'text-yellow-700' : 'text-gray-500'}`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`}>
                  {achievement.description}
                </p>
              </div>
              {achievement.earned && <Crown className="w-6 h-6 text-yellow-500" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Vista de perfil
  const ProfileView = () => (
    <div className="max-w-2xl mx-auto p-6 pb-20">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#80312D] to-[#aa563cba] rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{mockUser.name}</h2>
          <p className="text-gray-600 mb-4">Estudiante desde hace 3 meses</p>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{mockUser.level}</div>
              <div className="text-sm text-blue-500">Nivel</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{mockUser.xp}</div>
              <div className="text-sm text-green-500">XP Total</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{mockUser.streak}</div>
              <div className="text-sm text-orange-500">Racha Actual</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{mockUser.achievements}</div>
              <div className="text-sm text-purple-500">Logros</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Funciones
  const startLesson = (lesson) => {
    const questions = lessonQuestions[lesson.id];
    if (!questions) {
      alert('Esta lección aún no está disponible.');
      return;
    }
    
    setCurrentLesson(lesson);
    setCurrentQuestions(questions);
    setCurrentView('lesson');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestions[currentQuestion].correct;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    } else {
      setHearts(Math.max(0, hearts - 1));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion === currentQuestions.length - 1) {
      // Completar lección
      setCurrentView('home');
      setCurrentLesson(null);
      setCurrentQuestion(0);
      setCurrentQuestions([]);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  // Render principal
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pb-20">
        {currentView === 'home' && <HomeView />}
        {currentView === 'lesson' && <LessonView />}
        {currentView === 'achievements' && <AchievementsView />}
        {currentView === 'profile' && <ProfileView />}
        {currentView === 'settings' && (
          <div className="max-w-2xl mx-auto p-6 pb-20">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Configuración</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium">Notificaciones</span>
                  <button className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </button>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium">Sonidos</span>
                  <button className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </button>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium">Modo Oscuro</span>
                  <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {currentView !== 'lesson' && <BottomNav />}
    </div>
  );
};

export default LenguaVivaApp;