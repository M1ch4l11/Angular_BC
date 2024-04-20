export interface FormInput {
  table?: string;
  title?: string;
  fields?: FormField[];
}

export interface FormField {
  name: string;
  type: string;
  label: string;
  defaultValue?: string | number;
  placeholder?: string;
  visible?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export interface SendEvent {
  options: FormInput;
  form: any;
  btnTitle?: string;
  table: string;
}
