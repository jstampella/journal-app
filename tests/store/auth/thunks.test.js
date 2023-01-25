import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from "../../../src/firebase/providers";
import {
  checkingAuthentication,
  checkingCredentials,
  login,
  logout,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../src/store/auth";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers.js");

describe("Pruebas en AuthThunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());
  test("debe de invocar el checkingCredentials", async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSignIn debe de llamar checkingCredentials y login", async () => {
    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSignIn debe de llamar checkingCredentials y logout - Error", async () => {
    const loginData = { ok: false, errorMessage: "un error en google" };
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test("startLoginWithEmailPassword debe de llamar checkingCred y login", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startLoginWithEmailPassword debe de llamar checkingCred y logout - error", async () => {
    const loginData = { ok: false, errorMessage: "error en la password" };
    const formData = { email: demoUser.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test("startCreatingUserWithEmailPassword debe de llamar checkingCred, registerUserWithEmailPassword y login", async () => {
    const formData = {
      email: demoUser.email,
      password: "123456",
      displayName: demoUser.displayName,
    };
    const loginData = { ok: true, ...demoUser };

    await registerUserWithEmailPassword.mockResolvedValue(loginData);
    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));
  });

  test("startLogout debe de llamar logoutfirebase, clearNotes y logout", async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
