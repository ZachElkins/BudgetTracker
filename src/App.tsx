import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MonthPage from './Pages/Month/MonthPage';
import YearPage from './Pages/Year/YearPage';
import InputPage from "./Pages/Input/InputPage";

const App = () => {
    return(
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/' element={<InputPage/>} />
                    <Route path='/input' element={<InputPage/>} />
                    <Route path='/year' element={<YearPage/>} />
                    <Route path='/month' element={<MonthPage/>} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;
