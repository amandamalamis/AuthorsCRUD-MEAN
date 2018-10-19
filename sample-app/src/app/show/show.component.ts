import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  showTask = { _id: "", title: "", description: "" };
  
  tasks = [];
  idToView = ""
  params: any;
  // show: object;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }


  ngOnInit() { 
    this._route.params.subscribe((params: Params) => {
    this.idToView = params['id'];
    this.getTask();
  })
}

  goHome() {
    this._router.navigate(['/']);
    this.getTask();

  }

  getTask(){
    let observable = this._httpService.getTask(this.idToView);
    observable.subscribe(data => {
      console.log('got task: ', data)
      this.showTask = data['task'];
    })
  }

  showData(task) {
    console.log(task);
    this.showTask = task;
  }
}

