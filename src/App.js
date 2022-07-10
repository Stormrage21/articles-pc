import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/layout'
import Login from '@/pages/login'

import React from 'react'
import './index.scss'
function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Layout />}>layout</Route>
          <Route path='/login' element={<Login />}>loghin</Route>
        </Routes>

      </div>
    </BrowserRouter>
  )
}





export default App
