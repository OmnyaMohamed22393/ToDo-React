import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './Todo';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState, useContext, useEffect } from 'react';
import { TodosContext } from '../contexts/todosContext';
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {

    const { todos, setTodos } = useContext(TodosContext);
    const [titleInput, setTitleInput] = useState("");
    const [displayedTodos, setDisplayedTodos] = useState("all");
    // const [detailsInput, setDetailsInput] = useState("");

    // Filter todos based on the selected type
    const completedTodos = todos.filter((todo) => todo.isCompleted);
    const notCompletedTodos = todos.filter((todo) => !todo.isCompleted);    

    let todosToBeRendered = todos;

    if (displayedTodos === "completed") {
        todosToBeRendered = completedTodos;
    }
    else if (displayedTodos === "non-completed") {
        todosToBeRendered = notCompletedTodos;
    }
    else {
        todosToBeRendered = todos;
    }

    const todosJsx = todosToBeRendered.map((todo) => {
        return (
            <Todo key={todo.id} todo={todo} />
        );
    });

    useEffect(() => {
        // Load todos from localStorage on initial render
        const storedTodos = localStorage.getItem("todos") ?? [];
        if (storedTodos) {
            try {
                setTodos(JSON.parse(storedTodos));
            } catch (error) {
                setTodos(JSON.parse([]));
                console.error("Failed to parse todos from localStorage", error);
            }
        }
    }, []);

    function changeDisplayedType(e) {
        setDisplayedTodos(e.target.value);
    }

    function handleAddClick() {
        const newTodo = {
            id: uuidv4(),
            title: titleInput,
            details: "",
            isCompleted: false
        }
        setTodos([...todos, newTodo]);
        localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
        setTitleInput(""); // Clear the input field after adding
    }

    return (
        <Container maxWidth="sm">
            <Card sx={{ minWidth: 275 }} style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <CardContent>
                    <Typography gutterBottom variant='h2' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                        My To Do List
                    </Typography>
                    <Divider />

                    {/* Filter Buttons */}
                    <ToggleButtonGroup
                        style={{ marginTop: "20px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}
                        color="primary"
                        value={displayedTodos}
                        exclusive
                        onChange={changeDisplayedType}
                        aria-label="Platform"
                    >
                        <ToggleButton value="all">All</ToggleButton>
                        <ToggleButton value="completed">Completed</ToggleButton>
                        <ToggleButton value="non-completed">Not Completed</ToggleButton>
                    </ToggleButtonGroup>

                    {/* <Todo /> */}
                    {todosJsx}

                    {/* Filter Buttons */}

                    {/* Input + Add Button */}
                    <Grid container spacing={2} style={{ marginTop: "20px" }}>
                        <Grid size={8} display="flex" justifyContent="space-around" alignItems="center">
                            <TextField id="outlined-basic" label="Todo Title" variant="outlined" value={titleInput} onChange={(e) => {
                                setTitleInput(e.target.value);
                            }} style={{ width: "100%"}}/>
                        </Grid>
                        <Grid size={4} display="flex" justifyContent="space-around" alignItems="center">
                            <Button variant="contained" style={{ width: "100%", height: "100%"}} onClick={() => { handleAddClick();}} disabled={titleInput.length == 0} >ADD</Button>
                        </Grid>
                    </Grid>
                    {/* Input + Add Button */}
                </CardContent>
            </Card>
        </Container>
    );
}
