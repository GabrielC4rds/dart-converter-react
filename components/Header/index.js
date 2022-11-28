import Head from "next/head";
import { Content } from "./style";
import { useRouter } from "next/router";

export default function Header() {

  const LogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  }
  const router = useRouter();
  return (
    <Content>
      <a href="/home">
        Dart Converter
      </a>
      <button onClick={() => LogOut()}>Sair</button>
    </Content>
  );
}
