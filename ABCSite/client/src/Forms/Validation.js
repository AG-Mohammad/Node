function Validation(values, schema, t, admin) {
  const errors = {};

  var BreakException = {};

  schema.forEach((element) => {
    try {
      element.validators.forEach((validator) => {
        if (!admin && !element.shown) {
          throw BreakException;
        }

        if (validator.validatorsfnc(values[element.name])) {
          errors[element.name] =
            t("lang") === "en" ? validator.massage.en : validator.massage.ar;
          throw BreakException;
        }
      });
    } catch (e) {}
  });

  return errors;
}
export default Validation;

// for loop on schema
// for loop vadiators
// call validaors fun
// check if the returened value is false get mssage error basoed on local --
//-- you break the validator loop nad continue on next element on schema loop
// values[schema.name]
// error.[schema.name]= schema.massage.ar
// finally you will reyurn the errors;

//ValidateFunc(element.validators.id, values[element.name])
//validator.validatorsfnc(values[element.name])
//=================
