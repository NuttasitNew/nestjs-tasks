import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model'; // Import TaskStatus
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateStatusTaskDTO, UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Learn something',
      description: 'Focus on code course',
      status: TaskStatus.OPEN,
    },
    {
      id: '2',
      title: 'Complete project setup',
      description: 'Set up initial project structure and configurations',
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: '3',
      title: 'Write unit tests',
      description: 'Cover key components with unit tests',
      status: TaskStatus.DONE,
    },
    {
      id: '4',
      title: 'Review PRs',
      description: 'Review pull requests for the current sprint',
      status: TaskStatus.OPEN,
    },
    {
      id: '5',
      title: 'Update documentation',
      description: 'Update project documentation for the new features',
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getTasksWithFilters(filterDto: GetTasksFilterDTO): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTaskById(id: string): { delete_id: string; deleted: Task } {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    const deleteTask = {
      delete_id: found.id,
      deleted: found, // Return the entire found task object
    };
    return deleteTask;
  }

  updateTaskById(updateTaskDTO: UpdateTaskDTO): {
    update_id: string;
    update: Partial<Task>;
    old: Partial<Task>;
  } {
    const { id, title, description, status } = updateTaskDTO;

    const task = this.getTaskById(id);

    // Prepare the update information
    const updateTasks = {
      update_id: id,
      update: {
        title: title || task.title,
        description: description || task.description,
        status: status || task.status,
      },
      old: {
        title: task.title,
        description: task.description,
      },
    };

    // Apply the updates to the task
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    return updateTasks;
  }

  updateStatusTaskById(
    id: string,
    status: TaskStatus,
  ): { update_id: string; update_status: string; old_status: string } {
    const task = this.getTaskById(id);

    const updateStatusTask = {
      update_id: id,
      update_status: status,
      old_status: task.status,
    };

    task.status = status; // Update the task status

    return updateStatusTask;
  }
}
