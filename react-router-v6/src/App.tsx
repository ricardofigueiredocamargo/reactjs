import { NavLink, Route, Routes, useLocation } from "react-router-dom"
import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"
import { BookRoutes } from "./BookRoutes"
import './styles.css'

function App() {
  const location = useLocation()
  
  return (
    <>
    <Routes location="/books">
      <Route path='/books' element={<h1>Extra Content</h1>} />
    </Routes >
    <nav>
      <ul>
        <li>
          <NavLink 
            to='/' 
            style={({ isActive }) => {
              return isActive ? { color: 'red' } : {}
            }}
            
          >
            {({ isActive }) => {
              return isActive ? "Active Home" : "Home"
            }}
          </NavLink>
        </li>
        <li>
          <NavLink to='/books' end>
            Books
          </NavLink>
        </li>
      </ul>
    </nav>
    {location.state}
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/books/*" element={<BookRoutes />} />
      {/* <Route path="/books" element={<BookLayout />}>
        <Route index element={<BookList />} />
        <Route path=':id' element={<Book />} />
        <Route path='new' element={<NewBook />} />
      </Route> */}
      {/* <Route path='/books' element={<BookList />} />
      <Route path='/books/:id' element={<Book />} />
      <Route path='/books/new' element={<NewBook />} /> */}
      <Route path="*" element={<NotFound />}/>
    </Routes >
    </>
  )
}

export default App
