import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import { AllPosts, OnePost } from './components'


const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route component={AllPosts} path="/" exact />
        <Route component={OnePost} path="/:slug" exact />
      </div>
    </BrowserRouter>
  )
}

export default App
