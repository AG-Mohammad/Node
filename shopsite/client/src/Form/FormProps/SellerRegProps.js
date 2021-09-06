import required from "../FormValidation/required";
import isEmail from "../FormValidation/IsEmail";
import Length from "../FormValidation/Length";
import IsInt from "../FormValidation/IsInt";
import IsPhone from "../FormValidation/IsPhone";

const Props = [
  {
    size: 12,
    shown: 1,
    inputType: "text",
    name: "CompanyName",
    label: "Company Name",
    arlabel: "الاسم بالكامل",
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
    shown: 1,
    inputType: "email",
    name: "email",
    label: "Email",
    arlabel: "بريد إلكتروني",
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
    shown: 1,
    inputType: "password",
    name: "password",
    label: "Password",
    arlabel: "كلمه السر",
    validators: [
      {
        id: "required",
        massage: { ar: "مطلوب", en: "required" },
        validatorsfnc: (value) => {
          return required(value);
        },
      },
      {
        id: "length",
        massage: {
          ar: "لا يمكن أن يكون أقل من 6 أحرف",
          en: "cannot be less than 6 characters",
        },
        validatorsfnc: (value) => {
          return Length(value, { min: 6 });
        },
      },
    ],
  },
  {
    size: 12,
    shown: 1,
    inputType: "tel",
    name: "phoneNumber",
    label: "Phone Number",
    arlabel: "رقم الهاتف",
    validators: [
      {
        id: "required",
        massage: { ar: "مطلوب", en: "required" },
        validatorsfnc: (value) => {
          return required(value);
        },
      },
      {
        id: "numb",
        massage: { ar: "يجب أن تكون أرقامًا فقط", en: "Must be numbers only" },
        validatorsfnc: (value) => {
          return IsInt(value);
        },
      },
      {
        id: "phone",
        massage: { ar: "رقم الهاتف غير صحيح", en: "Invalid phone number" },
        validatorsfnc: (value) => {
          return IsPhone(value);
        },
      },
    ],
  },
  {
    size: 12,
    shown: 1,
    inputType: "text",
    name: "address",
    label: "Address",
    arlabel: "العنوان",
    raws: 4,
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
    inputType: "checkboxes",
    name: "agree",
    data: [{ label: "Agree to terms and conditions" }],
    ardata: [{ label: "وافق على الشروط والأحكام" }],
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
    shown: 1,
    inputType: "button",
    label: "Register",
    arlabel: "تسجيل",
  },
];

export default Props;
