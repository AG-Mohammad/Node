import { TextField, Select } from "mui-rff";
import { MenuItem } from "@material-ui/core";

function formFields(Props) {
 
  switch (Props.type){
    case ("select"): return <Select name={Props.name} label={Props.label} >
    {Props.data.map((item, idx) => (
      <MenuItem key={item.idx} value={item.value}>{item.value}</MenuItem>
    ))}
  </Select>;
  default: return <TextField name={Props.name} label={Props.label} />;
  }

}

export default formFields;
