import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Update from './pages/Update';
import Change from './pages/Change';
// import Reg2 from './pages/Reg2';

function App() {
  // Define the onChange function here
  function handleChange(value) {
    console.log("CAPTCHA value changed:", value);
    // You can put your logic here for handling the CAPTCHA value change
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Pass onChange function as a prop to Register */}
        <Route path="/" element={<Register onChange={handleChange} />} />
        <Route path='/update' element= {<Update onChange={handleChange}/>}/>
        <Route path='/change' element={<Change/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
