import { Box } from "@mui/material";
import { Main, LoginDiv, RegistrationBtn, HidePasswordBtn } from "./login/style";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ReactLoading from "react-loading";
import Header from '../components/Header'

export default function UserEdit() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const id_application = "48699c22-26a2-4126-9a63-f5d0dfd2768b";
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const urlParams = new URLSearchParams(window.location.search);
  const id_user = parseFloat(urlParams.get("userId"));

  useEffect(() => {
    const res = axios
      .get(
        "https://dart-converter-api.azurewebsites.net/api/user/48699c22-26a2-4126-9a63-f5d0dfd2768b",
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

  function handleEdit(event) {
    setIsLoading(true);
    const requestModel = { id_user, username, password, id_application };
    axios
      .put(
        "https://dart-converter-api.azurewebsites.net/api/user",
        requestModel,
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
        alert("Editado com sucesso!");
        router.push("/home");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  return (
    <>
    <Header/>
    <Main>
      <LoginDiv>
        <h1>Editar Usuário</h1>
        <Box
          component="div"
          noValidate
          sx={{
            display: "grid",
            "& .MuiTextField-root": { m: 0.5 },
          }}
        >
          <TextField
            label="Usuário*"
            id="custom-css-outlined-input"
            variant="outlined"
            size="medium"
            value={username}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box
          component="div"
          noValidate
          style={{ position: "relative" }}
          sx={{
            display: "grid",
            "& .MuiTextField-root": { m: 0.5 },
          }}
        >
          <TextField
            label="Senha*"
            id="custom-css-outlined-input"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            size="medium"
            value={password}
            //   type="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <HidePasswordBtn onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <VisibilityOffIcon style={{ color: "#000" }} />
            ) : (
              <VisibilityIcon style={{ color: "#000" }} />
            )}
          </HidePasswordBtn>
        </Box>
        <RegistrationBtn onClick={() => handleEdit()} disabled={isLoading}>
        {isLoading ? (
            <ReactLoading width={40} color={"grey"} height={40} />
          ) : (
            <label>Editar</label>
          )}
          </RegistrationBtn>
      </LoginDiv>
    </Main>
    </>
  );
}
