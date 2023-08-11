import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import MonthPage from './Pages/Month/MonthPage';
import YearPage from './Pages/Year/YearPage';

const App = () => {
    return(
        <Router>
            <div className="App">
            <Routes>
                <Route path='/' element={<YearPage/>} />
                <Route path='/year' element={<YearPage/>} />
                <Route path='/month' element={<MonthPage/>} />
            </Routes>
            </div>
        </Router>
    )
}

export default App;
