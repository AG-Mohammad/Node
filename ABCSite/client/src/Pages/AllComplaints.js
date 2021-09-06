import api from "./Axios";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CssBaseline, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@material-ui/core";

function AllComp() {
  const { t } = useTranslation();
  const [ListOfComplaints, setListOfComplaints] = useState([]);
  const info = jwt_decode(sessionStorage.getItem("UserInfo"));
  console.log(info)
  
  useEffect(() => {
    async function getComp() {
      let res = await api.get("/complaints", {
        headers: {
          token: sessionStorage.getItem("UserInfo"),
        },
      });
      if (res.data.err) {
        console.log(res.data);
        alert(res.data.err);
      } else if (res.data) {
        setListOfComplaints(res.data);
      }
    }
    getComp();
  }, []);

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
                    ({info.mail}) {info.name} {t("greeting")}
                  </>
                ),
                en: (
                  <>
                    {t("greeting")} {info.name} ({info.mail})
                  </>
                ),
              }[t("lang")]
            }
          </h5>
        </Box>
      </Box>

      <br />
      <div
        style={{ padding: 16, margin: "auto", backgroundColor: "lightgray" }}
      >
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              {
                {
                  ar: (
                    <TableRow>
                      <TableCell>{t("table.status")}</TableCell>
                      <TableCell>{t("table.severity")}</TableCell>
                      <TableCell>{t("table.compId")}</TableCell>
                      <TableCell>{t("table.compType")}</TableCell>
                      <TableCell>{t("table.subject")}</TableCell>
                    </TableRow>
                  ),
                  en: (
                    <TableRow>
                      <TableCell>{t("table.subject")}</TableCell>
                      <TableCell>{t("table.compType")}</TableCell>
                      <TableCell>{t("table.compId")}</TableCell>
                      <TableCell>{t("table.severity")}</TableCell>
                      <TableCell>{t("table.status")}</TableCell>
                    </TableRow>
                  ),
                }[t("lang")]
              }
            </TableHead>
            {
              {
                ar: (
                  <TableBody>
                    {ListOfComplaints.map((value, key) => {
                      return (
                        <TableRow key={value.id}>
                          <TableCell>{value.status}</TableCell>
                          <TableCell>{value.severity}</TableCell>
                          <TableCell>
                            <Link
                              to={{
                                pathname: "/complaints",
                                state: { id: value.id },
                              }}
                            >
                              {value.id}
                            </Link>
                          </TableCell>
                          <TableCell>{value.complainType}</TableCell>
                          <TableCell component="th" scope="row">
                            <Link
                              to={{
                                pathname: "/complaints",
                                state: { id: value.id },
                              }}
                            >
                              {value.subject}
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                ),
                en: (
                  <TableBody>
                    {ListOfComplaints.map((value, key) => {
                      return (
                        <TableRow key={value.id}>
                          <TableCell component="th" scope="row">
                            <Link
                              to={{
                                pathname: "/complaints",
                                state: { id: value.id },
                              }}
                            >
                              {value.subject}
                            </Link>
                          </TableCell>
                          <TableCell>{value.complainType}</TableCell>
                          <TableCell>
                            <Link
                              to={{
                                pathname: "/complaints",
                                state: { id: value.id },
                              }}
                            >
                              {value.id}
                            </Link>
                          </TableCell>
                          <TableCell>{value.severity}</TableCell>
                          <TableCell>{value.status}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                ),
              }[t("lang")]
            }
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
export default AllComp;
