import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "../recursica_variables_scoped.css";
import "./recursica_fonts.css";
import "@recursica/adapter-mantine-v8/style.css";
import { MantineProvider } from "@mantine/core";
import { RecursicaThemeProvider } from "@recursica/adapter-mantine-v8";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";

// There is no real backend for these static prototypes — /api/* requests
// are always intercepted by MSW, in dev and in production builds alike.
async function enableMocking() {
  const { worker } = await import("./api/worker");
  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <MantineProvider>
        <RecursicaThemeProvider theme="light">
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <App />
          </BrowserRouter>
        </RecursicaThemeProvider>
      </MantineProvider>
    </StrictMode>,
  );
});
