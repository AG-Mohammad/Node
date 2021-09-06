import React, { useState, useEffect } from "react";
import { Form } from "react-final-form";
import api from "./Axios";
import FormFields from "../Forms/FormFields";
import { Link } from "react-router-dom";
import props from "../Props/LoginProps";
import ErrAlert from "./Alert";
import Collapse from "@material-ui/core/Collapse";
import { Typography, Paper, Grid, CssBaseline } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Validation from "../Forms/Validation";
import { useUpdateUserInfo } from "../context/UserInfoContext";

function Home() {
  const { t } = useTranslation();
  const setUserInfo = useUpdateUserInfo();
  const [open, setOpen] = useState();
  const [msg1, setmsg1] = useState({});

  useEffect(() => {
    setOpen(false);
  }, []);

  const onSubmit = async (values) => {
    async function login() {
      let res = await api.post("/users/signin", values);
      console.log(values)
      if (res.data.err) {
        setmsg1(res.data);
      } else {
        sessionStorage.setItem("UserInfo", res.data.AUth);
        setUserInfo(res.data.AUth);
        setmsg1(res.data);
        //window.location.reload();
      }
    }
    login();
    setOpen(true);
  };

  return (
    <>
      <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
        <CssBaseline />
        <Collapse in={open}>{ErrAlert(msg1)}</Collapse>

        <Typography variant="h4" align="center" component="h1" gutterBottom>
          {t("page_title.login_page")}
        </Typography>

        <Form
          onSubmit={onSubmit}
          initialValues={{ email: "", password: "" }}
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
                <Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    {" "}
                    {t("not_reg")}
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Link
                      to={{
                        pathname: "/auth/signup",
                        state: { Type: 1 },
                      }}
                    >
                      {t("reg.user")}
                    </Link>
                  </Grid>
                  {/* <Grid item style={{ marginTop: 16 }}>
                    <Link
                      to={{
                        pathname: "/auth/signup",
                        state: { Type: 0 },
                      }}
                    >
                      {t("reg.admin")}
                    </Link>
                  </Grid> */}
                </Grid>
              </Paper>
            </form>
          )}
        />
      </div>
    </>
  );
}
export default Home;
