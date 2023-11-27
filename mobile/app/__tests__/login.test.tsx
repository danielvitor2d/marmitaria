import { render } from "@testing-library/react-native";

import AuthContext, { UserType } from "../../src/contexts/auth";
import Login from "../login";

describe("test login page", () => {
  let page: any;

  beforeEach(() => {
    page = render(
      <AuthContext.Provider
        value={{
          isAdmin: false,
          meal: null,
          rest: null,
          signed: true,
          user: {} as UserType,
          logout: async () => {},
          refetchUser: async () => {},
          setMeal: () => {},
          setRest: () => {},
          signIn: async (email, pwd) => ({ logged: true, isAdmin: false }),
          update: async (user) => true,
        }}
      >
        <Login />
      </AuthContext.Provider>
    );
  });

  it("snapshot test", () => {
    expect(page).toMatchSnapshot();
  });

  it("Testando botão de logar", () => {
    expect(page.getByTestId("login")).toBeDefined();
  });

  it("Testando botão de logar com google", () => {
    expect(page.getByTestId("loginWithG")).toBeDefined();
  });

  it("Testando botão de cadastrar", () => {
    expect(page.getByTestId("registerButton")).toBeDefined();
  });

  it("Testando botão de esqueci a senha", () => {
    expect(page.getByTestId("forgot_password")).toBeDefined();
  });
});
