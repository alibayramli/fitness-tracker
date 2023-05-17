import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(
  password: string,
  repeatPassword: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get(password);
    const repeatPasswordControl = control.get(repeatPassword);

    if (passwordControl?.value !== repeatPasswordControl?.value) {
      repeatPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      repeatPasswordControl?.setErrors(null);
    }
    return null;
  };
}
