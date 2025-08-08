import { v4 as uuidv4 } from 'uuid';

export default function reducer(currentTodos, action) {
    switch (action.type) {
        case 'ADD_TODO': {
            const newTodo = {
                id: uuidv4(),
                title: action.payload.newTitle,
                details: "",
                isCompleted: false
            };
            localStorage.setItem("todos", JSON.stringify([...currentTodos, newTodo]));
            return [...currentTodos, newTodo];

        }

        case 'DELETE_TODO': {
            const updatedTodos = currentTodos.filter((t) => t.id !== action.payload.id);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));

            return updatedTodos;
        }

        case 'UPDATE_TODO': {
            const updatedTodosArr = currentTodos.map((t) => {
                if (t.id === action.payload.id) {
                    return { ...t, title: action.payload.title, details: action.payload.details };
                }
                return t;
            });

            localStorage.setItem("todos", JSON.stringify(updatedTodosArr));
            return updatedTodosArr;
        }

        case 'GET': {
            const storedTodos = localStorage.getItem("todos");
            if (storedTodos && storedTodos.trim() !== "") {
                try {
                    return JSON.parse(storedTodos);
                } catch (error) {
                    console.error("Failed to parse todos from localStorage", error);
                    return [];
                }
            }
            return [];  //////////////////
        }


        default: {
            throw Error("Unknown Action " + action.type);
        }
    }
}