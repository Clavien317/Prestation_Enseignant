import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import App from './App.jsx'
import './index.css'
import Liste from './pages/Liste.jsx'
import Ajout from './pages/Ajout.jsx'
import Modification from './pages/Modification.jsx'



const router = createBrowserRouter(
  [
    {
      path:"/",
      element: <App />
    },
    {
      path:"/liste",
      element: <Liste />
    },
    {
      path:"/add_enseignant",
      element: <Ajout />
    },
    {
      path:"/modification/:id",
      element:<Modification />
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
