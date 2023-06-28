import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {TaskService} from "../../Services/task/task.service";
import {CreateTaskDto} from "../../Dtos/create-task.dto";
import {UpdateTaskDto} from "../../Dtos/update-task.dto";

@Controller('task')
export class TaskController {
    constructor(private readonly todoService: TaskService) {}

    @Get()
    findAll() {
        return this.todoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.todoService.findOne(id);
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        console.log(createTaskDto);
        return this.todoService.create(createTaskDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
        return this.todoService.update(id, updateTaskDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.todoService.remove(id);
    }
}
