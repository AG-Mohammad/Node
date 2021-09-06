import required from "../FormValidation/required";
const Props = [
  {
    size: 12,
    inputType: "text",
    name: "roleName",
    label: "Role Name",
    arlabel: "roleName",
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
    name: "desc",
    label: "desc",
    arlabel: "desc",
    validators: [],
  },

  {
    size: 12,
    inputType: "button",
    label: "Submit",
    arlabel: "Submit",
  },
];

export default Props;
