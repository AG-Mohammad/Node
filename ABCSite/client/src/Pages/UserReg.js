import React, { useState } from "react";
import { Form } from "react-final-form";
import api from "./Axios";
import FormFields from "../Forms/FormFields";
import props from "../Props/RegistProps";
import { useHistory, useLocation } from "react-router-dom";
import { Typography, Paper, Grid, CssBaseline } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Validation from "../Forms/Validation";
import ErrAlert from "./Alert";
import Collapse from "@material-ui/core/Collapse";

function UserReg() {
  const { t } = useTranslation();
  const type = useLocation().state.Type;

  const [msg1, setmsg1] = useState({});
  const [open, setOpen] = useState(false);

  let history = useHistory();

  const onSubmit = async (values) => {
    let res = null;
    let data = {
      fName: values.fName,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      education: values.education,
      gender: values.gender,
      address: values.address,
    };

    async function signup() {
      if (type) {
        res = await api.post("/users/signup", data);
      } else {
        res = await api.post("/users/signupforadmin", data);
      }

      if (!res.data.err) {
        setmsg1(res.data);
        history.push("/");
      } else {
        setmsg1(res.data);
      }
    }
    signup();
    setOpen(true);
  };

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <CssBaseline />
      <Collapse in={open}>{ErrAlert(msg1)}</Collapse>
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        {t(
          "page_title.".concat(
            type ? "register_page_user" : "register_page_admin"
          )
        )}
      </Typography>

      <Form
        onSubmit={onSubmit}
        initialValues={{
          fName: null,
          email: null,
          password: null,
          phoneNumber: null,
          education: null,
          gender: null,
          address: null,
          agree: false,
        }}
        validate={(values) => {
          return Validation(values, props, t, type);
        }}
        render={({ handleSubmit, form, submitting, values }) => (
          <form name="test" onSubmit={handleSubmit} noValidate autoComplete="off">
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                {props
                  .filter((item) => type || item.shown)
                  .map((item, idx) => (
                    <Grid item xs={item.size} key={idx}>
                      <FormFields
                        key={idx}
                        type={item.inputType}
                        name={item.name}
                        label={t("lang") === "en" ? item.label : item.arlabel}
                        raws={item.raws}
                        disabled={item.disabled}
                        data={t("lang") === "en" ? item.data : item.ardata}
                        submitting={submitting}
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
export default UserReg;
