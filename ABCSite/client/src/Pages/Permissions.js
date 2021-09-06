import React, { useEffect, useState } from "react";
import Props from "../Props/Permissions";
import { Form } from "react-final-form";
import FormFields from "../Forms/FormFields";
import { Paper, Grid, Divider } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import api from "../Pages/Axios";

export default function Permissions() {
  const { t } = useTranslation();
  const User = useLocation().state.item;
  const [res, setRes] = useState();
  let history = useHistory();
  useEffect(() => {
    async function perms() {
      setRes(await api.post("/permissions", { id: User.id }));
      if (res != null)
        sessionStorage.setItem("permis", JSON.stringify(res.data));
    }
    perms();
  }, [User.id]);

  const onSubmit = async (values) => {
    async function updatePerms() {
      let res = await api.put("/permissions/update", values);
      if (res.status === 200) {
        history.push("/");
      }
    }
    
    updatePerms()
  };
  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        <Grid>
          <h3>{User.fName}</h3>
        </Grid>
        <Grid>({User.email})</Grid>
        <Divider />
        <Grid>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              Admin: res != null ? res.data.isAdmin : 0,
              ViewComp: res != null ? res.data.ViewComp : 0,
              CreateComp: res != null ? res.data.CreatComp : 0,
              UserId: res != null ? res.data.UserID : 0,
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
                    {Props.map((item, idx) => (
                      <Grid item xs={item.size} key={idx}>
                        <FormFields
                          key={idx}
                          type={item.inputType}
                          name={item.name}
                          label={t("lang") === "en" ? item.label : item.arlabel}
                          data={t("lang") === "en" ? item.data : item.ardata}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </form>
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
}
