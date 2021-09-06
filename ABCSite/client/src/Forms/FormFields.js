import { TextField, Checkboxes, Select, Radios } from "mui-rff";
import { MenuItem, Button, Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

function formFields(Props) {
  switch (Props.type) {
    case "select":
      return (
        <Select
          required={true}
          variant="outlined"
          name={Props.name}
          label={Props.label}
        >
          {Props.data.map((item, idx) => (
            <MenuItem key={idx} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      );
    case "radios":
      return (
        <Radios
          label={Props.label}
          name={Props.name}
          formControlProps={{ margin: "none" }}
          radioGroupProps={{ row: true }}
          required={true}
          data={Props.data.map((item, idx) => {
            const container = {};
            container.key = idx;
            container.label = item.label;
            container.value = item.values;
            return container;
          })}
        />
      );

    case "checkboxes":
      return (
        <Checkboxes
          name={Props.name}
          label={Props.label}
          formControlProps={{ margin: "none" }}
          //checked={Boolean (Props.checked)}
          value = {Boolean (Props.checked)}
          data={Props.data.map((item, idx) => {
            const container = {};
            container.key=idx
            container.label = item.label;
            return container;
          })}
        />
      );

    case "button":
      return (
        <Grid>
          <Button
            variant="contained"
            color="primary"
            name={Props.label}
            type="submit"
            disabled={Props.submitting}
          >
            {Props.submitting ? (
              <CircularProgress color="inherit" size={28} />
            ) : (
              Props.label
            )}
          </Button>
        </Grid>
      );
    default:
      return (
        <TextField
          name={Props.name}
          label={Props.label}
          type={Props.type}
          variant="outlined"
          multiline={Props.raws ? true : false}
          disabled={Props.disabled ? true : false}
          style={{ fontWeight: "bold" }}
          rows={Props.raws}
          margin="none"
          required={true}
        />
      );
  }
}

export default formFields;
