export default function validateCreateLink(values) {
  console.log(`values validate = ${values.description}`);
  let errors = {};
  if (!values.description) {
    errors.description = "Description required";
  } else if (values.description.length < 10) {
    errors.description = "Description must be atleast 10 characters";
  }
  if (!values.url) {
    errors.url = "Url required";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "url must be valid";
  }
  return errors;
}
