import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CalculatorBase from './components/calculator/CalculatorBase'
import PremiumCalculator from './components/premium/PremiumCalculator'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<CalculatorBase />} />
            <Route path="/premium" element={<PremiumCalculator />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App