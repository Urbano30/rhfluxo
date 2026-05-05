import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  it("renders correctly", () => {
    render(<LoginForm />);

    // Check for user input
    expect(screen.getByLabelText(/Usuário/i)).toBeInTheDocument();

    // Check for password input
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/Senha/i) as HTMLInputElement;
    expect(passwordInput.type).toBe("password");

    // The toggle button is the one next to the password input, let's find it by role
    // It's the button inside the password relative div, there's multiple buttons in the form
    const toggleButtons = screen.getAllByRole("button");
    const toggleButton = toggleButtons[0]; // First button is the eye toggle

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password");
  });
});
