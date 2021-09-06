import valid from "validator";

function IsPhone(params) {
    if (!valid.isMobilePhone(params,'any',{options:"strictMode"})) return true;
  else return false;
}

export default IsPhone;
