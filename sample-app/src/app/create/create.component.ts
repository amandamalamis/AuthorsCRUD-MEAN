import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newTask = { title: '', description: ''};
  tasks = [];
  error= {};

  constructor(private _httpService: HttpService, private _router: Router) { }
  ngOnInit() {
  }
  goHome(){
    this._router.navigate(['/']);
  }
  onSubmitAdd(){
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => { 
      if (data['errors']){
        this.error = data['errors']
      }
      else{
        this.goHome();
      }
      // this.newTask = {title: '' , description: ''}


      // if (data.newTask == 'errors') {
      //   this.errors = 'Task must be at least 3 characters!';
      // }
      // else {
      //   this._router.navigate(['/']);
  
        // console.log("Data from on submit add", data);
        // this.newTask = { title: "", description: "" };
        // this.tasks.push(data);
        ///could also say this.getAllTasks() instead of pushing to the array
      // };
    })
  }
  

  
}

