import React from "react";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import UserStack from "./UserStack";
import AuthStack from "./AuthStack";
import UserRealStack from "./UserRealStack";

export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <UserRealStack /> : <AuthStack />;
}
