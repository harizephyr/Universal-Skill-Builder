'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Plus, Trash2, Edit3, Save, FileText, Loader2 } from 'lucide-react'

export default function SpecBuilder() {
  const [specTitle, setSpecTitle] = useState('')
  const [specDescription, setSpecDescription] = useState('')
  const [modules, setModules] = useState([])
  const [editingModule, setEditingModule] = useState(null)
  const [loading, setLoading] = useState(false)
  const [generatedSpec, setGeneratedSpec] = useState('')

  const addModule = () => {
    const newModule = {
      id: Date.now().toString(),
      title: 'New Module',
      description: 'Module description',
      duration: '1 hour',
      difficulty: 'Beginner',
      objectives: ['Learning objective 1']
    }
    setModules([...modules, newModule])
    setEditingModule(newModule.id)
  }

  const updateModule = (id, updates) => {
    setModules(modules.map(module => 
      module.id === id ? { ...module, ...updates } : module
    ))
  }

  const deleteModule = (id) => {
    setModules(modules.filter(module => module.id !== id))
  }

  const addObjective = (moduleId) => {
    const module = modules.find(m => m.id === moduleId)
    if (module) {
      updateModule(moduleId, {
        objectives: [...module.objectives, 'New objective']
      })
    }
  }

  const updateObjective = (moduleId, objectiveIndex, value) => {
    const module = modules.find(m => m.id === moduleId)
    if (module) {
      const newObjectives = [...module.objectives]
      newObjectives[objectiveIndex] = value
      updateModule(moduleId, { objectives: newObjectives })
    }
  }

  const removeObjective = (moduleId, objectiveIndex) => {
    const module = modules.find(m => m.id === moduleId)
    if (module) {
      updateModule(moduleId, {
        objectives: module.objectives.filter((_, index) => index !== objectiveIndex)
      })
    }
  }

  const generateSpec = async () => {
    if (!specTitle.trim() || modules.length === 0) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/generate-spec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: specTitle, 
          description: specDescription, 
          modules 
        })
      })
      
      const data = await response.json()
      setGeneratedSpec(data.spec)
    } catch (error) {
      console.error('Spec generation error:', error)
      // Fallback demo spec
      setGeneratedSpec(`# ${specTitle}

${specDescription}

## Learning Path Overview

${modules.map((module, index) => `
### Module ${index + 1}: ${module.title}
**Duration:** ${module.duration} | **Difficulty:** ${module.difficulty}

${module.description}

**Learning Objectives:**
${module.objectives.map(obj => `- ${obj}`).join('\n')}

**Activities:**
- Interactive exercises
- Code challenges  
- Real-world projects
- Knowledge assessments

---
`).join('')}

## Assessment Criteria
- Completion of all modules
- Practical project implementation
- Peer review participation
- Final capstone project

## Resources
- Interactive code sandbox
- Video tutorials
- Community support
- Mentor guidance`)
    }
    setLoading(false)
  }

  const difficulties = ['Beginner', 'Intermediate', 'Advanced']

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold gradient-text mb-2">Spec Builder</h3>
        <p className="text-gray-600">Create structured learning paths with AI-powered curriculum design</p>
      </div>

      {/* Spec Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Learning Path Title
          </label>
          <input
            type="text"
            value={specTitle}
            onChange={(e) => setSpecTitle(e.target.value)}
            placeholder="e.g., Complete React Development Bootcamp"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={specDescription}
            onChange={(e) => setSpecDescription(e.target.value)}
            placeholder="Describe what learners will achieve..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Learning Modules</h4>
          <button
            onClick={addModule}
            className="btn-secondary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Module
          </button>
        </div>

        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-semibold text-gray-800">Module {index + 1}</h5>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingModule(editingModule === module.id ? null : module.id)}
                  className="p-2 text-gray-500 hover:text-blue-600"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteModule(module.id)}
                  className="p-2 text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {editingModule === module.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={module.title}
                  onChange={(e) => updateModule(module.id, { title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                
                <textarea
                  value={module.description}
                  onChange={(e) => updateModule(module.id, { description: e.target.value })}
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={module.duration}
                    onChange={(e) => updateModule(module.id, { duration: e.target.value })}
                    placeholder="Duration (e.g., 2 hours)"
                    className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  
                  <select
                    value={module.difficulty}
                    onChange={(e) => updateModule(module.id, { difficulty: e.target.value })}
                    className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  >
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Learning Objectives</label>
                    <button
                      onClick={() => addObjective(module.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Objective
                    </button>
                  </div>
                  
                  {module.objectives.map((objective, objIndex) => (
                    <div key={objIndex} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => updateObjective(module.id, objIndex, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => removeObjective(module.id, objIndex)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h6 className="font-medium mb-2">{module.title}</h6>
                <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span>⏱️ {module.duration}</span>
                  <span className={`px-2 py-1 rounded ${
                    module.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    module.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {module.difficulty}
                  </span>
                </div>
                <div>
                  <strong className="text-sm">Objectives:</strong>
                  <ul className="text-sm text-gray-600 mt-1">
                    {module.objectives.map((obj, idx) => (
                      <li key={idx} className="ml-4">• {obj}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Generate Spec */}
      {modules.length > 0 && (
        <div className="text-center">
          <button
            onClick={generateSpec}
            disabled={loading || !specTitle.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Rocket className="w-4 h-4 mr-2" />
            )}
            Generate Learning Spec
          </button>
        </div>
      )}

      {/* Generated Spec */}
      {generatedSpec && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Generated Learning Specification
            </h4>
            <button className="btn-secondary flex items-center">
              <Save className="w-4 h-4 mr-2" />
              Save Spec
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
              {generatedSpec}
            </pre>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">AI</div>
          <div className="text-sm text-gray-600">Curriculum Design</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">Adaptive</div>
          <div className="text-sm text-gray-600">Learning Paths</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">Export</div>
          <div className="text-sm text-gray-600">Ready Specs</div>
        </div>
      </div>
    </div>
  )
}