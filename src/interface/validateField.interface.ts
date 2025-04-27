type ValidateFieldType<T> = (value: string, rule?: T | undefined) => string | boolean
export interface ValidateField {
  empty: ValidateFieldType<undefined>
  required: ValidateFieldType<string>
  account: ValidateFieldType<string>
  password: ValidateFieldType<string>
  passwordConfirm: ValidateFieldType<undefined>
  nickName: ValidateFieldType<undefined>
}
