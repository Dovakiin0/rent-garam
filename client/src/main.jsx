import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

const appendCache = createEmotionCache({ key: "mantine", prepend: false });

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider emotionCache={appendCache} withGlobalStyles withNormalizeCSS>
    <NotificationsProvider position="top-right" zIndex={6969}>
      <App />
    </NotificationsProvider>
  </MantineProvider>
);
