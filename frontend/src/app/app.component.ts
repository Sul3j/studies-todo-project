import { Component, Inject } from '@angular/core';
import {AppService} from "./app.service";
import { Task } from './task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  tasks!: Task[];

  taskForm: FormGroup;

  current: Task = {
    id: 0,
    title: "",
    description: "",
    dueDate: new Date(2022, 0, 1),
    status: ""
  };

  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.appService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: 0,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        dueDate: this.taskForm.value.dueDate,
        status: this.taskForm.value.status
      };

      this.appService.addTask(newTask).subscribe(
        (task: Task) => {
          this.toastr.success("dodano zadanie!");
          this.loadTasks();
          this.taskForm.reset();

        },
        (error) => {
          console.error('Błąd podczas dodawania zadania:', error);
        }
      );
    }
  }

  deleteTask(taskId: number): void {
    this.appService.deleteTask(taskId).subscribe(
      () => {
        this.toastr.success("usunięto zadanie!");
        this.loadTasks();
      },
      (error) => {
        console.error('Błąd podczas usuwania zadania:', error);
      }
    );
  }

  currentTask(task: Task) {
    this.current = {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status
    };

    console.log(this.current)
  }

  editTask() {
    this.appService.updateTask(this.current).subscribe(updatedTask => {
      this.toastr.success("zaktualizowano zadanie!");
      this.taskForm.reset();
      this.loadTasks();
    }, error => {
      console.error('Błąd podczas aktualizacji zadania:', error);
    });
  }
}
