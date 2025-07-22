import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTodo, completeTodo, deleteTodo } from "../../Features/todoslice"; // Assuming these actions exist in your todoslice

const token = localStorage.getItem("token");
const AllTodo = () => {
  const dispatch = useDispatch();
  const { Todos } = useSelector((state) => state.Todos);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch("/api/getAll", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          dispatch(setTodo(data));
        }
      } catch (err) {
        console.error("Error fetching todos:", err);
        alert("Login Again");
      }
    };

    if (token) fetchTodo();
  }, [dispatch, token]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/deleteTask/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        dispatch(deleteTodo(id));
      } else {
        console.error("Failed to delete todo from the database");
      }
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const handleComplete = async (id) => {
    try {
      const response = await fetch(`/api/status/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedTodo = await response.json();
      if (response.ok) {
        dispatch(completeTodo(updatedTodo));
      } else {
        console.log("Failed to update");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-amber-50 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Your Todos</h2>
      <ul className="space-y-4">
        {Todos.map((todo) => (
          <li
            key={todo.id}
            className="p-4 border-l-4 border-teal-600 bg-white rounded-lg shadow-md"
          >
            <>
              <p
                className={`text-xl font-bold text-teal-700 ${
                  todo.status ? "line-through" : ""
                }`}
              >
                <strong>Title:</strong> {todo.title}
              </p>
              <p
                className={`text-teal-600 ${todo.status ? "line-through" : ""}`}
              >
                <strong>Description:</strong> {todo.description}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {todo.status ? "Completed" : "Not Completed"}
              </p>

              {/* Action Buttons */}
              <div className="flex justify-center items-center space-x-2 mt-4">
                <button
                  onClick={() => handleComplete(todo.id)}
                  className={`px-4 py-2 font-semibold rounded-lg transition-all ${
                    todo.status
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {todo.status ? "Completed" : "Mark Complete"}
                </button>

                <button
                  onClick={() => handleDelete(todo.id)}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTodo;
