import { useState } from "react";
import Link from "next/link";
import useLogin from "@hooks/useLogin";

interface Props {}

const Login = ({}: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isOk, isPending, hasError } = useLogin();

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: 250,
          alignItems: "center",
          gap: 25,
          margin: "auto",
          marginTop: 350,
        }}
        onSubmit={e => {
          e.preventDefault();
          login(email, password);
        }}
      >
        <label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button>login</button>
        {isPending && "login..."}
        {hasError && "oops :("}
        {isOk && "yes!"}
        <Link href={"/protected-page"}>
          <a style={{ color: "blue", textDecoration: "underline" }}>
            protected page
          </a>
        </Link>
      </form>
    </div>
  );
};

export default Login;
