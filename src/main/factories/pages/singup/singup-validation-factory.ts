import { ValidationComposite } from '@/validation/validators';
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-build';
import { Validation } from '@/presentation/protocols/validation';

export const makeSingUpValidation = (): Validation => {
  return ValidationComposite.build([
    ...Builder.field('name').required().min(5).build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(5).build(),
    ...Builder.field('passwordConfirmation').required().min(5).build(),
  ])
}
