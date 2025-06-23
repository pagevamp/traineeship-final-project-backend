import React from "react";
import LoginComponent from "@/features/login";

export async function generateMetadata() {
  return {
    title: "Login | Arctern Express",
  };
}
const Login = () => {
  return <LoginComponent />;
};

export default Login;
