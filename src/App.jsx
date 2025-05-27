import { useState } from 'react'
import PricePredictor from './components/PricePredictor'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <PricePredictor />
    </>
  )
}

export default App
