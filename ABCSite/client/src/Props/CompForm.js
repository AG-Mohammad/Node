const Props = [
  {
    size: 6,
    shown: 1,
    inputType: "text",
    name: "subject",
    label: "SUBJECT",
    arlabel: "الموضوع",
    disabled: 1,
  },

  {
    size: 6,
    shown: 1,
    inputType: "text",
    name: "stauts",
    label: "STATUS",
    arlabel: "الحالة",
    disabled: 1,
  },

  {
    size: 6,
    shown: 1,
    inputType: "text",
    name: "complaintId",
    label: "COMPLAINT ID",
    arlabel: "معرف الشكوى",
    disabled: 1,
  },

  {
    size: 6,
    shown: 1,
    inputType: "text",
    name: "severity",
    label: "SEVERITY",
    arlabel: "خطورة",
    disabled: 1,
  },
  {
    size: 6,
    shown: 1,
    inputType: "text",
    name: "complaintType",
    label: "COMPLAINT TYPE",
    arlabel: "نوع الشكوى",
    disabled: 1,
  },
  {
    size: 6,
    shown: 1,
    inputType: "text",
    name: "openedBy",
    label: "OPENED BY",
    arlabel: "تم فتحه بواسطة",
    disabled: 1,
  },
  {
    size: 12,
    shown: 1,
    inputType: "text",
    name: "details",
    label: "DETAILS",
    arlabel: "تفاصيل",
    raws: 4,
    disabled: 1,
  },
  {
    size: 12,
    shown: 0,
    inputType: "select",
    name: "stauts",
    label: "STATUS",
    arlabel: "الحالة",
    data: [
      { value: "Pending", label: "Pending" },
      { value: "Open", label: "Open" },
    ],
    ardata: [
      { value: "Pending", label: "قيد الانتظار" },
      { value: "Open", label: "مفتوح" },
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
