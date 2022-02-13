import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, TextBoxModule } from 'ngx-os';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form';
import { MyInputComponent } from './components/my-input/my-input.component';

@NgModule({
    declarations: [
        AppComponent,
        UserFormComponent,
        MyInputComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        ButtonModule,
        TextBoxModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
