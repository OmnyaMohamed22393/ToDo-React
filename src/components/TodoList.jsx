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
import { useState, useEffect, useMemo, useReducer } from 'react';
import { TodosContext } from '../contexts/todosContext';
import { useToast } from '../contexts/ToastContext';
import todosReducer from '../reducers/todosReducer';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function TodoList() {

    const [todos, dispatchTodos] = useReducer(todosReducer, []);
    const { showHideToast } = useToast();

    const [titleInput, setTitleInput] = useState("");
    const [displayedTodos, setDisplayedTodos] = useState("all");
    // const [detailsInput, setDetailsInput] = useState("");

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [dialogTodo, setDialogTodo] = useState(null);
    const [updatedTodo, setUpdatedTodo] = useState({ title: '', details: '' });

    // Memoize the completedTodos and notCompletedTodos to avoid unnecessary recalculations
    // Filter todos based on the selected type
    const completedTodos = useMemo(() => {
        return todos.filter((todo) => {
            return todo.isCompleted;
        });
    }, [todos]);

    const notCompletedTodos = useMemo(() => {
        return todos.filter((todo) => !todo.isCompleted);
    }, [todos]);

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

    useEffect(() => {
        // Load todos from localStorage on initial render
        dispatchTodos({ type: "GET" });
    }, []);


    function changeDisplayedType(e) {
        setDisplayedTodos(e.target.value);
    }

    function handleAddClick() {
        dispatchTodos({ type: "ADD_TODO", payload: {newTitle: titleInput, } });
        setTitleInput(""); // Clear the input field after adding
        showHideToast("ToDo Added Successfully..."); // Show the toast notification
    }

    function openDeleteDialog(todo) {
        setDialogTodo(todo);
        setShowDeleteDialog(true);
    }

    function handleDeleteDialogClose() {
        setShowDeleteDialog(false);
    }

    function handleDeleteConfirm() {
        dispatchTodos({ type: "DELETE_TODO", payload: dialogTodo });
        setShowDeleteDialog(false);
        showHideToast("ToDo Deleted Successfully..."); // Show the toast notification
    }

    function openUpdateDialog(todo) {
        setDialogTodo(todo);
        setUpdatedTodo({ title: todo.title, details: todo.details });
        setShowUpdateDialog(true);
    }

        function handleUpdateClose() {
        setShowUpdateDialog(false);
    }

    function handleUpdateConfirm() {
        dispatchTodos({ type: "UPDATE_TODO", payload: {...dialogTodo, ...updatedTodo } })
        setShowUpdateDialog(false);
        showHideToast("ToDo Updated Successfully..."); // Show the toast notification
    }

    const todosJsx = todosToBeRendered.map((todo) => {
        return (
            <Todo key={todo.id} todo={todo} showDelete={openDeleteDialog}  showUpdate={openUpdateDialog} />
        );
    });

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
                        id="update-title"
                        label="ToDo Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updatedTodo.title}
                        onChange={(e) => setUpdatedTodo({ ...updatedTodo, title: e.target.value })}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="update-details"
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
                                }} style={{ width: "100%" }} />
                            </Grid>
                            <Grid size={4} display="flex" justifyContent="space-around" alignItems="center">
                                <Button variant="contained" style={{ width: "100%", height: "100%" }} onClick={() => { handleAddClick(); }} disabled={titleInput.length == 0} >ADD</Button>
                            </Grid>
                        </Grid>
                        {/* Input + Add Button */}
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
