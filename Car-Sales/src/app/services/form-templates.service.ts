import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { FormInput } from '../models/form';
import { Employee } from '../models/employee';
import { Product } from '../models/product';
import { FormComponent } from '../components/form/form.component';
import { FormEvent } from '../models/item-type';

@Injectable({
  providedIn: 'root',
})
export class FormTemplatesService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  loadComponent(
    dynamicComponentContainer: ViewContainerRef,
    event: FormEvent
  ): void {
    // clean up div container
    dynamicComponentContainer.clear();
    // read component & create component
    const componentRef = this.componentEvent(dynamicComponentContainer);
    // add styles
    // this.insertStyle(componentRef.location.nativeElement);
    // check type and return form Template
    componentRef.instance.options$ = this.getformTemplateByType(event);
    componentRef.instance.btnTitle = event.item ? 'Edit' : 'Save';
    // handle actions
    this.actionsEvent(componentRef);
  }

  getProductFormTemplate(product?: Product): FormInput {
    return {
      table: product ? 'productEdit' : 'product',
      title: product ? 'Edit product' : 'Insert product',
      fields: [
        product
          ? {
              name: 'productCode',
              required: true,
              defaultValue: '' + product?.productcode || '',
              visible: true,
              type: 'input',
              label: 'productCode',
            }
          : {
              name: 'productCode',
              visible: true,
              type: 'input',
              label: 'productCode',
            },
        {
          name: 'productLine',
          required: true,
          placeholder: '..Classic Cars',
          defaultValue: product?.productline || '',
          type: 'input',
          label: 'productLine',
        },
        {
          name: 'productName',
          required: true,
          placeholder: '...1952 Alpine Renault 1300',
          defaultValue: product?.productname || '',
          type: 'input',
          label: 'productName',
        },
        {
          name: 'productScale',
          required: true,
          placeholder: '...1:10',
          defaultValue: product?.productscale || '',
          type: 'input',
          label: 'productScale',
        },
        {
          name: 'productVendor',
          required: true,
          placeholder: '...Classic Metal Creations',
          defaultValue: product?.productvendor || '',
          type: 'input',
          label: 'productVendor',
        },
        {
          name: 'productDescription',
          required: true,
          placeholder: '...Turnable front wheels; steering function...',
          defaultValue: product?.productdescription || '',
          type: 'text',
          label: 'productDescription',
        },
        {
          name: 'quantityInStock',
          required: true,
          placeholder: '...7305',
          defaultValue: product?.quantityinstock || '',
          type: 'inputNumber',
          label: 'quantityInStock',
        },
        {
          name: 'buyPrice',
          required: true,
          placeholder: '...98.58',
          defaultValue: product?.buyprice || '',
          type: 'inputNumber',
          label: 'buyPrice',
        },
      ],
    };
  }

  getUserFormTemplate(employee?: Employee): FormInput {
    return {
      table: employee ? 'employeeEdit' : 'employee',
      title: 'Insert employee',
      fields: [
        employee
          ? {
              name: 'employeeNumber',
              required: true,
              defaultValue: employee?.employeenumber || '',
              visible: true,
              type: 'inputNumber',
              label: 'employeeNumber',
            }
          : {
              name: 'employeeNumber',
              visible: true,
              type: 'input',
              label: 'employeeNumber',
            },
        {
          name: 'officeCode',
          required: true,
          placeholder: '..1',
          defaultValue: employee?.officecode || '',
          type: 'input',
          label: 'officeCode',
        },
        {
          name: 'Name',
          required: true,
          placeholder: '...Michal',
          defaultValue: employee?.firstname || '',
          type: 'input',
          label: 'Name',
        },
        {
          name: 'Surname',
          required: true,
          placeholder: '...Kroslak',
          defaultValue: employee?.lastname || '',
          type: 'input',
          label: 'Surname',
        },
        {
          name: 'Email',
          required: true,
          placeholder: '...kros.mic@gmail.com',
          defaultValue: employee?.email || '',
          type: 'input',
          label: 'Email',
        },
        {
          name: 'reportsTo',
          required: true,
          placeholder: '...1002',
          defaultValue: employee?.reportsto || '',
          type: 'inputNumber',
          label: 'reportsTo',
        },
        {
          name: 'jobTitle',
          required: true,
          placeholder: '...fvdlmcj',
          defaultValue: employee?.jobtitle || '',
          type: 'input',
          label: 'jobTitle',
        },
      ],
    };
  }

  // insertStyle(elementRef: HTMLElement): void {
  //   elementRef.style.position = 'fixed';
  //   elementRef.style.width = '100%';
  //   elementRef.style.display = 'flex';
  //   elementRef.style.justifyContent = 'center';
  // }

  componentEvent(
    dynamicComponentContainer: ViewContainerRef
  ): ComponentRef<FormComponent> {
    return dynamicComponentContainer.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(FormComponent)
    );
  }

  getformTemplateByType(event: FormEvent): any {
    return event.type == 'employees'
      ? this.getUserFormTemplate(event?.item)
      : this.getProductFormTemplate(event?.item);
  }

  actionsEvent(componentRef: ComponentRef<FormComponent>): void {
    componentRef.instance.productEvent.subscribe((event) => {
      console.log(event(), 'zbehol Product');
    });
    componentRef.instance.employeeEvent.subscribe((event) => {
      console.log(event(), 'zbehol Employee');
    });
  }
}
