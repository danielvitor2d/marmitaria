import { render } from "@testing-library/react-native";

import Registration from "../registration";

describe("test registration page", () => {
  it("snapshot test", () => {
    const page = render(<Registration />);

    expect(page).toMatchSnapshot();
  });

  it("Testando botão de cadastrar", () => {
    const page = render(<Registration />);

    expect(page.getByTestId("registerButton")).toBeDefined();
  });

  it("Testando botão de voltar", () => {
    const page = render(<Registration />);

    expect(page.getByTestId("goBack")).toBeDefined();
  });

  it("Testando campo de name", () => {
    const page = render(<Registration />);

    expect(page.getByTestId("name")).toBeDefined();
  });

  it("Testando campo de último nome", () => {
    const page = render(<Registration />);

    expect(page.getByTestId("lastname")).toBeDefined();
  });

  it("Testando campo de endereço", () => {
    const page = render(<Registration />);

    expect(page.getByTestId("address")).toBeDefined();
  });

  it("Testando campo de e-mail", () => {
    const page = render(<Registration />);

    expect(page.getByTestId("email")).toBeDefined();
  });

  it("Testando campo de password", () => {
    const page = render(<Registration />);

    expect(page.getByTestId("pwd")).toBeDefined();
  });
});
