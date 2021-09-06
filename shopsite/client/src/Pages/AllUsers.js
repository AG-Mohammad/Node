import api from "../components/Axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@material-ui/core";

export default function Permissions() {
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
    <>
      <div
        style={{ padding: 16, margin: "auto", backgroundColor: "lightgray" }}
      >
        <TableContainer>
          <Table aria-label="simple table">
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
                     {item.role}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
