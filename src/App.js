
import React from 'react'
import AuthProvider from './context/AuthProvider'
import Routing from './routes'

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </div>
  )
}

export default App