import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import api from "../components/Axios";
import props from "../Form/FormProps/CRUD";
import FormFields from "../Form/FormFields";
import { Paper, Grid } from "@material-ui/core";
import Validation from "../Form/Validation";
import { useTranslation } from "react-i18next";
import { Form } from "react-final-form";

function RolePerms() {
  const { t } = useTranslation();
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: "flex",
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }));
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
  const classes = useStyles();
  const [value, setValue] = useState();
  const [roles, setRoles] = useState([]);
  const [perms, setPerms] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  useEffect(() => {
    async function getdata() {
      let role = await api.get("/roles");
      setRoles(role.data);
      let perm = await api.get("/permission");
      setPerms(perm.data);
    }
    getdata();
  }, []);

  const [useRole, setRole] = useState([]);

  useEffect(() => {
    async function getdata() {
      let res = await api.post("/rolePerms/role", { value: value });
      if(res.data!=null){
      setRole(res.data.Permission);}
    }
    getdata();
  }, [value]);

  const onSubmit = async (values) => {
    async function update() {
      console.log(values);
      let res = await api.post("/rolePerms/add", values);
      console.log(res.data);
    }
    update();
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {roles.map((role, TabsKey) => {
          return (
            <Tab
              label={role.roleName}
              value={role.roleName}
              {...a11yProps(role.roleName)}
              key={TabsKey}
            />
          );
        })}
      </Tabs>

      {roles.map((role, key1) => {
        return (
          <Form
            onSubmit={onSubmit}
            initialValues={useRole}
            key={key1}
            validate={(values) => {
              return Validation(values, props, t, 1);
            }}
            render={({ handleSubmit, form, submitting, values }) => (
              <form onSubmit={handleSubmit} noValidate>
                <TabPanel value={value} index={role.roleName} key={key1}>
                  {perms.map((perm, key) => {
                    return (
                      <div key={key}>
                        <Paper style={{ padding: 16 }}>
                          <h3>{perm.permission}</h3>

                          <Grid container alignItems="flex-start" spacing={4}>
                            {props.map((item, idx) => (
                              <Grid item xs={item.size} key={idx}>
                                <FormFields
                                  key={idx}
                                  type={item.inputType}
                                  name={perm.permission}
                                  value={item.value}
                                  label={
                                    t("lang") === "en"
                                      ? item.label
                                      : item.arlabel
                                  }
                                  data={
                                    t("lang") === "en" ? item.data : item.ardata
                                  }
                                  submitting={submitting}
                                  autocom={item.autocom}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </Paper>
                      </div>
                    );
                  })}
                  <button onClick={() => (values.role = role.roleName)}>
                    Update
                  </button>
                </TabPanel>
              </form>
            )}
          />
        );
      })}
    </div>
  );
}

export default RolePerms;
