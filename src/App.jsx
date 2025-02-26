import { Route, Routes } from "react-router-dom"
import Home from "./page/Home"
import About from "./page/About"
import Contact from "./page/Contact"
import Navbar from "./components/Navbar"
import { useState } from "react"
import Anime from "./components/anime"
import MovieDetails from "./components/MovieDetails"
import Header from "./components/Header"



function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
      </Routes>
      {/* footer */}
    </>
  )

}

export default App
