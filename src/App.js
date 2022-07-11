import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/layout'
import Login from '@/pages/login'
import { AuthComponent } from '@/components/AuthComponent'
import React from 'react'
import './index.scss'
function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/*' element={
            <AuthComponent>
              <Layout />
            </AuthComponent>}>
          </Route>
          <Route path='/login' element={<Login />}>loghin</Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}





export default App
