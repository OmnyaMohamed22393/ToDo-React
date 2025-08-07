import './App.css'
import Button from '@mui/material/Button';
import Material from './Material';
import TodoList from './components/TodoList';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TodosContext } from './contexts/todosContext';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Alexandria',
      // 'Arial',
      // 'Roboto',
    ]
  },
  palette: {}
});

const initialTodos = [
  { id: uuidv4(), title: "First Todo", details: "Description of First Todo", isCompleted: false },
  { id: uuidv4(), title: "Second Todo", details: "Description of Second Todo", isCompleted: false },
  { id: uuidv4(), title: "Third Todo", details: "Description of Third Todo", isCompleted: false }
];


function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#90caf9", padding: "20px 0" }}>
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>

        {/* <Button variant="contained" style={{background: "#ff8f00"}}>Hello world</Button> */}
        {/* <Material /> */}
      </div>
    </ThemeProvider>
  )
}

export default App
