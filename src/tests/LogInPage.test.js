import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, fireEvent, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import rootReducer from "../reducers";
import { AuthProvider } from "../auth";
import LogInPage from "../components/LogInPage";

describe("LogInPage", () => {
  const testStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

  test("renders the login form", () => {
    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <AuthProvider>
            <LogInPage />
          </AuthProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Employee Polls")).toBeInTheDocument();
    expect(screen.getByTestId("username-field")).toBeInTheDocument();
    expect(screen.getByTestId("password-field")).toBeInTheDocument();
    expect(screen.getByTestId("login-btn")).toBeInTheDocument();
  });

  test("logs in a user with correct credentials", async () => {
    const component = render(
      <Provider store={testStore}>
        <MemoryRouter>
          <AuthProvider>
            <LogInPage />
          </AuthProvider>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(component.getByTestId("username-field"), {
      target: { value: "sarahedo" },
    });
    fireEvent.change(component.getByTestId("password-field"), {
      target: { value: "password123" },
    });
    fireEvent.click(component.getByTestId("login-btn"));

    expect(component.getByText("sarahedo")).toBeInTheDocument();
  });
});
