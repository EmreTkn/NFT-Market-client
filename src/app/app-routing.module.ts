import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateItemComponent } from './create-item/create-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MyItemsComponent } from './my-items/my-items.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'my-items', component: MyItemsComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'create-item', component: CreateItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
