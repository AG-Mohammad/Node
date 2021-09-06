import api from "./Axios";
import { React, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import FormFields from "../Forms/FormFields";
import props from "../Props/CompForm";
import { Form } from "react-final-form";
import { Typography, Grid, CssBaseline, Paper } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import { useTranslation } from "react-i18next";

function ViewComp() {
  const { t } = useTranslation();

  let history = useHistory();
  const [complaintDetail, setComplaintDetail] = useState("");
  const id = useLocation().state.id;
  const token = jwt_decode(sessionStorage.getItem("UserInfo"));
  let admin = token.Permissions.isAdmin;

  useEffect(() => {
    async function getComp() {
      let res = await api.get("/complaints/".concat(id));
      if (!res.data.err) {
        setComplaintDetail(res.data[0]);
      }
    }
    async function adminView() {
      await api.put(
        "/complaints/".concat(id),
        { id: token.id },
        { headers: { token: sessionStorage.getItem("UserInfo") } }
      );
    }

    if (admin) {
      adminView();
    }

    getComp();
  }, [admin, id, token.id]);

  const onSubmit = async (values) => {
    async function updateStat() {
      await api.put(
        "/complaints/updatestatus/".concat(id),
        { changeStat: values.stauts },
        { headers: { token: sessionStorage.getItem("UserInfo") } }
      );
    }
    updateStat();
    history.push("/");
  };

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="left" component="h1" gutterBottom>
        {t("page_title.comp_details")}
      </Typography>

      <Form
        onSubmit={onSubmit}
        initialValues={{
          subject: complaintDetail.subject,
          stauts: complaintDetail.status,
          complaintId: complaintDetail.id,
          severity: complaintDetail.severity,
          complaintType: complaintDetail.complainType,
          openedBy: complaintDetail.openedBy,
          details: complaintDetail.description,
        }}
        render={({ handleSubmit, form, submitting, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={6}>
                {props
                  .filter((item) => admin || item.shown)
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
export default ViewComp;
