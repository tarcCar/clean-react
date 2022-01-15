import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-build'
import { makeSingUpValidation } from './singup-validation-factory'

describe('SingUpValidationFactory', () => {
  test('Should compose ValidationComposite with correct validations', () => {
    const composite = makeSingUpValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('name').required().min(5).build(),
      ...Builder.field('email').required().email().build(),
      ...Builder.field('password').required().min(5).build(),
      ...Builder.field('passwordConfirmation').required().sameAs('password').build(),
    ]))
  })
})
