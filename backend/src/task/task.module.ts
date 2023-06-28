import { Module } from '@nestjs/common';
import {TaskController} from "../Controlers/task/task.controller";
import {TaskService} from "../Services/task/task.service";
import {TaskEntity} from "../Entities/task.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([TaskEntity])],
    controllers: [TaskController],
    providers: [TaskService],
    exports: [TaskService]
})
export class TaskModule {}
