import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not found";

    // cleanup to revert it when leave
    return () => {
      document.title = "CareerHive | Connect & Grow";
    };
  }, []);

  return (
    <main
      style={{
        textAlign: "center",
        marginTop: "50px",
        color: "var(--color-dark--1)",
      }}
    >
      <h1>404</h1>
      <p>Page Not Found :(</p>
    </main>
  );
}
