import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FractalComponent } from './fractal/fractal.component';
import { PhotoshopComponent } from './photoshop/photoshop.component';
import { TransformationComponent } from './transformation/transformation.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DocsComponent } from './docs/docs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
