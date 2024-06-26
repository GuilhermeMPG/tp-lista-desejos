import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import {ProgressBarModule} from 'primeng/progressbar';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {SliderModule} from 'primeng/slider';
import {SidebarModule} from 'primeng/sidebar';

const MODULES = [CommonModule,TableModule,ProgressBarModule,DialogModule,ButtonModule,BrowserAnimationsModule,BrowserModule,InputTextModule,InputTextareaModule,InputNumberModule,SliderModule,SidebarModule ]

@NgModule({
  imports: [MODULES],
  exports:[MODULES]
})
export class PrimeNGModuleModule { }
