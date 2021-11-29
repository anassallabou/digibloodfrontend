import {FormGroup, Validators} from '@angular/forms';
import {SignupComponent} from './signup.component';

export const EmailValidation = [Validators.required, Validators.email];

export function RepeatPasswordValidator(group: FormGroup) {
  const password = group.controls.password.value;
  const passwordConfirmation = group.controls.passwordAgain.value;

  return password === passwordConfirmation ? null : {passwordsNotEqual: true}
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  }
}

export function EmailCheck() {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls.email.value;

  }

}

