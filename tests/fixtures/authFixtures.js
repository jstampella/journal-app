export const initialState = {
  status: "checking", //checking
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};
export const authenticatedState = {
  status: "authenticated", //checking
  uid: "123ABC",
  email: "demo@google.com.ar",
  displayName: "Demo User",
  photoURL: "https://demo.jpg",
  errorMessage: null,
};
export const notAuthenticatedState = {
  status: "not-authenticated", //checking
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const demoUser = {
  uid: "ABC123",
  email: "demo@google.com",
  displayName: "Demo User",
  photoURL: "https://foto.jpg",
};
