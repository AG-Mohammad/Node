import valid from "validator";
function Length(params, max) {
  if (!valid.isLength(params, max)) return true;
  else return false;
}
export default Length;
