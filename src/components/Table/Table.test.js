import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Table from "./Table";

describe("Table", () => {
  const tableData = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      message: "Hello there!",
    },
  ];

  it("renders table headers and rows correctly", () => {
    render(<Table data={tableData} />);

    // Check for table headers
    expect(screen.getByText("First name")).toBeInTheDocument();
    expect(screen.getByText("Last name")).toBeInTheDocument();
    expect(screen.getByText("E-mail")).toBeInTheDocument();
    expect(screen.getByText("Message")).toBeInTheDocument();

    // Check for table rows and data
    tableData.forEach((item) => {
      expect(screen.getByText(item.firstName)).toBeInTheDocument();
      expect(screen.getByText(item.lastName)).toBeInTheDocument();
      expect(screen.getByText(item.email)).toBeInTheDocument();
      expect(screen.getByText(item.message)).toBeInTheDocument();
    });
  });
});
