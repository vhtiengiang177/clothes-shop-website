import { AbstractControl } from '@angular/forms';

interface EmailValidationErrors {
  invalidEmail: {
    type:
      | 'null'
      | 'non-email';
    message: string;
  };
}

const EMAIL_VALIDATING_REGEXES = {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

export function emailValidator(
  control: AbstractControl
): EmailValidationErrors | null {
  const email = control.value as string;

  if (!email)
    return {
      invalidEmail: {
        type: 'null',
        message: 'Email is required.',
      },
    };

  if (!EMAIL_VALIDATING_REGEXES.email.test(email))
    return {
      invalidEmail: {
        type: 'non-email',
        message: 'Email must be a valid email.',
      },
    };

  return null;
}