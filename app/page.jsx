'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, BookOpen, Code, Zap, Languages, Brain, Rocket, Star } from 'lucide-react'
import SkillTranslator from './components/SkillTranslator'
import LearningModes from './components/LearningModes'
import WorkflowGenerator from './components/WorkflowGenerator'
import SpecBuilder from './components/SpecBuilder'

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(null)

  const features = [
    {
      id: 'translator',
      title: 'Skill Translator',
      description: 'Translate any skill into your preferred language and learning style',
      icon: Languages,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'modes',
      title: 'Multi-Modal Learning',
      description: 'Learn through text, visuals, code, and interactive exercises',
      icon: Brain,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'workflow',
      title: 'Workflow Generator',
      description: 'Auto-generate practice projects and real-world applications',
      icon: Zap,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'spec',
      title: 'Spec Builder',
      description: 'Create structured learning paths with AI-powered curriculum',
      icon: Rocket,
      color: 'from-orange-500 to-red-500'
    }
  ]

  const renderActiveFeature = () => {
    switch (activeFeature) {
      case 'translator':
        return <SkillTranslator />
      case 'modes':
        return <LearningModes />
      case 'workflow':
        return <WorkflowGenerator />
      case 'spec':
        return <SpecBuilder />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Globe className="w-12 h-12 text-blue-600 mr-4" />
              <h1 className="text-5xl font-bold gradient-text">
                Universal Skill Translator
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform any skill into personalized, interactive, multi-language learning journeys. 
              Powered by Kiro's AI-driven development environment.
            </p>
            <div className="flex items-center justify-center space-x-4 mb-12">
              <div className="flex items-center text-sm text-gray-500">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <BookOpen className="w-4 h-4 text-green-500 mr-1" />
                <span>Multi-Modal</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Code className="w-4 h-4 text-blue-500 mr-1" />
                <span>Spec-Driven</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 gradient-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Four Powerful Learning Features
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card rounded-xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                  activeFeature === feature.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Active Feature Display */}
          {activeFeature && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-xl p-8"
            >
              {renderActiveFeature()}
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">
            Built with Next.js 15 & powered by Kiro's AI-driven development environment
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Universal Skill Translator - Making knowledge accessible to everyone, everywhere
          </p>
        </div>
      </footer>
    </div>
  )
}