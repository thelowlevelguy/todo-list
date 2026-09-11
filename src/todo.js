export class todo{
	priorities: ["high", "medium", "low"];
	constructor(id ,subject, title, description, dueDate, priority){
		this.id = crypto.randomUUID();
		this.subject = subject;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.status = "pending";
		this.creationDate = Date.now()
	}

	editDue(property, newValue){
		if (Object.hasOwn(this, property)){
			switch(property){
			case "subject", "description": this.property = newValue;
				break;
			case "dueDate": this.changeDueState(newValue);
				break;
			case "priority" : this.changeDuePriority(newValue);
				break;
			case "status" : this.changeDueState(newValue);
				break;
			default: return
			}
		}
	}

	changeDueState(newValue){
		this.status == "pending" ? "finished" : "pending"; 
	}

	changeDuePriority(newValue){
		if (newValue == priorities[0]){
			this.priority = priorities[1];
		}else if (newValue == priorities[1]){
			this.priority = priorities[2];
		}else if(newValue == priorities[2]){
			this.priority = priorities[0];
		}
	}

	updateDueDate(newValue){

	}
}
