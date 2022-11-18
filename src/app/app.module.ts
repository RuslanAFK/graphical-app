import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { DocsComponent } from './routes/docs/docs.component';
import { FractalComponent } from './routes/fractals/fractal.component';
import { HomeComponent } from './routes/home/home.component';
import { PhotoshopComponent } from './routes/photoshop/photoshop.component';
import { TransformationComponent } from './routes/transformation/transformation.component';


@NgModule({
  declarations: [
    AppComponent,
    FractalComponent,
    PhotoshopComponent,
    TransformationComponent,
    HomeComponent,
    HeaderComponent,
    DocsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
