import valid from "validator";

function IsInt(params) {
  if (!valid.isInt(params)) return true;
  else return false;
}

export default IsInt;
