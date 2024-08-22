import { TaskStatus } from "../tasks.model";

export class UpdateTaskDTO{
    id:string;
    title:string;
    description:string;
    status:TaskStatus;
}

export class UpdateStatusTaskDTO{
    id:string;
    status:TaskStatus;
}