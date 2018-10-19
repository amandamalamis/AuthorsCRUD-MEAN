import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editTask = { _id: "", title: "", description: "" };
  tasks = [];
  error = {};
  loadEdit = false;
  idToEdit = ""
  params: any;
  
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
      this._route.params.subscribe((params: Params) => {
      this.idToEdit = params['id'];
      this.getTask();
    })
  }
  
  goHome() {
    this._router.navigate(['/']);
  }

  getTask(){
    let observable = this._httpService.getTask(this.idToEdit);
    observable.subscribe(data => {
      console.log('got task: ', data)
      this.editTask = data['task'];
    })
  }

  onSubmitEdit() {
    let observable = this._httpService.editTask(this.editTask);
    observable.subscribe(data => {
      if (data['errors']){
        this.error = data['errors'];
      }
      else{
        this.goHome();
        // this._router.navigate(['/home'])
      }
    })
  }

}

