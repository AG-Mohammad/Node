import required from "../Forms/FormValidation/required";
import isEmail from "../Forms/FormValidation/IsEmail";
const Props = [
  {
    size: 12,
    inputType: "email",
    name: "email",
    label: "Email",
    arlabel: "بريد إلكتروني",
    autocom: 1,
    validators: [
      {
        id: "required",
        massage: { ar: "مطلوب", en: "required" },
        validatorsfnc: (value) => {
          return required(value);
        },
      },
      {
        id: "isEmail",
        massage: { ar: "أدخل بريد إلكتروني متاح", en: "Enter a valid email" },
        validatorsfnc: (value) => {
          return isEmail(value);
        },
      },
    ],
  },

  {
    size: 12,
    inputType: "password",
    name: "password",
    label: "Password",
    autocom: 1,
    arlabel: "كلمه السر",
    validators: [
      {
        id: "required",
        massage: { ar: "مطلوب", en: "required" },
        validatorsfnc: (value) => {
          return required(value);
        },
      },
    ],
  },

  {
    size: 12,
    inputType: "button",
    label: "Login",
    arlabel: "تسجيل الدخول",
  },
];

export default Props;
