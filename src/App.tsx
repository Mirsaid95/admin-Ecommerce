import { Route, Routes } from "react-router-dom"
import { MainLayout } from "./layout"
import { Routers } from "./Routes/router"
import { Login } from "./auth/login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<MainLayout />}>
        {Routers.map(({ component: Element, id, path }) => (
          <Route 
            index={path ? false : true}
            key={id}
            path={path}
            element={<Element />} 
          />
        ))}
      </Route>
    </Routes>
  )
}

export default App
