import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverhighlightDirective } from './directives/hoverhighlight.directive';
import { GenericTableComponent } from './generic-table/generic-table.component';



@NgModule({
  declarations: [
    HoverhighlightDirective,
    GenericTableComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HoverhighlightDirective,
    GenericTableComponent
  ]
})
export class SharedModule { }
