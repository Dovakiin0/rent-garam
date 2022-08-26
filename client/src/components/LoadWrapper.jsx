import React from "react";
import { LoadingOverlay } from "@mantine/core";

function LoadWrapper({ loading }) {
  return (
    <LoadingOverlay
      loaderProps={{ size: "md", color: "orange", variant: "bars" }}
      overlayOpacity={0.9}
      overlayColor="#c5c5c5"
      visible={loading}
    />
  );
}

export default LoadWrapper;
