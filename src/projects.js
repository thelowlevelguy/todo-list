import {todo} from "./src/todo.js";

export class project {
	constructor(title){
		this.projectTitle = title;
		this.project = [];
		this.creationDate = Date.now();
	}

	deleteProject(id){
		const index = project.indexOf(id);
		if (index > -1){project.splice(index, 1)};
	}

	editProjectTitle(title){
		this.projectTitle = title;
	}


	addDueToProject(){
		const data = new FormData(//);
		//get data from form and put them
	}
	
}