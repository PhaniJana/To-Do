import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/userContext/UserContext.tsx'
import { TaskContextProvider } from './context/TaskContext/TaskContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <UserContextProvider>
      <TaskContextProvider>
        <App />
      </TaskContextProvider>
    </UserContextProvider>
  </BrowserRouter>
)
