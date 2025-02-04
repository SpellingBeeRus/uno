import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Home from './pages/Home'
import Game from './pages/Game'

function App() {
  return (
    <ChakraProvider>
      <Router basename="/uno">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:roomId" element={<Game />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
