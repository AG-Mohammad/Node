import React from "react";
import { Form } from "react-final-form";
import FormFields from "../Forms/Login";

import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
} from "@material-ui/core";

function Home() {
  const tags = [
    {
      inputType: "text",
      name: "Test",
      label: "Text test",
    },

    {
      inputType: "select",
      name: "Test1",
      label: "Select test",
      data: [{ value: "HS" }, { value: "BS" }],
    },
  ];
  const validate = (values) => {
    const errors = {};

    return errors;
  };

  const onSubmit = async (valuse) => {
    console.log(valuse);
  };

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Complaints Management Portal
      </Typography>
      here
      {}
      <Form
        onSubmit={onSubmit}
        initialValues={{ email: "", password: "" }}
        validate={validate}
        render={({ handleSubmit, form, submitting, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={4}>
                <Grid item xs={12} key={1}>
                  {tags.map((item, idx) => (
                    <FormFields
                      key={idx}
                      type={item.inputType}
                      name={item.name}
                      label={item.label}
                      data={item.data}
                    />
                  ))}
                </Grid>
                <Grid item xs={12} style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </div>
  );
}
export default Home;
