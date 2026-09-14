import {format} from "date-fns";

export class project {
	constructor(title){
		this.projectTitle = title;
		//a list of dues
		this.todos = [];
		this.creationDate = format(Date.now(), "MM-dd-yyyy");
	}

	editProjectTitle(title){
		this.projectTitle = title;
	}

	deleteDue(id){
		const index = this.todos.indexOf(id);
		if (index > -1){this.todos.splice(index, 1)};
	}

	addDue(todo){
		this.todos.push(todo);
	}

	getTodos(){
		return this.todos;
	}
	
}