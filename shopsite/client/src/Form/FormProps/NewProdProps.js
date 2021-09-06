import required from "../FormValidation/required";
const Props = [
  {
    size: 12,
    inputType: "select",
    name: "category",
    label: "Product Category",
    data: [
      { value: "Others", label: "Others" },
    ],
    arlabel: "نوع الشكوى",
    ardata: [
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
    name: "name",
    label: "Product Name",
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
    inputType: "file",
    name: "pic",
    label: "Product Image",
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
