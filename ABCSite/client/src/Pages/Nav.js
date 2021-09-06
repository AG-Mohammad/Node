import React from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Box, Typography, Grid, Button, ButtonGroup } from "@material-ui/core";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

function Nav() {
  const { t } = useTranslation();
  let token ={Permissions:{isAdmin:false}}
  let Login = false;

  if (sessionStorage.getItem("UserInfo") != null) {
    token = jwt_decode(sessionStorage.getItem("UserInfo"))
    Login = token.isLogged;
  }

  const deleteSession = (e) => {
    console.log("logout");
    sessionStorage.removeItem("UserInfo");
  };

  return (
    <Grid>
      <Box display="flex" bgcolor="grey.200" p={2} alignItems="center">
        <Grid
          item
          xs={11}
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Typography>
            <Link
              to="/"
              className="navbar-brand"
              style={{ textDecoration: "none" }}
            >
              ABC
            </Link>
          </Typography>
          <Grid item xs={(t("lang")==='ar'?3:4)}>
            <h5>{t("nav_bar.title")}</h5>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Box>
            <Grid
              spacing={1}
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              {console.log("token",token.Permissions.isAdmin)}
              {
                {
                  true: [
                    <Grid item xs={2} key={1}>
                      <Link
                        to="/"
                        key={1}
                        className="nav-item nav-link active p-2"
                        style={{ textDecoration: "none" }}
                      >
                        {t("nav_bar.viewComp")}
                      </Link>
                    </Grid>,
                    <Grid item xs={2} key={2}>
                      <Link
                        to="/complaints/new"
                        className="nav-item nav-link active p-2"
                        style={{ textDecoration: "none" }}
                      >
                        {t("nav_bar.creatComp")}
                      </Link>
                    </Grid>,
                     (token.Permissions.isAdmin?
                     <Grid item xs={2} key={5}>
                     <Link
                       to="/Users"
                       className="nav-item nav-link active p-2"
                       style={{ textDecoration: "none" }}
                     >
                       {t("nav_bar.allUsers")}
                     </Link>
                   </Grid>:
                   null
                   ),
                    <Grid item xs={2} key={3}>
                      <a
                        href="/"
                        className="nav-item nav-link active p-2"
                        onClick={deleteSession}
                        key={4}
                        style={{ textDecoration: "none" }}
                      >
                        {t("nav_bar.signOut")}
                      </a>
                    </Grid>,
                  ],
                  false: (
                    <Grid item xs={2} key={1}>
                      <Link
                        to="/"
                        className="nav-item nav-link active p-2"
                        style={{ textDecoration: "none" }}
                      >
                        {t("nav_bar.signIn")}
                      </Link>
                    </Grid>
                  ),
                }[Login]
              }
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
                  disabled={t("lang")==="ar"? true: false}
                >
                  العربية
                </Button>
                <Button
                  disabled={t("lang")==="en"? true: false}
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
