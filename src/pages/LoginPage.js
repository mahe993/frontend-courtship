import React, { useEffect } from "react";

const LoginPage = () => {
  //onMount get all user authkey and put into context
  useEffect(() => {
    console.log("on successful login, get userauthkey and put into context");
  }, []);

  return <div>LoginPage</div>;
};

export default LoginPage;
