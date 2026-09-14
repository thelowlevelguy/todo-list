import {project} from "./projects.js"
import {todo} from "./todo.js";

const appLogicControl = (() => {

	const projects = [];

	const addDueToProject = () => {
		const data = new FormData();
		const due = new todo(
						data.get("subject"), 
					 	data.get("description"),
					 	data.get("due-date"),
					 	data.get("priority"),
						)
		
		if (projects.length > 0 ){
			const matched = false;
			projects.map((index, project), () => {
				for (let obj in project) {
					if (obj.projectTitle === due.subject){
						project.addDue(due);
						matched = true;
						break;
					}
				}
				if (matched){return};
			})
			
			if (!matched){
				const newProject = createNewProject(subject);
				newProject.addDue(due);
				projects.push(newProject);
			}
		}
		
	}

	const createNewProject = (subject) => {
		return new project(subject);
	}
		
	const deleteProject = (subject) => {
		for (let project in projects){
			if (project.projectTitle === subject){
				const index = projects.indexOf(project)
				projects.splice(index, 1);
				break;
			};
		}
	}

})();

const appDomControl = (() => {
	
})();

