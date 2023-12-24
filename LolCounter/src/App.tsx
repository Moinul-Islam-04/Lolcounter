import { useState } from 'react'

import './App.css'
import { Searchbar } from './components/Searchbar'
import ResponseArea from './components/ResponseArea'

function App() {

  return (
    <div className="App">
      
      <div className="Search-bar-container">
        <h2>Your champion</h2>
        <Searchbar></Searchbar>
      </div>
      <div className='Response-Area-container'>
      <ResponseArea></ResponseArea>
      </div>
       
      <div className="Search-bar-container">
        <h2>Enemy champion</h2>
        <Searchbar></Searchbar>
      
      </div>

    </div>

    

  )
}

export default App
