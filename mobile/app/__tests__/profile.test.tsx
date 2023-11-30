import { render } from "@testing-library/react-native";

import AuthContext, { UserType } from "../../src/contexts/auth";
import Profile from "../profile";

jest.mock("../../src/assets/profile.svg", () => "string qualquer");
jest.mock("../../src/assets/mini_profile.svg", () => "outra string qualquer");

describe("test profile page", () => {
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
          signIn: async () => ({ logged: true, isAdmin: false }),
          update: async () => true,
          setSuggestion: () => {},
          suggestion: {},
        }}
      >
        <Profile />
      </AuthContext.Provider>
    );
  });

  it("snapshot test", () => {
    expect(page).toMatchSnapshot();
  });

  it("Testando botão de voltar", () => {
    expect(page.getByTestId("goBack")).toBeDefined();
  });

  it("Testando botão de salvar alterações", () => {
    expect(page.getByTestId("saveUpdates")).toBeDefined();
  });
});
