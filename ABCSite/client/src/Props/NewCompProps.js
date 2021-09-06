import required from "../Forms/FormValidation/required";
const Props = [
  {
    size: 12,
    inputType: "select",
    name: "complaintType",
    label: "Complaint Type",
    data: [
      { value: "Account", label: "Account" },
      { value: "Others", label: "Others" },
    ],
    arlabel: "نوع الشكوى",
    ardata: [
      { value: "Account", label: "حساب" },
      { value: "Others", label: "آخرون" },
    ],
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
    inputType: "text",
    name: "subject",
    label: "Subject",
    arlabel: "موضوع",
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
    inputType: "select",
    name: "severity",
    label: "Severity",
    data: [
      { value: "Urgent", label: "Urgent" },
      { value: "Important", label: "Important" },
    ],
    arlabel: "خطورة",
    ardata: [
      { value: "Urgent", label: "عاجل" },
      { value: "Important", label: "مهم" },
    ],
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
    inputType: "text",
    name: "description",
    label: "Description",
    arlabel: "وصف",
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
    size: 6,
    inputType: "radios",
    name: "preferedLanguage",
    label: "Preferred Contact Language ",
    data: [
      { values: "Arabic", label: "العربية" },
      { values: "English", label: "English" },
    ],
    arlabel: "لغة الاتصال المفضلة",
    ardata: [
      { values: "Arabic", label: "العربية" },
      { values: "English", label: "English" },
    ],
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
    inputType: "checkboxes",
    name: "agree",
    data: [{ label: "Agree to terms and conditions", values: "1" }],
    ardata: [{ label: "وافق على الشروط والأحكام", values: "1" }],
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
    label: "Create",
    arlabel: "إنشاء",
  },
];

export default Props;
