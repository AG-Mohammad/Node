import React from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Box, Typography, Grid, Button, ButtonGroup } from "@material-ui/core";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Can from "./components/components";

function Nav() {
  const { t } = useTranslation();
  let token = {};
  let Login = false;

  if (sessionStorage.getItem("UserInfo") != null) {
    token = jwt_decode(sessionStorage.getItem("UserInfo"));
    token.Permissions = false;
    Login = token.isLogged;
  }

  const deleteSession = (e) => {
    console.log("logout");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("role");
  };

  return (
    <Grid>
      <Box display="flex" bgcolor="grey.200" p={2} alignItems="center">
        <Grid
          item
          xs={11}
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography>
            <Link
              to="/"
              className="navbar-brand"
              style={{ textDecoration: "none" }}
            >
              {t("nav_bar.title")}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Box>
            <Grid
              spacing={1}
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Can I="Read" a="Product">
                <Grid item xs={2} key={11}>
                  <Link
                    to="/"
                    key={1}
                    className="nav-item nav-link active p-2"
                    style={{ textDecoration: "none" }}
                  >
                    {t("nav_bar.viewComp")}
                  </Link>
                </Grid>
              </Can>

              <Can I="Create" a="Product">
                {" "}
                <Grid item xs={2} key={2}>
                  <Link
                    to="/new"
                    className="nav-item nav-link active p-2"
                    style={{ textDecoration: "none" }}
                  >
                    {t("nav_bar.creatComp")}
                  </Link>
                </Grid>
              </Can>

              <Can I="manage" on="all">
                {" "}
                <Grid item xs={2} key={5}>
                  <Link
                    to="/adminpanel"
                    className="nav-item nav-link active p-2"
                    style={{ textDecoration: "none" }}
                  >
                    Admin Panel
                  </Link>
                </Grid>
              </Can>
              <Can I="Update" a="User">
                {" "}
                <Grid
                  item
                  xs={2}
                  key={3}
                  style={Login ? {} : { display: "none" }}
                >
                  <a
                    href="/"
                    className="nav-item nav-link active p-2"
                    onClick={deleteSession}
                    key={4}
                    style={{ textDecoration: "none" }}
                  >
                    {t("nav_bar.signOut")}
                  </a>
                </Grid>
              </Can>
              <Can I="Create" a="User">
                <Grid
                  item
                  xs={2}
                  key={1}
                  style={Login ? { display: "none" } : {}}
                >
                  <Link
                    to="/"
                    className="nav-item nav-link active p-2"
                    style={{ textDecoration: "none" }}
                  >
                    {t("nav_bar.signIn")}
                  </Link>
                </Grid>
              </Can>
              <ButtonGroup
                size="small"
                orientation="vertical"
                aria-label="vertical contained primary button group"
                variant="text"
              >
                <Button
                  onClick={() => {
                    i18next.changeLanguage("ar");
                    sessionStorage.setItem("lang", "ar");
                  }}
                  disabled={t("lang") === "ar" ? true : false}
                >
                  العربية
                </Button>
                <Button
                  disabled={t("lang") === "en" ? true : false}
                  onClick={() => {
                    i18next.changeLanguage("en");
                    sessionStorage.setItem("lang", "en");
                  }}
                >
                  English
                </Button>
              </ButtonGroup>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}
export default Nav;
