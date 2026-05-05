import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LoginScreen from "../app/login";

describe("LoginScreen", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    // Check for title
    expect(getByText("Bem-vindo de volta!")).toBeTruthy();

    // Check for inputs
    expect(getByPlaceholderText("Digite seu usuário")).toBeTruthy();
    expect(getByPlaceholderText("Digite sua senha")).toBeTruthy();

    // Check for button
    expect(getByText("Entrar")).toBeTruthy();
  });

  it("toggles password visibility", () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    const passwordInput = getByPlaceholderText("Digite sua senha");
    const toggleButton = getByText("Show");

    expect(passwordInput).toBeTruthy();
    expect(toggleButton).toBeTruthy();

    // Toggle
    fireEvent.press(toggleButton);
    expect(getByText("Hide")).toBeTruthy();

    // Toggle back
    fireEvent.press(getByText("Hide"));
    expect(getByText("Show")).toBeTruthy();
  });
});
