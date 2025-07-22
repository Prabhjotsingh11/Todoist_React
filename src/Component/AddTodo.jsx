import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../Features/todoslice";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const username=localStorage.getItem('username');

  const token = localStorage.getItem("token");

  const handleAddTodo = async (e) => {
    e.preventDefault();

    const newTodo = {
      username,
      title,
      description,
    };

    try {
      const response = await fetch("/api/createTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        const savedTodo = await response.json();
        dispatch(addTodo(savedTodo));
        setTitle("");
        setDescription("");
      } else {
        console.error("Failed to add todo");
        alert('Login Again');
      }
    } catch (err) {
      console.error("Error adding todo:", err);
      alert('Login Again');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
  <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Add Todo</h2>
  <form onSubmit={handleAddTodo}>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
      />
    </div>
    <button
      type="submit"
      className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
    >
      Add Todo
    </button>
  </form>
</div>

  );
};

export default AddTodo;
