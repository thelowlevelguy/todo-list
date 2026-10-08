import {format} from "date-fns";

export class Project {
	constructor(subject){
		this.subject = subject;
		//a list of dues
		this.todos = [];
	}

	editProjectSubject(subject){
		this.subject = subject;
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