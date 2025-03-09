import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile'
import Education from './pages/Education'
import Experience from './pages/Experience'
import Skills from './pages/Skills'
import CVDisplay from './pages/CVDisplay'



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/education' element={<Education />} />
        <Route path='/experience' element={<Experience />} />
        <Route path='/skills' element={<Skills />} />
        <Route path='/cvdisplay' element={<CVDisplay />} /> 
      </Routes>
    </Router>
  )
}

export default App