import api from "./Axios";
import { React, useEffect, useState } from "react";
import { CssBaseline } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@material-ui/core";

export default function Permissions() {
  const { t } = useTranslation();
  const [listOfUsers, setListOfUsers] = useState([]);
  
  useEffect(() => {
    async function getUsers() {
      let res = await api.get("/users");
      if (res.status === 200) {
        setListOfUsers(res.data);
      }
    }

    getUsers();
  }, []);

  return (
    <div>
      <CssBaseline />
     
      <div
        style={{ padding: 16, margin: "auto", backgroundColor: "lightgray" }}
      >
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">{t("table1.users")}</TableCell>
                <TableCell align="center">{t("table1.id")}</TableCell>
                <TableCell align="center">{t("table1.complaints")}</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listOfUsers.map((item, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell align="center" size="small">
                      {item.fName}
                    </TableCell>
                    <TableCell align="center">{item.id}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                    <TableCell align="center" size="small">
                      {" "}
                      <Link
                        to={{
                          pathname: "/Users/Permissions/",
                          state: { item: item },
                        }}
                      >
                        Edit Permissions
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
