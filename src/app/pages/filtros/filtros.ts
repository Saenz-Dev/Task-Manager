import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRowDirective } from 'ng-zorro-antd/grid';
import { NzColDirective } from 'ng-zorro-antd/grid';

@Component({
  selector: 'filtros',
  imports: [FormsModule, NzSelectModule, ReactiveFormsModule, NzButtonModule, NzDatePickerModule, NzFormModule, NzTimePickerModule, NzGridModule, NzColDirective, NzRowDirective],
  templateUrl: './filtros.html'
})
export class Filtros {
  selectedValue = null;

  private fb = inject(FormBuilder);
  validateForm = this.fb.group({
    datePicker: this.fb.control<Date | null>(null),
  });

  submitForm(): void {
    console.log(this.validateForm.value);
  }
}
