import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  { path: 'create',component: CreateComponent },
  { path: '',component: HomeComponent },
  { path: 'edit/:id',component: EditComponent },
  { path: 'show/:id',component: ShowComponent },

  { path: '', pathMatch: 'full', redirectTo: '/' },
  // the ** will catch anything that did not match any of the above routes
  { path: '**', component: PagenotfoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
