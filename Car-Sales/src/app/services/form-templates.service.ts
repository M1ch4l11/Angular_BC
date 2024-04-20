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
              name: 'productcode',
              required: true,
              defaultValue: '' + product?.productcode || '',
              placeholder: '...S10_1634',
              type: 'input',
              label: 'productCode',
            }
          : {
              name: 'productcode',
              placeholder: '...S10_1634',
              type: 'input',
              label: 'productCode',
            },
        {
          name: 'productline',
          required: true,
          placeholder: '...Classic Cars',
          defaultValue: product?.productline || '',
          type: 'input',
          label: 'productLine',
        },
        {
          name: 'productname',
          required: true,
          placeholder: '...1952 Alpine Renault 1300',
          defaultValue: product?.productname || '',
          type: 'input',
          label: 'productName',
        },
        {
          name: 'productscale',
          required: true,
          placeholder: '...1:10',
          defaultValue: product?.productscale || '',
          type: 'input',
          label: 'productscale',
        },
        {
          name: 'productvendor',
          required: true,
          placeholder: '...Classic Metal Creations',
          defaultValue: product?.productvendor || '',
          type: 'input',
          label: 'productVendor',
        },
        {
          name: 'productdescription',
          required: true,
          placeholder: '...Turnable front wheels; steering function...',
          defaultValue: product?.productdescription || '',
          type: 'text',
          label: 'productDescription',
        },
        {
          name: 'quantityinstock',
          required: true,
          placeholder: '...7305',
          defaultValue: product?.quantityinstock || '',
          type: 'inputNumber',
          label: 'quantityInStock',
        },
        {
          name: 'buyprice',
          required: true,
          placeholder: '...98.58',
          defaultValue: product?.buyprice || '',
          type: 'inputNumber',
          label: 'buyPrice',
        },
        {
          name: 'msrp',
          required: true,
          placeholder: '...98.58',
          defaultValue: product?.msrp || '',
          type: 'inputNumber',
          label: 'msrp',
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
              name: 'employeenumber',
              required: true,
              defaultValue: employee?.employeenumber || '',
              type: 'inputNumber',
              label: 'employeeNumber',
            }
          : {
              name: 'employeenumber',
              type: 'input',
              label: 'employeeNumber',
            },
        {
          name: 'officecode',
          required: true,
          placeholder: '..1',
          defaultValue: employee?.officecode || '',
          type: 'input',
          label: 'officeCode',
        },
        {
          name: 'firstname',
          required: true,
          placeholder: '...Michal',
          defaultValue: employee?.firstname || '',
          type: 'input',
          label: 'Name',
        },
        {
          name: 'lastname',
          required: true,
          placeholder: '...Kroslak',
          defaultValue: employee?.lastname || '',
          type: 'input',
          label: 'Surname',
        },
        {
          name: 'extension',
          required: true,
          placeholder: '...x5800',
          defaultValue: employee?.extension || '',
          type: 'input',
          label: 'Extension',
        },
        {
          name: 'email',
          required: true,
          placeholder: '...kros.mic@gmail.com',
          defaultValue: employee?.email || '',
          type: 'input',
          label: 'Email',
        },
        {
          name: 'reportsto',
          required: true,
          placeholder: '...1002',
          defaultValue: employee?.reportsto || '',
          type: 'inputNumber',
          label: 'reportsTo',
        },
        {
          name: 'jobtitle',
          required: true,
          placeholder: '...fvdlmcj',
          defaultValue: employee?.jobtitle || '',
          type: 'input',
          label: 'jobTitle',
        },
      ],
    };
  }

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
