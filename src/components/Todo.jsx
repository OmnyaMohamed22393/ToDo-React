import { Card, CardContent, IconButton, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import React from 'react'
import { useContext } from 'react';
import { TodosContext } from '../contexts/todosContext';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';


export default function Todo({ todo }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [updatedTodo, setUpdatedTodo] = useState({title: todo.title, details: todo.details});
    const { todos, setTodos } = useContext(TodosContext);

    function handleCheckClick() {
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id) {
                t.isCompleted = !t.isCompleted;
            }
            return t;
        });
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

    }

    function handleDeleteClick() {
        setShowDeleteDialog(true);
    }
    function handleUpdateClick() {
        setShowUpdateDialog(true);
    }

    function handleDeleteDialogClose() {
        setShowDeleteDialog(false);
    }
    function handleUpdateClose() {
        setShowUpdateDialog(false);
    }

    function handleDeleteConfirm() {
        const updatedTodos = todos.filter((t) => t.id !== todo.id);
        setTodos(updatedTodos);
        setShowDeleteDialog(false);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
    function handleUpdateConfirm() {
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id) {
                return { ...t, title: updatedTodo.title || todo.title, details: updatedTodo.details || todo.details };
                // t.title = updatedTodo.title || todo.title;
                // t.details = updatedTodo.details || todo.details;
            }
            return t;
        });
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setShowUpdateDialog(false);
        setUpdatedTodo({title: "", details: ""}); // Clear the input fields after updating
    }

    return (
        <>
            {/* Delete Dialog */}
            <Dialog
                open={showDeleteDialog}
                onClose={handleDeleteDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete this ToDo?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You cannot return to this ToDo after deleting it.
                        Please confirm if you want to proceed with the deletion.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} >Close</Button>
                    <Button autoFocus onClick={handleDeleteConfirm}>Yes, Delete it.</Button>
                </DialogActions>
            </Dialog>
            {/* Delete Dialog */}

            {/* Update Dialog */}
            <Dialog
                open={showUpdateDialog}
                onClose={handleUpdateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Update ToDo...
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="ToDo Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updatedTodo.title}
                        onChange={(e) => setUpdatedTodo({ ...updatedTodo, title: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="ToDo Details"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updatedTodo.details}
                        onChange={(e) => setUpdatedTodo({ ...updatedTodo, details: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose} >Close</Button>
                    <Button autoFocus onClick={handleUpdateConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
            {/* Update Dialog */}

            <Card className="todoCard" sx={{ minWidth: 275, background: "#1976d2", color: "#fff", marginTop: "10px" }}>
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
