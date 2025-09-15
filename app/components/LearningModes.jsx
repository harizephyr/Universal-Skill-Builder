'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Image, Code, GamepadIcon, Play, CheckCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function LearningModes() {
  const [activeMode, setActiveMode] = useState('text')

  const modes = [
    { id: 'text', name: 'Text Guide', icon: FileText, color: 'blue' },
    { id: 'visual', name: 'Visual Flow', icon: Image, color: 'green' },
    { id: 'code', name: 'Code Sandbox', icon: Code, color: 'purple' },
    { id: 'quiz', name: 'Interactive Quiz', icon: GamepadIcon, color: 'orange' }
  ]

  const sampleContent = {
    text: `# Git Basics: Your First Repository

## What is Git?
Git is a distributed version control system that tracks changes in your code over time. Think of it as a time machine for your projects!

## Step 1: Initialize a Repository
\`\`\`bash
git init my-project
cd my-project
\`\`\`

## Step 2: Add Your First File
\`\`\`bash
echo "Hello World" > README.md
git add README.md
\`\`\`

## Step 3: Make Your First Commit
\`\`\`bash
git commit -m "Initial commit"
\`\`\`

🎉 Congratulations! You've created your first Git repository.`,

    visual: [
      { title: 'Initialize Repository', description: 'Create a new Git repository', status: 'completed' },
      { title: 'Add Files', description: 'Stage files for commit', status: 'current' },
      { title: 'Make Commit', description: 'Save changes to history', status: 'pending' },
      { title: 'Push to Remote', description: 'Share with others', status: 'pending' }
    ],

    code: `// Interactive Git Simulation
class GitRepository {
  constructor(name) {
    this.name = name;
    this.commits = [];
    this.stagedFiles = [];
  }

  add(filename) {
    this.stagedFiles.push(filename);
    console.log(\`Added \${filename} to staging area\`);
  }

  commit(message) {
    const commit = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      files: [...this.stagedFiles],
      timestamp: new Date()
    };
    this.commits.push(commit);
    this.stagedFiles = [];
    console.log(\`Committed: \${message}\`);
    return commit;
  }

  log() {
    return this.commits.reverse();
  }
}

// Try it out!
const repo = new GitRepository('my-project');
repo.add('README.md');
repo.commit('Initial commit');
console.log(repo.log());`,

    quiz: [
      {
        question: "What command initializes a new Git repository?",
        options: ["git start", "git init", "git create", "git new"],
        correct: 1,
        explanation: "git init creates a new Git repository in the current directory."
      },
      {
        question: "What does 'git add' do?",
        options: ["Commits changes", "Stages files", "Pushes to remote", "Creates branch"],
        correct: 1,
        explanation: "git add stages files, preparing them for the next commit."
      },
      {
        question: "What's the purpose of a commit message?",
        options: ["Decoration", "Describe changes", "Set author", "Create tags"],
        correct: 1,
        explanation: "Commit messages describe what changes were made in that commit."
      }
    ]
  }

  const [quizAnswers, setQuizAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    const newAnswers = [...quizAnswers]
    newAnswers[questionIndex] = answerIndex
    setQuizAnswers(newAnswers)
  }

  const submitQuiz = () => {
    setShowResults(true)
  }

  const renderContent = () => {
    switch (activeMode) {
      case 'text':
        return (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                code({className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  const isInline = !className || !match
                  return !isInline ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match?.[1] || 'text'}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {sampleContent.text}
            </ReactMarkdown>
          </div>
        )

      case 'visual':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Git Workflow Visualization</h3>
            {sampleContent.visual.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center p-4 rounded-lg border-2 ${
                  step.status === 'completed' ? 'bg-green-50 border-green-200' :
                  step.status === 'current' ? 'bg-blue-50 border-blue-200' :
                  'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                  step.status === 'completed' ? 'bg-green-500' :
                  step.status === 'current' ? 'bg-blue-500' :
                  'bg-gray-300'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-white font-bold">{index + 1}</span>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )

      case 'code':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Interactive Code Sandbox</h3>
              <button className="btn-secondary flex items-center">
                <Play className="w-4 h-4 mr-2" />
                Run Code
              </button>
            </div>
            <SyntaxHighlighter
              language="javascript"
              style={tomorrow}
              className="rounded-lg"
            >
              {sampleContent.code}
            </SyntaxHighlighter>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <div>$ node git-simulation.js</div>
              <div>Added README.md to staging area</div>
              <div>Committed: Initial commit</div>
              <div>[{`{ id: 'abc123', message: 'Initial commit', files: ['README.md'] }`}]</div>
            </div>
          </div>
        )

      case 'quiz':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-6">Test Your Knowledge</h3>
            {sampleContent.quiz.map((question, qIndex) => (
              <div key={qIndex} className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold mb-4">
                  Question {qIndex + 1}: {question.question}
                </h4>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <label key={oIndex} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={oIndex}
                        onChange={() => handleQuizAnswer(qIndex, oIndex)}
                        className="mr-3"
                      />
                      <span className={
                        showResults ? (
                          oIndex === question.correct ? 'text-green-600 font-semibold' :
                          quizAnswers[qIndex] === oIndex ? 'text-red-600' : ''
                        ) : ''
                      }>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                {showResults && (
                  <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                    <p className="text-sm text-blue-800">{question.explanation}</p>
                  </div>
                )}
              </div>
            ))}
            {!showResults && (
              <button onClick={submitQuiz} className="btn-primary">
                Submit Quiz
              </button>
            )}
            {showResults && (
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800">
                  Score: {quizAnswers.filter((answer, index) => answer === sampleContent.quiz[index].correct).length} / {sampleContent.quiz.length}
                </h4>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold gradient-text mb-2">Multi-Modal Learning</h3>
        <p className="text-gray-600">Experience the same lesson through different learning modes</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
              activeMode === mode.id
                ? `bg-${mode.color}-500 text-white shadow-lg`
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <mode.icon className="w-4 h-4 mr-2" />
            {mode.name}
          </button>
        ))}
      </div>

      <motion.div
        key={activeMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 border border-gray-200 min-h-[400px]"
      >
        {renderContent()}
      </motion.div>
    </div>
  )
}