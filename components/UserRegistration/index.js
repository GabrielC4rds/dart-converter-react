import { Content, CreateNewUserBtn } from "./style";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UserRegistration() {
  const [username, setUsername] = useState();
  const [data, setData] = useState([]);
  const router = useRouter();

  const handleDelete = (id) => {
    const res = axios
      .delete(
        `https://dart-converter-api.azurewebsites.net/api/user/${id}/48699c22-26a2-4126-9a63-f5d0dfd2768b`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        // setUsername(res.data.username);
        window.location.reload(true);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  };

  useEffect(() => {
    const res = axios
      .get(
        "https://dart-converter-api.azurewebsites.net/api/user/48699c22-26a2-4126-9a63-f5d0dfd2768b",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              localStorage.getItem("token")
          },
        }
      )
      .then((res) => {
        setData(
          res.data.map((row) => {
            return {
              id: row.id_user,
              user: row.username,
              password: row.password || "?",
              application: row.id_application,
            };
          })
        );
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
    const id_user = localStorage.getItem("user");
    const response = axios
      .get(
        `https://dart-converter-api.azurewebsites.net/api/user/${id_user}/48699c22-26a2-4126-9a63-f5d0dfd2768b`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }, []);

  return (
    <Content>
      <h1>Olá {username},</h1>
      <h1>Segue a lista de usuários cadastrados no sistema</h1>
      <CreateNewUserBtn onClick={() => router.push("/userCreate")} >
        CRIAR NOVO USUÁRIO
      </CreateNewUserBtn>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Usuário</TableCell>
              <TableCell>Senha</TableCell>
              <TableCell>Aplicação</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell 
                // onChange={handleChange} 
                value={row.user}>
                  {row.user}
                </TableCell>
                <TableCell 
                // onChange={handleChange}
                 value={row.password}>
                  {row.password}
                </TableCell>
                <TableCell>{row.application}</TableCell>
                <TableCell>
                  <EditIcon
                    onClick={() => router.push(`/userEdit?userId=${row.id}`)}
                    style={{ color: "#673ab7", cursor: "pointer" }}
                  />{" "}
                  <DeleteIcon
                    onClick={() => handleDelete(row.id)}
                    style={{ color: "red", cursor: "pointer" }}
                  />{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Content>
  );
}
