import { CommonModule } from '@angular/common';
import {
  EventEmitter,
  Input,
  OnInit,
  Output,
  Component,
  Signal,
  ViewContainerRef,
  ViewChild,
  ElementRef,
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
  @ViewChild('outBoxDiv') outBoxDivRef!: ElementRef;
  @ViewChild('formRef') formRef!: ElementRef;
  @Input() options$: any;
  @Input() btnTitle?: string;
  table!: string;
  title!: string;
  form = this.fb.record({});
  fields!: FormField[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dynamicComponentContainer: ViewContainerRef
  ) {}

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

  closeForm(event: Event): void {
    const centeredDiv = this.outBoxDivRef.nativeElement;
    const form = this.formRef.nativeElement;
    const clickedElement = event.target as HTMLElement;
    // return if mouse click is on the form
    if (form.contains(clickedElement) || centeredDiv.contains(clickedElement)) {
      return;
    }
    this.destroyComponent();
  }

  destroyComponent(): void {
    const element = this.dynamicComponentContainer.element.nativeElement;
    element.parentNode.removeChild(element);
  }
}
