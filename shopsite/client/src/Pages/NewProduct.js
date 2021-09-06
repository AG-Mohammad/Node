import { Form } from "react-final-form";
import api from "../components/Axios";
import { useHistory } from "react-router-dom";
import FormFields from "../Form/FormFields";
import props from "../Form/FormProps/NewProdProps";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography, Paper, Grid, CssBaseline } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import { useTranslation } from "react-i18next";
import Validation from "../Form/Validation";

function NewProd() {
  const { t } = useTranslation();
  let history = useHistory();
  const info = jwt_decode(sessionStorage.getItem("UserInfo"));

  const onSubmit = async (values) => {
    const data = new FormData();
    data.append("pic", values.pic[0]);
    data.append("category", values.category);
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("seller", info.name);

    let res = await api.post("/products/AddProd", data);
    if (res.status === 200) {
      history.push("/");
    }
  };

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <CssBaseline />
      test
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        {t("page_title.new_comp_page")}
      </Typography>
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
                    {item.inputType === "button" && submitting ? (
                      <CircularProgress size={35} />
                    ) : (
                      <></>
                    )}
                    <FormFields
                      key={idx}
                      type={item.inputType}
                      name={item.name}
                      label={t("lang") === "en" ? item.label : item.arlabel}
                      raws={item.raws}
                      data={t("lang") === "en" ? item.data : item.ardata}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </form>
        )}
      />
    </div>
  );
}
export default NewProd;
