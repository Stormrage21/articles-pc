import { Routes, Route } from 'react-router-dom'
import Layout from './pages/layout'
import Login from '@/pages/login'
import { AuthComponent } from '@/components/AuthComponent'
import React from 'react'
import './index.scss'
import './App.css'
import Publish from './pages/Publish'
import Article from './pages/Article'
import Home from './pages/Home'
import { HistoryRouter, history } from './utils/history'
function App () {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          <Route path='/*' element={
            <AuthComponent>
              <Layout />
            </AuthComponent>}>
            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="publish" element={<Publish />} />
          </Route>
          <Route path='/login' element={<Login />}>loghin</Route>
        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App
