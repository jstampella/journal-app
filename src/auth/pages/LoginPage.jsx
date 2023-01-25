import { useDispatch, useSelector } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";
import { Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth";
import { useMemo } from "react";

const formdata = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(formdata);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    console.log("onGoogle");
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={onSubmit}
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              sx={{ mt: 2 }}
              name="password"
              value={password}
              onChange={onInputChange}
            />
            <Grid
              display={!!errorMessage ? "" : "none"}
              sx={{ mt: 1 }}
              container
            >
              <Grid item xs={12} sm={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Button
                  disabled={isAuthenticating}
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  disabled={isAuthenticating}
                  onClick={onGoogleSignIn}
                  variant="contained"
                  fullWidth
                >
                  <Google /> <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent={"end"}>
            <Link component={LinkRouter} color={"inherit"} to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
