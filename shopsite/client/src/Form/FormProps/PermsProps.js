import required from "../FormValidation/required";
const Props = [
  {
    size: 12,
    inputType: "text",
    name: "permission",
    label: "Permission",
    arlabel: "permission",
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
    label: "Add",
    arlabel: "add",
  },
];

export default Props;
