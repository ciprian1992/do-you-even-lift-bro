import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaxWeightPage } from './max-weight.page';

const routes: Routes = [
  {
    path: '',
    component: MaxWeightPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaxWeightPageRoutingModule {}
