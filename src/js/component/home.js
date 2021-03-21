import React, { useState, useEffect } from "react";

//create your first component
export function Home() {
	const [Searched, setSearched] = useState(false);
	const [inputSearch, SetSearchValue] = useState("");
	const [inputValue, SetInputValue] = useState("");
	const [list, setList] = useState([]);

	//const [arrayList, Add]
	let URL = "https://assets.breatheco.de/apis/fake/todos/user/" + inputSearch;

	async function CreateUser() {
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify([]);

		let requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		const response = await fetch(URL, requestOptions)
			.then(res => {
				if (res.status == 200) {
					SearchTodoList();
				}
			})
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	}

	async function SearchTodoList() {
		//console.log(inputSearch);

		let requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		const response = await fetch(URL, requestOptions)
			.then(res => {
				if (res.status == 404) {
					CreateUser();
				} else {
					return res.json();
				}
			})
			.catch(error => console.log("error", error));

		setList(response);
		setSearched(true);
		console.log(response);
	}

	async function UpdateTodo(newarray) {
		console.log(newarray);
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify(newarray);

		let requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		const response = await fetch(URL, requestOptions)
			.then(res => {
				if (res.status == 200) {
					SearchTodoList();
				}
			})
			.catch(error => console.log("error", error));
	}

	async function DeleteTodo() {
		let requestOptions = {
			method: "DELETE",
			redirect: "follow"
		};

		const response = await fetch(URL, requestOptions)
			.then(res => {
				if (res.status == 200) {
					setSearched(false);
					SetInputValue("");
					return res;
				}
			})
			.catch(error => console.log("error", error));

		SetInputValue("");
		console.log(response);
	}

	const Addtodo = e => {
		//SetInputValue(src);
		if (e.key === "Enter") {
			const newList = list.concat({ label: inputValue, done: false });
			UpdateTodo(newList);
			SetInputValue("");
		}
	};

	function RemoveTodo(e) {
		const newList = list.filter(item => item !== e);
		//console.log(newList.length);
		if (newList.length == 0) {
			DeleteTodo();
		} else {
			UpdateTodo(newList);
		}
	}

	const List = () => {
		if (list == undefined) {
			return (
				<div>
					<p>No tasks, add a task</p>
				</div>
			);
		} else {
			return (
				<div>
					<ul className="list-group">
						{list.map((item, id) => (
							<li
								className="list-group-item d-flex justify-content-between align-items-center"
								key={id}>
								{item.label}
								<button
									onClick={() => RemoveTodo(item)}
									className="btn btn-link">
									<i className="fas fa-times"></i>
								</button>
							</li>
						))}
					</ul>
					<span className="float-left text-muted mt-2">
						{list.length} item left
					</span>
				</div>
			);
		}
	};

	if (!Searched) {
		return (
			<div className="text-center mt-5 justify-content-center">
				<h1>TODO APP - React w Fetch</h1>
				<div className="card cardtodos mx-auto">
					<div className="card-body">
						<div className="input-group mb-3">
							<input
								type="text"
								value={inputSearch}
								className="form-control"
								onChange={e => SetSearchValue(e.target.value)}
								placeholder="UserName"
							/>
							<div className="input-group-append ml-3">
								<button
									type="button"
									onClick={() => SearchTodoList()}>
									Search
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="text-center mt-5 justify-content-center">
				<h1>TODO APP - REACT - FETCH</h1>
				<div className="card cardtodos mx-auto">
					<div className="card-body">
						<div className="input-group mb-3">
							<input
								type="text"
								value={inputSearch}
								className="form-control"
								onChange={e => SetSearchValue(e.target.value)}
								placeholder="UserName"
							/>
							<div className="input-group-append">
								<button
									type="button"
									onClick={() => SearchTodoList()}>
									Search
								</button>
							</div>
						</div>
						<div>
							<div className="input-group mb-3 input-group-lg">
								<input
									type="text"
									className="form-control"
									placeholder="What needs to be done?"
									value={inputValue}
									onChange={e =>
										SetInputValue(e.target.value)
									}
									onKeyUp={Addtodo}
								/>
							</div>
							<List />
						</div>
					</div>
					<div className="card-footer">
						<button type="button" onClick={() => DeleteTodo()}>
							Clear List
						</button>
					</div>
				</div>
			</div>
		);
	}
}
