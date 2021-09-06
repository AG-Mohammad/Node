import api from "../components/Axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import {
  CssBaseline,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

function AllProd() {
  const { t } = useTranslation();
  const [ListOfProducts, setListOfProducts] = useState([]);
  const info = jwt_decode(sessionStorage.getItem("UserInfo"));

  useEffect(() => {
    async function getComp() {
      let res = await api.get("/products");
      setListOfProducts(res.data);
    }

    getComp();
  }, []);

  const useStyles = makeStyles({
    root: {
      margin: 5,
      maxWidth: 250,
      minWidth: 250,
    },
  });

  const classes = useStyles();

  return (
    <>
      <CssBaseline />

      <Box
        display="flex"
        justifyContent={t("lang") === "ar" ? "flex-end" : "flex-start"}
      >
        <Box p={1}>
          <h5 style={t("lang") === "ar" ? { right: 0 } : {}}>
            {
              {
                ar: (
                  <>
                    ({info.email}) {info.CompanyName} {t("greeting")}
                  </>
                ),
                en: (
                  <>
                    {t("greeting")} {info.CompanyName} ({info.email})
                  </>
                ),
              }[t("lang")]
            }
          </h5>
        </Box>
      </Box>

      <br />
      <div>
        <Grid container justifyContent="center">
          {ListOfProducts.map((value, key) => {
            return (
              <Link
                to={{
                  pathname: "/product",
                  state: { Type: value.name },
                }}
                key={key}
                className="nav-item nav-link active p-2"
                style={{ textDecoration: "none" }}
              >
                <Card className={classes.root}>
                  <CardActionArea>
                    <img
                      className={classes.root}
                      src={value.pic}
                      alt={value.name}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        align="center"
                      >
                        {value.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            );
          })}
        </Grid>
      </div>
    </>
  );
}
export default AllProd;
