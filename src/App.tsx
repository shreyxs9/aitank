import { Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/shared/ScrollToTop'
import { ArticlePage } from './pages/ArticlePage'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
      </Routes>
    </>
  )
}

export default App
