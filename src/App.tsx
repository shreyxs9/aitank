import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { ScrollToTop } from './components/shared/ScrollToTop'
import { ArticlePage } from './pages/ArticlePage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { MyArticlesPage } from './pages/MyArticlesPage'
import { WriteArticlePage } from './pages/WriteArticlePage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <WriteArticlePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-articles"
          element={
            <ProtectedRoute>
              <MyArticlesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
