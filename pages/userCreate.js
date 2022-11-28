import { Box } from "@mui/material";
import { Main, LoginDiv, RegistrationBtn, HidePasswordBtn } from "./login/style";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReactLoading from "react-loading";
import Header from '../components/Header'

export default function UserCreate() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const id_application = "48699c22-26a2-4126-9a63-f5d0dfd2768b";
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

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
        alert("Novo Usuário Criado!");
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
            <h1>Cadastro de Usuários</h1>
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
          <RegistrationBtn onClick={() => handleRegistration()}  disabled={isLoading}>
          {isLoading ? (
            <ReactLoading width={40} color={"grey"} height={40} />
          ) : (
            <label>Cadastrar</label>
          )}
          </RegistrationBtn>
        </LoginDiv>
    </Main>
    </>
  );
}
