'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Languages, User, BookOpen, Loader2 } from 'lucide-react'

export default function SkillTranslator() {
  const [skill, setSkill] = useState('')
  const [language, setLanguage] = useState('English')
  const [level, setLevel] = useState('Beginner')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Hindi', 'Mandarin', 'Japanese', 'Korean', 'Arabic', 'Russian'
  ]

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

  const handleTranslate = async () => {
    if (!skill.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/translate-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skill, language, level })
      })
      
      const data = await response.json()
      setResult(data.translation)
    } catch (error) {
      console.error('Translation error:', error)
      setResult('Sorry, there was an error translating your skill. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold gradient-text mb-2">Skill Translator</h3>
        <p className="text-gray-600">Transform any skill into your preferred language and learning style</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Languages className="w-4 h-4 inline mr-1" />
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1" />
            Experience Level
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {levels.map(lvl => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <BookOpen className="w-4 h-4 inline mr-1" />
            Learning Style
          </label>
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Step-by-step</option>
            <option>Visual</option>
            <option>Hands-on</option>
            <option>Theory-first</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What skill would you like to learn?
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="e.g., Git basics, React hooks, Python data analysis..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && handleTranslate()}
            />
            <button
              onClick={handleTranslate}
              disabled={loading || !skill.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200"
          >
            <h4 className="font-semibold text-gray-800 mb-3">
              {skill} - {language} ({level} Level)
            </h4>
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
              {result}
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">50+</div>
          <div className="text-sm text-gray-600">Languages Supported</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">1000+</div>
          <div className="text-sm text-gray-600">Skills Available</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">AI</div>
          <div className="text-sm text-gray-600">Powered Translation</div>
        </div>
      </div>
    </div>
  )
}