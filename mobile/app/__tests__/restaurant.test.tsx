import { render } from "@testing-library/react-native";

import AuthContext, { UserType } from "../../src/contexts/auth";
import Restaurant from "../restaurant";

jest.mock("../../src/assets/profile.svg", () => "string qualquer");
jest.mock("../../src/assets/restaurant.png", () => "outra string qualquer");
jest.mock("../../src/assets/mini_profile.svg", () => "outra string qualquer");

describe("test login page", () => {
  let page: any;

  beforeEach(() => {
    page = render(
      <AuthContext.Provider
        value={{
          isAdmin: false,
          meal: null,
          rest: {
            address: '',
            id: '',
            isSuggestion: false,
            meals: [],
            name: '',
            paymentforms: '',
            value: '',
          },
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
        <Restaurant />
      </AuthContext.Provider>
    );
  });

  it("snapshot test", () => {
    expect(page).toMatchSnapshot();
  });

  it("Testando botão de voltar", () => {
    expect(page.getByTestId("goBack")).toBeDefined();
  });

  it("Testando botão de perfil", () => {
    expect(page.getByTestId("profile")).toBeDefined();
  });

  it("Testando botão de sugerir nova marmita", () => {
    expect(page.getByTestId("suggestNewMeal")).toBeDefined();
  });

  it("Testando lista de refeições", () => {
    expect(page.getByTestId("mealsList")).toBeDefined();
  });
});
