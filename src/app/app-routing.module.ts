import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocsComponent } from './docs/docs.component';
import { FractalComponent } from './fractal/fractal.component';
import { HomeComponent } from './home/home.component';
import { PhotoshopComponent } from './photoshop/photoshop.component';
import { TransformationComponent } from './transformation/transformation.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'docs', component: DocsComponent},
  {path: 'photoshop', component: PhotoshopComponent},
  {path: 'transform', component: TransformationComponent},
  {path: 'fractal', component: FractalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
