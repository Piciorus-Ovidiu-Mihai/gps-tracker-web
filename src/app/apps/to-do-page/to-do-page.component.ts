import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { UserToDoService } from 'src/app/libs/services/user-to-do.service';

@Component({
  selector: 'app-to-do-page',
  templateUrl: './to-do-page.component.html',
  styleUrls: ['./to-do-page.component.scss']
})
export class ToDoPageComponent implements OnInit {
  user: any;
  toDoList: any = [];
  listCompleted: any = [];
  listIncompleted: any = [];

  constructor(private authService: AuthService, private userToDoService: UserToDoService) {
    this.user = this.authService.userValue;
  }

  ngOnInit(): void {
    this.get();
  }

  async get(){
    const result = await this.userToDoService.get(this.user.id).toPromise();

    if(result) this.toDoList = result;

    this.listCompleted = this.toDoList.filter((item: any) => item.complete === true);
    this.listIncompleted = this.toDoList.filter((item: any) => item.complete !== true);
  }

  async completeTask(event: any){
    await this.userToDoService.complete(this.user.email,true,event.id).toPromise();
    this.get();
  }

  async deleteTask(item: any){
    await this.userToDoService.delete(item.id).toPromise();
    this.get();
  }

}
