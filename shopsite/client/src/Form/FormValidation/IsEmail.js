import valid from "validator";
function isEmail(value) {
  if (!valid.isEmail(value)) return true;
  else return false;
}
export default isEmail;
