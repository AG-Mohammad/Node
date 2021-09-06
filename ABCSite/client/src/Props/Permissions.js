let info={ViewComp:false,
  CreatComp:false,
  isAdmin:false
};

if (sessionStorage.getItem("permis") != null) {
  info = JSON.parse(sessionStorage.getItem("permis"));
}

const Props = [
  {
    size: 12,
    shown: 1,
    inputType: "checkboxes",
    name: "ViewComp",
    values: info.ViewComp,
    data: [
      {
        values: info.ViewComp,
        label: "Allow View Complaints",
      },
    ],
    ardata: [
      {
        values: info.ViewComp,
        label: "السماح بمشاهدة الشكاوى",
      },
    ],
  },
  {
    size: 12,
    shown: 1,
    inputType: "checkboxes",
    name: "CreateComp",
    values: info.CreatComp,
    data: [
      {
        values: info.CreatComp,
        label: "Allow Create Complaints",
      },
    ],
    ardata: [
      {
        values: info.CreatComp,
        label: "السماح بإنشاء الشكاوى",
      },
    ],
  },
  {
    size: 12,
    shown: 1,
    inputType: "checkboxes",
    name: "Admin",
    values: info.isAdmin,
    data: [
      {
        values: info.isAdmin,
        label: "Make Admin "
      },
    ],
    ardata: [
      {
        values: info.isAdmin,
        label: "جعل المسؤول",
      },
    ],
  },

  {
    size: 12,
    shown: 0,
    inputType: "button",
    label: "Update",
    arlabel: "تحديث",
  },
];
export default Props;
