import { Box } from "@mui/material";
import Head from "next/head";
import {
  Content,
  LoginDiv,
  LoginBtn,
  RegistrationBtn,
  HidePasswordBtn,
} from "./style";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const id_application = "48699c22-26a2-4126-9a63-f5d0dfd2768b";
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (event) => {
    setIsLoading(true);
    const jsonLogin = { username, password, id_application };
    const res = axios
      .post(
        "https://dart-converter-api.azurewebsites.net/api/auth/token",
        jsonLogin,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        if (!res.data.access_token) return;
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("user", res.data.user.id_user);
        router.push("/home");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("ERROR:", error);
        setIsLoading(false);
      });
  };

  function handleRegistration(event) {
    setIsLoading(true);
    const requestModel = { username, password, id_application };
    axios
      .post(
        "https://dart-converter-api.azurewebsites.net/api/user",
        requestModel,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        // window.location.href = "/";
        alert("Novo Usuário Criado!");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        // setComparativeSingUp(error);
      });
  }

  return (
    <Content>
      <LoginDiv>
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
            size="medium"
            value={password}
            type={showPassword ? "text" : "password"}
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
        <LoginBtn onClick={() => handleSubmit()}>
          {isLoading ? (
            <ReactLoading width={40} height={40} />
          ) : (
            <label>Entrar</label>
          )}
        </LoginBtn>
        <RegistrationBtn onClick={() => handleRegistration()}>
        {isLoading ? (
            <ReactLoading width={40} color={"grey"} height={40} />
          ) : (
            <label>Cadastrar</label>
          )}
        </RegistrationBtn>
      </LoginDiv>
    </Content>
  );
}
