'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Download, GitBranch, FolderOpen, FileText, Terminal, Loader2 } from 'lucide-react'

export default function WorkflowGenerator() {
  const [skill, setSkill] = useState('')
  const [projectType, setProjectType] = useState('practice')
  const [loading, setLoading] = useState(false)
  const [generatedWorkflow, setGeneratedWorkflow] = useState(null)

  const projectTypes = [
    { id: 'practice', name: 'Practice Project', description: 'Hands-on exercises and challenges' },
    { id: 'real-world', name: 'Real-World Application', description: 'Production-ready project template' },
    { id: 'tutorial', name: 'Step-by-Step Tutorial', description: 'Guided learning experience' },
    { id: 'challenge', name: 'Coding Challenge', description: 'Problem-solving exercises' }
  ]

  const generateWorkflow = async () => {
    if (!skill.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/generate-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skill, projectType })
      })
      
      const data = await response.json()
      setGeneratedWorkflow(data.workflow)
    } catch (error) {
      console.error('Workflow generation error:', error)
      // Fallback demo data
      setGeneratedWorkflow({
        title: `${skill} - ${projectType} Project`,
        description: `A comprehensive ${projectType} project to master ${skill}`,
        structure: [
          { type: 'folder', name: 'src', children: [
            { type: 'file', name: 'index.js', description: 'Main application file' },
            { type: 'file', name: 'utils.js', description: 'Utility functions' }
          ]},
          { type: 'file', name: 'README.md', description: 'Project documentation' },
          { type: 'file', name: 'package.json', description: 'Dependencies and scripts' }
        ],
        tasks: [
          { id: 1, title: 'Set up project structure', completed: false, difficulty: 'Easy' },
          { id: 2, title: 'Implement core functionality', completed: false, difficulty: 'Medium' },
          { id: 3, title: 'Add error handling', completed: false, difficulty: 'Medium' },
          { id: 4, title: 'Write tests', completed: false, difficulty: 'Hard' },
          { id: 5, title: 'Deploy application', completed: false, difficulty: 'Hard' }
        ],
        commands: [
          'npm init -y',
          'npm install express',
          'mkdir src',
          'touch src/index.js',
          'npm start'
        ]
      })
    }
    setLoading(false)
  }

  const [completedTasks, setCompletedTasks] = useState([])

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  const renderFileStructure = (items, level = 0) => {
    return items.map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`flex items-center py-2 ${level > 0 ? 'ml-6' : ''}`}
      >
        {item.type === 'folder' ? (
          <FolderOpen className="w-4 h-4 text-blue-500 mr-2" />
        ) : (
          <FileText className="w-4 h-4 text-gray-500 mr-2" />
        )}
        <span className="font-mono text-sm">{item.name}</span>
        {item.description && (
          <span className="text-xs text-gray-500 ml-2">- {item.description}</span>
        )}
        {item.children && (
          <div className="w-full">
            {renderFileStructure(item.children, level + 1)}
          </div>
        )}
      </motion.div>
    ))
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold gradient-text mb-2">Workflow Generator</h3>
        <p className="text-gray-600">Auto-generate practice projects and real-world applications</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skill to Practice
          </label>
          <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="e.g., React hooks, Node.js APIs, Python web scraping..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Type
          </label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {projectTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={generateWorkflow}
          disabled={loading || !skill.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Zap className="w-4 h-4 mr-2" />
          )}
          Generate Workflow
        </button>
      </div>

      {generatedWorkflow && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Project Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-xl font-semibold mb-2">{generatedWorkflow.title}</h4>
            <p className="text-gray-700">{generatedWorkflow.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* File Structure */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h5 className="font-semibold mb-4 flex items-center">
                <GitBranch className="w-4 h-4 mr-2" />
                Project Structure
              </h5>
              <div className="bg-gray-50 p-4 rounded font-mono text-sm">
                {renderFileStructure(generatedWorkflow.structure)}
              </div>
            </div>

            {/* Tasks Checklist */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h5 className="font-semibold mb-4">Learning Tasks</h5>
              <div className="space-y-3">
                {generatedWorkflow.tasks.map((task) => (
                  <div key={task.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={completedTasks.includes(task.id)}
                      onChange={() => toggleTask(task.id)}
                      className="mr-3 w-4 h-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <span className={completedTasks.includes(task.id) ? 'line-through text-gray-500' : ''}>
                        {task.title}
                      </span>
                      <span className={`ml-2 px-2 py-1 text-xs rounded ${
                        task.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        task.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {task.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Progress: {completedTasks.length} / {generatedWorkflow.tasks.length} tasks completed
              </div>
            </div>
          </div>

          {/* Setup Commands */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h5 className="font-semibold mb-4 flex items-center">
              <Terminal className="w-4 h-4 mr-2" />
              Quick Setup Commands
            </h5>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-1">
              {generatedWorkflow.commands.map((command, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-gray-500 mr-2">$</span>
                  <span>{command}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 justify-center">
            <button className="btn-secondary flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download Project Template
            </button>
            <button className="btn-primary flex items-center">
              <GitBranch className="w-4 h-4 mr-2" />
              Create Git Repository
            </button>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">500+</div>
          <div className="text-sm text-gray-600">Project Templates</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">Auto</div>
          <div className="text-sm text-gray-600">Git Integration</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">Smart</div>
          <div className="text-sm text-gray-600">Task Generation</div>
        </div>
      </div>
    </div>
  )
}