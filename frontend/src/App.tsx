import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import NotFound from '@/pages/404'
import Navigation from '@/components/nav'
import { Footer } from '@/components/footer'

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />
    </Router>
  )
}

export default App
