import { useState } from 'react'
import Users from './Users'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Users/>
  )
}

export default App
