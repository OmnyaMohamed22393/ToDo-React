import { Card, CardContent, IconButton, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import React from 'react'
import { useContext } from 'react';
import { TodosContext } from '../contexts/todosContext';
import { useToast } from '../contexts/ToastContext';

import Button from '@mui/material/Button';

export default function Todo({ todo, showDelete, showUpdate }) {

    const { todos, setTodos } = useContext(TodosContext);
    const { showHideToast } = useToast();

    function handleCheckClick() {
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id) {
                t.isCompleted = !t.isCompleted;
            }
            return t;
        });
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        showHideToast("ToDo Status Updated SuccessFully...")
    }

    function handleDeleteClick() {
        showDelete(todo);
    }
    function handleUpdateClick() {
        showUpdate(todo);
    }


    return (
        <>
            <Card className="todoCard" sx={{ minWidth: 275, background: "#1976d2", color: "#fff" }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={8}>
                            <Typography variant="h4" style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>{todo.title}</Typography>
                            <Typography variant="h6">{todo.details}</Typography>
                        </Grid>
                        <Grid size={4} display="flex" justifyContent="space-around" alignItems="center">
                            <IconButton onClick={() => { handleCheckClick(); }} className="iconButton" aria-label="done" style={{ background: todo.isCompleted ? "#4caf50" : "#fff", color: todo.isCompleted ? "#fff" : "#4caf50", border: "3px solid #4caf50" }}>
                                <DoneOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={handleUpdateClick} className="iconButton" aria-label="edite" style={{ background: "#fff", color: "#03a9f4", border: "3px solid #03a9f4" }}>
                                <EditOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={handleDeleteClick} className="iconButton" aria-label="delete" style={{ background: "#fff", color: "#e53935", border: "3px solid #e53935" }}>
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}
