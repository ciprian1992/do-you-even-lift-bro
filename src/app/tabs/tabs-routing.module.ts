import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'max-weight',
        loadChildren: () =>
          import('../max-weight/max-weight.module').then(
            (m) => m.MaxWeightPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/max-weight',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/max-weight',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
