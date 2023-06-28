import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {TaskEntity} from "../../Entities/task.entity";
import {FindOneOptions, Repository} from "typeorm";
import {CreateTaskDto} from "../../Dtos/create-task.dto";
import {UpdateTaskDto} from "../../Dtos/update-task.dto";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private taskRepository: Repository<TaskEntity>,
    ) {}

    findAll(): Promise<TaskEntity[]> {
        return this.taskRepository.find();
    }

    findOne(id: number): Promise<TaskEntity> {
        return this.taskRepository.createQueryBuilder().where("id = :id", { id: id }).getOne();
    }

    create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        const task = this.taskRepository.create(createTaskDto);
        return this.taskRepository.save(task);
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
        const task = await this.taskRepository.createQueryBuilder().where("id = :id", { id: id }).getOne();
        if (!task) {
            return null;
        }
        const updatedTask = { ...task, ...updateTaskDto };
        return this.taskRepository.save(updatedTask);
    }

    async remove(id: number): Promise<void> {
        await this.taskRepository.delete(id);
    }
}
