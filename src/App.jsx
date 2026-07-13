import Home from "./assets/pages/Home";
import Calendar from "./assets/pages/Calendar";
import Category from "./assets/pages/Category";
import Graph from "./assets/pages/Graph";
import Nav from "./assets/components/Nav";
import { Route, Routes } from "react-router-dom";

function App(){
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/category" element={<Category />} />
                <Route path="/graph" element={<Graph />} />
            </Routes>
            <Nav />
        </>
    );
}

export default App; 