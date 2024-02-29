import { IsEnum } from 'class-validator';
import { TaskStatus } from '../data/task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
