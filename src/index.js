import deleteIcon from "./assets/icons/header-icons/delete.svg";
import editIcon from "./assets/icons/header-icons/edit.svg";
import addIcon from "./assets/icons/header-icons/add.svg"

import "./style.css"
import {Project} from "./projects.js"
import {Todo} from "./todo.js";

const AppLogicControl = (() => {
	
	const saveOnStorage = (projects) => {
		localStorage.setItem("projects", JSON.stringify(projects))
	}
	const loadFromStorage = () => {
		return JSON.parse(localStorage.getItem("projects"));
	}

	if (localStorage.getItem("projects") === null){
		const defaultPoject = new Project("default");
		console.log(defaultPoject)
		saveOnStorage([defaultPoject]);
	}

	const addDueToProject = (data, subject) => {
		let projects = loadFromStorage();
		const project = projects.find(p => p.subject === subject)
		if (!project) return 
		const todo = new Todo(data.title, data.description, data.dueDate, data.priority)
		projects.todos.push(todo);
		saveOnStorage(projects);
	}

	// create a new project only it didn't already exist
	const createNewProject = (subject) => {
		let projects = loadFromStorage();
		const exist = projects.some(p => p.subject === subject)
		if (exist) return
		const project = new Project(subject)
		projects.push(project);
		saveOnStorage(projects);
	}
	
	const editProject = (subject, newSubject) => {
		const projects = loadFromStorage();
		projects.forEach(project => {
			if (project.subject === subject){
				project.subject = newSubject
				return
			}
		})
		saveOnStorage(projects);
	}
		
	const deleteProject = (subject) => {
		let projects = loadFromStorage();
		projects.forEach((project, index) => {
			if (project.subject === subject){
				projects.splice(index, 1);
				return;
			}
		})
		saveOnStorage(projects);
	}

	const getProjects = () => loadFromStorage();

	return  {addDueToProject, createNewProject, editProject, deleteProject, getProjects}

})();

const AppDomControl = (() => {

	const dialogSection = document.getElementById("dialog-section");
	const addProjectBtn = document.getElementById("sidebar-project-header");
	const sidebarProjects = document.getElementById("sidebar-project-content");
	const projectTodosSection = document.getElementById("project-todos-section");

	const renderProjects = (projects) => {
		sidebarProjects.innerHTML = "";
		projects.forEach(project => {
			const projectBlock = document.createElement("div")
			projectBlock.classList.add("project-block")
			projectBlock.dataset.project = project.subject;

			const obj = document.createElement("div");
			obj.classList.add("side-project");
			obj.dataset.subject = project.subject;
			obj.textContent = project.subject;

			const optionsBlock = document.createElement("div");
			optionsBlock.dataset.option = "";

			const deleteProject = document.createElement("div");
			deleteProject.innerHTML = `<div><img src="${deleteIcon}" class="side-project-delete-option"></div>`

			const editProject = document.createElement("div");
			editProject.innerHTML = `<div><img src="${editIcon}" class="side-project-edit-option"></div>`

			optionsBlock.appendChild(editProject)
			optionsBlock.appendChild(deleteProject)

			projectBlock.appendChild(obj);
			projectBlock.appendChild(optionsBlock)
			sidebarProjects.appendChild(projectBlock);
		})
	}
	renderProjects(AppLogicControl.getProjects())

	const addProject = () => {
		const dialog = document.createElement("dialog");
		dialog.setAttribute("id", "new-project-dialog")
		dialog.innerHTML = `
			<h3>ADD PROJECT</h3>
			<form id="dialog-project-form" method="dialog" style="display:flex; flex-direction:column; gap:10px;">
				<div style="margin: 8px 0px;">
					<label for="subject">Subject:</label><br>
					<input type="text" id="subject" name="subject" required placeholder="Enter project name..." style="width:100%; padding:6px; box-sizing:border-box;">
				</div>
				<div style="display:flex; justify-content:flex-end; gap:10px;">
					<button type="button" id="project-form-cancel-btn">Cancel</button>
					<button type="submit" id="project-form-save-btn">Add Project</button>
				</div>
			</form>
		`;

		dialogSection.innerHTML = "";
		dialogSection.append(dialog)
		dialog.showModal();
		dialog.querySelector("#project-form-cancel-btn").addEventListener("click", () => {
		    dialog.close();
		});
		const dialogForm = dialog.querySelector("#dialog-project-form");
		dialogForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const subject  = dialogForm.elements[0];
			
			AppLogicControl.createNewProject(subject.value)
			renderProjects(AppLogicControl.getProjects())
		    
		    dialog.close();
		    e.target.reset(); // Clear the form
		});
		
	}
	
	const editProject = (oldSubject) => {
		const dialog = document.createElement("dialog");
		dialog.setAttribute("id", "edit-project-dialog")
		dialog.innerHTML = `
			<h3>Edit Project</h3>
			<form id="dialog-project-edit-form" method="dialog" style="display:flex; flex-direction:column; gap:10px;">
				<div style="margin: 8px 0px;">
					<label for="subject">Subject:</label><br>
					<input type="text" id="subject" name="subject" value="${oldSubject}"; required placeholder="Enter project name..." style="width:100%; padding:6px; box-sizing:border-box;">
				</div>
				<div style="display:flex; justify-content:flex-end; gap:10px;">
					<button type="button" id="project-form-cancel-btn">Cancel</button>
					<button type="submit" id="project-form-save-btn">Add Project</button>
				</div>
			</form>
		`;

		dialogSection.innerHTML = "";
		dialogSection.appendChild(dialog)
		dialog.showModal();
		dialog.querySelector("#project-form-cancel-btn").addEventListener("click", () => {
		    dialog.close();
		});

		const dialogForm = document.querySelector("#dialog-project-edit-form");
		dialogForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const subject  = dialogForm.elements[0];
			
			AppLogicControl.editProject(oldSubject ,subject.value)
			renderProjects(AppLogicControl.getProjects())
		    
		    dialog.close();
		    e.target.reset();
		})
	}

	const deleteProject = (subject) => {
		const dialog = document.createElement("dialog");
		dialog.setAttribute("id", "project-delelte-dialog");
		dialog.innerHTML = `
			<h3>Delete The Project</h3>
			<form id="dialog-project-delete-form" method="dialog" style="display:flex; flex-direction:column; gap:10px;">
				<div style="display:flex; justify-content:flex-end; gap:10px;">
					<button type="button" id="project-form-cancel-btn">Cancel</button>
					<button type="submit" id="project-form-delete-btn">Delete</button>
				</div>
			</form>
		`
		dialogSection.innerHTML = "";
		dialogSection.appendChild(dialog);
		dialog.showModal();
		dialog.querySelector("#project-form-cancel-btn").addEventListener("click", () => {
		    dialog.close();
		});
		const dialogForm = document.querySelector("#dialog-project-delete-form");
		dialogForm.addEventListener("submit", (e) => {
			e.preventDefault();
			AppLogicControl.deleteProject(subject);
			renderProjects(AppLogicControl.getProjects());
			dialog.close();
		})
	}

	const addTodo = (subject) => {
		const dialog = document.createElement("dialog");
		dialog.setAttribute("id", "new-todo-dialog")
		dialog.innerHTML = `
			<h3>ADD YOUR TASK</h3>
			<form id="dialog-todo-form" method="dialog" style="display:flex; flex-direction:column; gap:10px;">
				<div style="margin: 8px 0px;">
					<label for="title">Project Name:</label><br>
					<input type="text" id="title" name="title" required placeholder="Enter project name..." style="width:100%; padding:6px; box-sizing:border-box;">
				</div>
				<div>
					<label for="description">Description (Optional):</label><br>
					<textarea id="description" name="description" placeholder="Enter details..." style="width:100%; padding:6px; box-sizing:border-box;"></textarea>
				</div>
				<div>
					<label for="dueDate">Set a date</label><br>
					<input id="dueDate" name="dueDate" type="date" style="width:100%; padding:6px; box-sizing:border-box;">
				</div>
				<div>
				<label for="priority">Priority</label><br>
				<select id="priority" name="priority" style="width:100%; padding:6px; box-sizing:border-box;">
					<option value="low">Low</option>
					<option value="medium" selected>Medium</option>
					<option value="high">High</option>
				</select>
				</div>
				<div style="display:flex; justify-content:flex-end; gap:10px;">
					<button type="button" id="todo-form-cancel-btn">Cancel</button>
					<button type="submit" id="todo-form-save-btn">Add Project</button>
				</div>
			</form>
		`;

		// Append it to your document body so it can be used
		dialogSection.appendChild(dialog);

		dialog.showModal();

		// Example handling for the cancel button
		dialog.querySelector("#todo-form-cancel-btn").addEventListener("click", () => {
		    dialog.close();
		});

		// Example handling for form submission
		const dialogForm = dialog.querySelector("#dialog-todo-form");
		dialogForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const { title, description, dueDate, priority } = dialogForm.elements;
			const data = {
				title: title.value,
				description: description.value,
				dueDate: dueDate.value,
				priority: priority.value,
			};
		    
		    // TODO: Add your logic here to save the project to your Todo list array/storage
			AppLogicControl.addDueToProject(data, subject)
			renderTodos(subject)
		    
		    dialog.close();
		    e.target.reset(); // Clear the form
		});
	}	

	const editTodo = () => {

	}
	const renderTodos = (project) => {
		projectTodosSection.innerHTML = `
			<div class="todo-header">
				<h2 class="todos-title">${escapeHTML(project.subject)}</h2>
				<div id="todo-add-block"><img src="${addIcon}" id="todo-add" alt="Add">New Todo</div>
			</div>
			<div class="todo-list">
				${project.todos.map(todo => `
					<div class="todo-item priority-${escapeHTML(todo.priority)}" data-todo-id="${escapeHTML(todo.id)}">
						<img src="${todoIcon}" class="todo-icon" alt="">
						<div class="todo-info">
							<h4 class="todo-title">${escapeHTML(todo.title)}</h4>
							<span class="todo-date">${escapeHTML(todo.dueDate)}</span>
						</div>
						<div class="todo-options">
							<img src="${editIcon}" class="todo-edit" alt="Edit">
							<img src="${deleteIcon}" class="todo-delete" alt="Delete">
						</div>
					</div>
				`).join("")}
			</div>
		`;

		document.querySelector("#todo-add-block").addEventListener("click", () => {
			addTodo(project.subject)
		})
	};	

	const deleteTodo = () => {}

	addProjectBtn.addEventListener("click", () => { addProject(); });

	const escapeHTML = (str = "") =>
	String(str)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");


	sidebarProjects.addEventListener("click", (e) => {
		const block = e.target.closest("[data-project]")
		if (block){
			if (e.target.closest("[data-option]")){
				if (e.target.closest(".side-project-edit-option")){
					editProject(block.dataset.project);  
				}else if (e.target.closest(".side-project-delete-option")){
					deleteProject(block.dataset.project)
				}
			}else if (e.target.closest("[data-subject]")){
				const projects = AppLogicControl.getProjects()
				projects.forEach(project => {
					if (project.subject === block.dataset.project){
						renderTodos(project);  
					}
				})
			} 
		} 		 
	});

})();


