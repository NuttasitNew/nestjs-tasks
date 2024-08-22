import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDTO): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  // http:localhost:3000/task/:id
  @Get('/:id')
  getTasksById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    console.log('create tasks title : ', createTaskDTO.title);
    console.log('create tasks description :', createTaskDTO.description);
    return this.tasksService.createTask(createTaskDTO);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): {
    delete_id: string;
    deleted: Task;
  } {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch()
  updateTaskById(@Body() updateTaskDTO: UpdateTaskDTO): {
    update_id: string;
    update: Partial<Task>;
    old: Partial<Task>;
  } {
    return this.tasksService.updateTaskById(updateTaskDTO);
  }

  @Patch('/status/:id')
  updateStatusTaskById(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): { update_id: string; update_status: string; old_status: string } {
    return this.tasksService.updateStatusTaskById(id, status);
  }
}
