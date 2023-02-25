import './App.css'

// components
import NavBar from "./components/NavBar"
import AllUsers from "./components/AllUsers"
import { ContextProvider } from "./context/Context"

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <NavBar />
        <AllUsers />
      </ContextProvider>
    </div>
  )
}

export default App
