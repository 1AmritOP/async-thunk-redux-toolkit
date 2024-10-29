import './App.css'
import Create from './components/Create'


import {BrowserRouter,Route,Routes} from "react-router-dom"
import Read from './components/Read'
import Navbar from './components/Navbar'
import Update from './components/Update'


function App() {

  return (
    <>
      <BrowserRouter>
      {/* <h1>Amrit</h1> */}
      <Navbar />
        <Routes>
          <Route exact path='/' element={<Create />} />
          <Route exact path='/read' element={<Read />} />
          <Route exact path='/edit/:id' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
