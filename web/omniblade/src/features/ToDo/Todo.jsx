import React, { useState } from "react";

const TodoBrutal = () => {
	const [todos, setTodos] = useState([
		{ text: "Write code", done: false },
		{ text: "Debug app", done: false }
	]);
	const [input, setInput] = useState("");

	const addTodo = () => {
		if (input.trim()) {
			setTodos([...todos, { text: input.trim(), done: false }]);
			setInput("");
		}
	};

	const toggleDone = (index) => {
		const newTodos = [...todos];
		newTodos[index].done = !newTodos[index].done;
		// Move completed to bottom
		newTodos.sort((a, b) => a.done - b.done);
		setTodos(newTodos);
	};

	return (
		<div className='neobrutal max-w-md mx-auto mt-10'>
			<h1 className='text-lg mb-4'>📝 TODO LIST</h1>
			<div className='flex mb-4'>
				<input className='flex-1 px-2 py-1 text-xs border border-black' type='text' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Add a task' />
				<button className='btn-brutal ml-2' onClick={addTodo}>
					Add
				</button>
			</div>
			<ul className='space-y-2'>
				{todos.map((todo, index) => (
					<li key={index} className='flex items-center text-xs'>
						<input type='checkbox' checked={todo.done} onChange={() => toggleDone(index)} className='mr-2' />
						<span className={`transition-all ${todo.done ? "line-through text-gray-500" : ""}`}>{todo.text}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoBrutal;
