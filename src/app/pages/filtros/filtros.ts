import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'filtros',
  imports: [FormsModule, NzSelectModule, ReactiveFormsModule, NzButtonModule, NzDatePickerModule, NzFormModule, NzTimePickerModule, NzGridModule, NzColDirective, NzIconModule],
  templateUrl: './filtros.html',
  styles: [`
    :host {
      display: block;
    }

    .filters-shell {
      padding: 8px;
    }

    .filters-head {
      margin-bottom: 10px;
    }

    .filters-kicker {
      margin: 0;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      color: #6f8f59;
    }

    .filters-title {
      margin: 6px 0 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 22px;
      font-weight: 700;
      line-height: 1.2;
      color: #3d4738;
    }

    .filters-form {
      padding: 14px;
      border-radius: 16px;
      border: 1px solid rgba(138, 170, 116, 0.28);
      background:
        radial-gradient(circle at 12% 18%, rgba(255, 255, 255, 0.58), transparent 46%),
        linear-gradient(135deg, #f2f6ed 0%, #ebf2e4 50%, #e5eddb 100%);
      box-shadow:
        0 10px 20px rgba(72, 92, 58, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.32);
    }

    .filter-label {
      display: block;
      margin-bottom: 6px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.1px;
      color: #55624d;
    }

    .filter-field {
      display: flex;
      flex-direction: column;
      min-height: 74px;
    }

    .filter-control {
      width: 100%;
      display: block;
    }

    .filter-control ::ng-deep .ant-select,
    .filter-control ::ng-deep .ant-picker {
      width: 100%;
      height: 44px !important;
      line-height: 44px !important;
    }

    .filter-control ::ng-deep .ant-select-selector,
    .filter-control ::ng-deep .ant-picker {
      height: 44px !important;
      border-radius: 10px;
      border: none !important;
      box-shadow: none !important;
      background-color: rgba(251, 253, 248, 0.96);
    }

    .filter-control ::ng-deep .ant-select-selection-item,
    .filter-control ::ng-deep .ant-select-selection-placeholder {
      line-height: 42px !important;
    }

    .filter-control ::ng-deep .ant-picker-input > input {
      height: 42px;
      line-height: 42px;
    }

    .filter-control ::ng-deep .ant-select-selector:hover,
    .filter-control ::ng-deep .ant-picker:hover,
    .filter-control ::ng-deep .ant-select-focused .ant-select-selector,
    .filter-control ::ng-deep .ant-picker-focused {
      border: none !important;
      box-shadow: 0 0 0 2px rgba(107, 140, 90, 0.2) !important;
    }

    .filter-control ::ng-deep .ant-select-selection-placeholder,
    .filter-control ::ng-deep .ant-picker-input > input::placeholder {
      color: #9b927f;
      font-weight: 500;
    }

    .filters-actions {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }

    .btn-clear-filters {
      min-height: 42px;
      padding: 0 16px;
      border-radius: 10px;
      font-weight: 600;
      color: #4f6142;
      border: 1px solid #c4d4b7;
      background-color: #eef5e7;
    }

    .btn-clear-filters:hover {
      color: #3e4f34;
      border-color: #afc59d;
      background-color: #e6f0dc;
    }

    @media (max-width: 991px) {
      .filters-actions {
        justify-content: flex-start;
        align-items: center;
      }

      .btn-clear-filters {
        width: 100%;
      }
    }

    @media (max-width: 768px) {
      .filters-title {
        font-size: 20px;
      }

      .filters-form {
        padding: 12px;
      }

      .filters-actions {
        justify-content: stretch;
      }

      .btn-clear-filters {
        width: 100%;
      }
    }
  `]
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

  clearFilters(): void {
    this.selectedValue = null;
    this.validateForm.reset({ datePicker: null });
  }
}
