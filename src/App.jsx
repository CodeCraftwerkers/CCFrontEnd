import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow pt-24">
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

/*function App() {
  return (
    <>
    
      <NavBar />

    
      <div className="min-h-screen bg-gray-100 pt-24 text-center text-gray-700">
        <h1 className="text-3xl font-semibold">Vista previa del Navbar</h1>
        <p className="mt-2 text-gray-500"></p>
      </div>
    </>
  );
}
  
export default App;
*/

/*
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/events" element={<Events/>}/>
      <Route path="/recover" element={<Recover/>}/>
*/
