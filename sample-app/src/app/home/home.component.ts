import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _httpService: HttpService) { }
  tasks = [];
  editTask= {_id: '', title: '', description: ''};
  loadEdit=false;
  show: {};
  deleteTask= {_id:'', title: '', description: ''};


  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    let observable = this._httpService.getAll();
    observable.subscribe(data => {
      console.log("successful route", data);
      for (var task in data){
      this.tasks.push(data[task])}
      // this.tasks = data;
    })
  }

  showData(task) {
    console.log(task);
    this.show = task;
  }
  getOneTask(task) {    
    this.loadEdit=true;
    this.editTask={_id: task._id, title: task.title, description: task.description};
    console.log("Success at getone task- edit ")
  }

  onDelete(task) {  
    this.deleteTask = {_id:task._id, title: task.title, description: task.description};
    let observable = this._httpService.deleteTask(this.deleteTask);
    observable.subscribe(data => {
      for (var i=0;i< this.tasks.length; i++) { //this edits the tasks without a refresh by updating the tasks array (Defined above)
        if(this.tasks[i]['_id'] == this.deleteTask._id) {
          this.tasks.splice(i,1); //removes array element starting at index i and for 1 value (only that index)
        }
      }

    });
  }
}
