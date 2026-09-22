import { Suspense } from "react";
import LoginClient from "./LoginClient";

export const metadata = {
  title: "Login - WatchWave",
};

export default function LoginPage() {
  return (
    <Suspense>
      <LoginClient />
    </Suspense>
  );
}
