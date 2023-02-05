import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Home from "./pages/Home"
import Usuario from "./pages/Usuario"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Registro from "./pages/Registro"
import PantallaPrincipal from "./pages/PantallaPrincipal"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "usuario",
    element: <Usuario/>,
  },
  {
    path: "about",
    element: <About/>,
  },
  {
    path: "contact",
    element: <Contact/>,
  },
  {
    path: "registro",
    element: <Registro/>,
  },
  {
    path: "pantalla_principal/:usuario/:id",
    element: <PantallaPrincipal/>,
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)