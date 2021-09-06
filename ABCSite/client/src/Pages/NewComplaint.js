import React ,{useEffect}from "react";
import { Form } from "react-final-form";
import api from "./Axios";
import { useHistory } from "react-router-dom";
import FormFields from "../Forms/FormFields";
import props from "../Props/NewCompProps";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography, Paper, Grid, CssBaseline } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import { useTranslation } from "react-i18next";
import Validation from "../Forms/Validation";

function NewComp() {

  const token = jwt_decode(sessionStorage.getItem("UserInfo"));
  useEffect(() => {
    if(token.Permissions.isAdmin===1){
      if(token.Permissions.ViewComp===0){
        alert("You Dont have Permission to create one")
        history.push("/");}
    }
    
  }, [])
  const { t } = useTranslation();
  let history = useHistory();

  const onSubmit = async (valuse) => {
    const token = jwt_decode(sessionStorage.getItem("UserInfo"));
    let data = {
      userId: token.id,
      complainType: valuse.complaintType,
      subject: valuse.subject,
      severity: valuse.severity,
      description: valuse.discription,
      preferedLanguage: valuse.language,
      status: "Pending",
    };
    console.log(data);
    async function newComp() {
      let res = await api.post("/complaints/new", data);
      console.log(res);
      if (res.status === 200) {
        history.push("/");
      }
    }
    newComp();
  };

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        {t("page_title.new_comp_page")}
      </Typography>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          complaintType: "",
          subject: "",
          discription: "",
          language: "",
          agree: false,
        }}
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
export default NewComp;
