import valid from "validator";

function IsAlpha(params) {
  if (
    !valid.isAlpha(params, ["ar-JO"], { ignore: " " }) &&
    !valid.isAlpha(params, ["en-US"], { ignore: " " })
  )
    return true;
  else return false;
}

export default IsAlpha;
