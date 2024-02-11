import { CommonModule } from '@angular/common';
import {
  EventEmitter,
  Input,
  OnInit,
  Output,
  Component,
  Signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FormField, FormInput } from 'src/app/models/form';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Output() productEvent = new EventEmitter<Signal<any[]>>();
  @Output() employeeEvent = new EventEmitter<Signal<any[]>>();
  @Input() options$: any;
  @Input() btnTitle?: string;
  table!: string;
  title!: string;
  form = this.fb.record({});
  fields!: FormField[];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createForm(this.options$.fields);
    this.title = this.options$.title;
    this.table = this.options$.table;
  }

  createForm(fields: FormField[] | any): void {
    this.fields = fields;
    fields.forEach(
      (field: {
        required: any;
        name: string;
        defaultValue: any;
        disabled: any;
      }) => {
        let validators = field.required ? [Validators.required] : [];
        validators =
          field.name === 'Email'
            ? [
                ...validators,
                Validators.email,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
              ]
            : validators;

        this.form.addControl(
          field.name,
          new FormControl(
            { value: field.defaultValue || '', disabled: !!field.disabled },
            validators
          )
        );
      }
    );
  }

  send(options: FormInput): void {
    console.log(options);
  }
}
