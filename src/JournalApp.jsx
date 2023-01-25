import React from "react";
import { AuthRoutes } from "./auth/routes/AuthRoutes";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";

export const JournalApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
