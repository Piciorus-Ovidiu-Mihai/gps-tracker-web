import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
			{
				path: 'home',
				loadChildren: () => import('../apps/home/home.module').then((m) => m.HomeModule),
			},
			{
				path: '**',
				redirectTo: 'home',
			},
		],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
