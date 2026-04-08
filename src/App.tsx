import { Route, Routes } from 'react-router-dom'
import { ArticlePage } from './pages/ArticlePage'
import { ComponentsPage } from './pages/ComponentsPage'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/article/:slug" element={<ArticlePage />} />
      <Route path="/components" element={<ComponentsPage />} />
    </Routes>
  )
}

export default App
