import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ChatProvider } from "./context/chatContext"

import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/theme.css"
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </React.StrictMode>
)