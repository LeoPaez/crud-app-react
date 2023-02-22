import './App.css'

// components
import NavBar from "./components/NavBar"
import AllUsers from "./components/AllUsers"
import AddUser from "./components/AddUser"
import EditUser from "./components/EditUser"
import { TodoProvider } from "./context/Context"

function App() {
  return (
    <div className="App">
      <TodoProvider>
        <NavBar />
        <AllUsers />
      </TodoProvider>
    </div>
  )
}

export default App
