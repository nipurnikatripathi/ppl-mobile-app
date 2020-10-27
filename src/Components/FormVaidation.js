export default function validate(value) {
  let errors = {};
  console.log('inside validate functionn', errors);
  if (!value.email) {
    errors.email = 'Email address is required';
    console.log('inside if !values.email ', errors.email);
  } else if (!/\S+@\S+\.\S+/.test(value.email)) {
    errors.email = 'Email address is invalid';
    console.log('inside else if to check string ', errors.email);
  }
  if (!value.password) {
    errors.password = 'Password is required';
    console.log('inside if !values.password ', errors.password);
  } else if (value.password.length < 8) {
    errors.password = 'Password must be 8 or more characters';
    console.log('inside else if value.password.length < 8 ', errors.password);
  }
  return errors;
}
