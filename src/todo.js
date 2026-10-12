import {format} from "date-fns";

export class Todo{
	constructor(title, description, dueDate, priority){
		this.id = crypto.randomUUID();
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.status = "pending";
		this.creationDate = format(Date.now(), "yyyy/MM/dd");
	}
}
