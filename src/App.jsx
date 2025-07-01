import HomePage from './Pages/HomePage';
import { Route,Routes } from 'react-router-dom'
import AboutUs from './Pages/AboutUs';
import NotFound from './Pages/NotFound';
import Positioning from './Pages/Positioning';
import SignUp from './Pages/SignUp';
const App = () => {
  return (
    <>
     <Routes>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path='/about' element={<AboutUs/>}> </Route>
        <Route path='*' element={<NotFound/>}></Route>
        <Route path='/position' element={<Positioning/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
    </Routes>
    </>
  )
}
export default App
