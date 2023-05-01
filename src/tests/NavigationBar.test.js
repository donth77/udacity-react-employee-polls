import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import * as router from "react-router";
import { MemoryRouter } from "react-router-dom";
import rootReducer from "../reducers";
import { AuthProvider } from "../auth";
import NavigationBar from "../components/NavigationBar";

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});
const testStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

const jsxToRender = (
  <Provider store={testStore}>
    <MemoryRouter>
      <AuthProvider>
        <NavigationBar />
      </AuthProvider>
    </MemoryRouter>
  </Provider>
);

describe("NavigationBar component", () => {
  test("matches snapshot", () => {
    const component = render(
      <Provider store={testStore}>
        <MemoryRouter>
          <AuthProvider>
            <NavigationBar />
          </AuthProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  test("navigates to home page", () => {
    const component = render(jsxToRender);

    fireEvent.click(component.getByTestId("nav-Home"));
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/");
  });

  test("navigates to leaderboard page", () => {
    const component = render(jsxToRender);

    fireEvent.click(component.getByTestId("nav-Leaderboard"));
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/leaderboard");
  });

  test("navigates to add page", () => {
    const component = render(jsxToRender);

    fireEvent.click(component.getByTestId("nav-Add"));
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/add");
  });
});
