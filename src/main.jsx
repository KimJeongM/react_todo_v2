import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'; 
import { CategoryProvider } from './assets/components/CategoryContext';
import { TodoProvider } from './assets/components/TodoContext';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CategoryProvider>
        <TodoProvider>
            <App />
        </TodoProvider>
      </CategoryProvider>
    </BrowserRouter>
  </StrictMode>,
)
