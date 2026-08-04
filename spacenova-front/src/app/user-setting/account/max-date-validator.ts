import { Directive, Input, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMaxDate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MaxDateValidatorDirective),
      multi: true
    }
  ]
})
export class MaxDateValidatorDirective implements Validator {
  @Input('appMaxDate') maxDate = '';

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value || !this.maxDate) {
      return null;
    }
    return control.value > this.maxDate ? { maxDate: true } : null;
  }
}
