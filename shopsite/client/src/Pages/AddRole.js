import { Paper, Grid } from "@material-ui/core";
import FormFields from "../Form/FormFields";
import props from "../Form/FormProps/RoleProps";
import Validation from "../Form/Validation";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import api from "../components/Axios";

function AddRole() {
  const { t } = useTranslation();
  const onSubmit = async (values) => {
    async function add() {
      let res = await api.post("/roles/add", values);
      console.log(res.data);
    }
    add();
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        validate={(values) => {
          return Validation(values, props, t, 1);
        }}
        render={({ handleSubmit, form, submitting, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={4}>
                {props.map((item, idx) => (
                  <Grid item xs={item.size} key={idx}>
                    <FormFields
                      key={idx}
                      type={item.inputType}
                      name={item.name}
                      label={t("lang") === "en" ? item.label : item.arlabel}
                      data={t("lang") === "en" ? item.data : item.ardata}
                      submitting={submitting}
                      autocom={item.autocom}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </form>
        )}
      />
    </>
  );
}

export default AddRole;
