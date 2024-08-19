import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model'; // Import TaskStatus
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';



@Injectable()
export class TasksService {
    private tasks: Task[] = [
        {
            id: "1",
            title: "Test Title",
            description: "Description",
            status: TaskStatus.OPEN,  // Correctly referencing TaskStatus.OPEN
        },
    ];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(createTaskDTO:CreateTaskDTO):Task{
        const { title , description } = createTaskDTO;

        const task:Task = { 
            id:uuid(),
            title,
            description,
            status:TaskStatus.OPEN,
        };

        this.tasks.push(task);

        return task;
    }
}
