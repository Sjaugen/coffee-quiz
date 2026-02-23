'use client'

import { useState } from 'react'
import Image from 'next/image'

const PERSONALITIES = [
  {
    id: 'bold',
    name: 'The Bold Adventurer',
    coffee: 'Single Origin Espresso',
    tagline: 'Pure, intense, and unapologetically you.',
    image: '/espresso.jpg',
  },
  {
    id: 'creative',
    name: 'The Creative Explorer',
    coffee: 'Ethiopian Pour Over',
    tagline: 'Thoughtful, nuanced, always curious.',
    image: '/pour-over.jpg',
  },
  {
    id: 'social',
    name: 'The Social Connector',
    coffee: 'Caramel Oat Latte',
    tagline: 'Warm, sweet, and always there for others.',
    image: '/caramel-latte.jpg',
  },
  {
    id: 'calm',
    name: 'The Calm Minimalist',
    coffee: 'Oat Milk Americano',
    tagline: 'Simple, balanced, mindfully crafted.',
    image: '/oat-americano.jpg',
  },
]

const QUESTIONS = [
  {
    text: "It's Saturday morning. What's your ideal start?",
    answers: [
      { text: 'Up before sunrise, already on your second task', personality: 'bold' },
      { text: 'Journaling with lo-fi beats and soft light', personality: 'creative' },
      { text: 'Brunch plans with friends — the more the merrier', personality: 'social' },
      { text: 'Slow morning, no plans, nowhere to be', personality: 'calm' },
    ],
  },
  {
    text: 'Which movie genre fits your soul?',
    answers: [
      { text: 'Action — fast, high-stakes, no time to waste', personality: 'bold' },
      { text: "Indie drama with a twist you didn't see coming", personality: 'creative' },
      { text: 'Rom-com — laugh, cry, feel all the feelings', personality: 'social' },
      { text: 'Documentary about nature or minimalism', personality: 'calm' },
    ],
  },
  {
    text: "What's your approach to a new city?",
    answers: [
      { text: 'Hit the highest viewpoint first thing', personality: 'bold' },
      { text: 'Wander with no map, find hidden gems', personality: 'creative' },
      { text: 'Ask locals for their favorite spots', personality: 'social' },
      { text: 'Find one great café and read for hours', personality: 'calm' },
    ],
  },
  {
    text: 'How do you handle a big decision?',
    answers: [
      { text: 'Make it fast and commit fully', personality: 'bold' },
      { text: 'Research deeply, then trust your gut', personality: 'creative' },
      { text: 'Talk it through with everyone you trust', personality: 'social' },
      { text: 'Sit with it until the answer feels obvious', personality: 'calm' },
    ],
  },
  {
    text: 'Your go-to playlist for a long drive?',
    answers: [
      { text: 'High-energy anthems, full volume', personality: 'bold' },
      { text: 'Curated mix of genres you discovered yourself', personality: 'creative' },
      { text: 'Throwback hits everyone can sing along to', personality: 'social' },
      { text: 'Ambient instrumental, windows down', personality: 'calm' },
    ],
  },
  {
    text: 'Pick your spirit workspace:',
    answers: [
      { text: 'Standing desk, multiple monitors, always moving', personality: 'bold' },
      { text: 'Cozy corner with mood lighting and plants', personality: 'creative' },
      { text: 'Open office — energy from people around you', personality: 'social' },
      { text: 'Minimalist setup, everything in its place', personality: 'calm' },
    ],
  },
]

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(-1)
  const [scores, setScores] = useState<Record<string, number>>({
    bold: 0,
    creative: 0,
    social: 0,
    calm: 0,
  })

  function handleAnswer(personalityId: string) {
    const newScores = { ...scores, [personalityId]: scores[personalityId] + 1 }
    setScores(newScores)
    setCurrentQuestion(currentQuestion + 1)
  }

  function handleRetake() {
    setCurrentQuestion(-1)
    setScores({ bold: 0, creative: 0, social: 0, calm: 0 })
  }

  function getResult() {
    return PERSONALITIES.reduce((winner, p) =>
      scores[p.id] > scores[winner.id] ? p : winner
    )
  }

  // Intro screen
  if (currentQuestion === -1) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4">
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-12 max-w-lg w-full text-center">
          <p className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] mb-6">Basecamp Coffee</p>
          <h1 className="text-white text-4xl font-bold leading-tight mb-4">
            What&apos;s Your<br />Coffee Personality?
          </h1>
          <p className="text-zinc-400 text-base mb-10">
            6 questions. One perfect cup waiting for you.
          </p>
          <button
            onClick={() => setCurrentQuestion(0)}
            className="bg-[#c8a96e] text-black font-bold text-sm uppercase tracking-widest px-10 py-4 rounded-full hover:bg-[#d4b87a] transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    )
  }

  // Results screen
  if (currentQuestion === QUESTIONS.length) {
    const result = getResult()
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4">
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden max-w-lg w-full">
          <div className="relative w-full h-64">
            <Image
              src={result.image}
              alt={result.coffee}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
          </div>
          <div className="p-10 text-center">
            <p className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] mb-3">Your Personality</p>
            <h2 className="text-white text-3xl font-bold mb-2">{result.name}</h2>
            <p className="text-[#c8a96e] text-lg font-medium mb-3">{result.coffee}</p>
            <p className="text-zinc-400 text-sm mb-10">{result.tagline}</p>
            <button
              onClick={handleRetake}
              className="border border-[#c8a96e] text-[#c8a96e] font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:bg-[#c8a96e] hover:text-black transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Question screen
  const question = QUESTIONS[currentQuestion]
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4">
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-10 max-w-lg w-full">
        {/* Progress bars */}
        <div className="flex gap-1.5 mb-8">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 rounded-full transition-colors ${
                i < currentQuestion
                  ? 'bg-[#c8a96e]'
                  : i === currentQuestion
                  ? 'bg-[#c8a96e] opacity-60'
                  : 'bg-[#2a2a2a]'
              }`}
            />
          ))}
        </div>
        <p className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] mb-4">
          Question {currentQuestion + 1} of {QUESTIONS.length}
        </p>
        <h2 className="text-white text-2xl font-bold mb-8 leading-snug">
          {question.text}
        </h2>
        <div className="flex flex-col gap-3">
          {question.answers.map((answer, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(answer.personality)}
              className="flex items-start gap-4 p-4 border border-[#2a2a2a] rounded-xl text-left text-zinc-400 hover:border-[#c8a96e] hover:text-white hover:bg-[#1a1a1a] transition-colors"
            >
              <span className="text-[#c8a96e] text-xs font-bold tracking-widest mt-0.5 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm leading-relaxed">{answer.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
