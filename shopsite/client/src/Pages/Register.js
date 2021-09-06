import React, { useState } from "react";
import { Form } from "react-final-form";
import api from "../components/Axios";
import FormFields from "../Form/FormFields";
import Userprops from "../Form/FormProps/RegistProps";
import Adminprops from "../Form/FormProps/SellerRegProps";
import { useHistory, useLocation } from "react-router-dom";
import { Typography, Paper, Grid, CssBaseline } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Validation from "../Form/Validation";
import ErrAlert from "../components/Alert";
import Collapse from "@material-ui/core/Collapse";

function UserReg() {
  const { t } = useTranslation();
  const type = useLocation().state.Type;
  const props = (type? Userprops:Adminprops)
  const [msg1, setmsg1] = useState({});
  const [open, setOpen] = useState(false);

  let history = useHistory();

  const onSubmit = async (values) => {
    let res = null;
    async function signup() {
      values.accType=type
      res = await api.post("/users/Reg", values);
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
        initialValues={{}}
        validate={(values) => {
          return Validation(values, props, t, type);
        }}
        render={({ handleSubmit, form, submitting, values }) => (
          <form
            name="test"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                {props.map((item, idx) => (
                  <Grid item xs={item.size} key={idx}>
                    <FormFields
                      key={idx}
                      type={item.inputType}
                      name={item.name}
                      label={t("lang") === "en" ? item.label : item.arlabel}
                      raws={item.raws}
                      disabled={item.disabled}
                      data={t("lang") === "en" ? item.data : item.ardata}
                      //submitting={submitting}
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
