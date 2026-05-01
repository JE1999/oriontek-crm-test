import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ClientAvatar } from "@/components/clients/ClientAvatar";

describe("ClientAvatar", () => {
  it("renders the initials correctly", () => {
    render(<ClientAvatar firstName="John" lastName="Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("applies the correct size classes", () => {
    const { rerender } = render(<ClientAvatar firstName="J" lastName="D" size="sm" />);
    expect(screen.getByText("JD")).toHaveClass("h-8 w-8");

    rerender(<ClientAvatar firstName="J" lastName="D" size="lg" />);
    expect(screen.getByText("JD")).toHaveClass("h-16 w-16");
  });

  it("applies the correct shape classes", () => {
    const { rerender } = render(<ClientAvatar firstName="J" lastName="D" shape="circle" />);
    expect(screen.getByText("JD")).toHaveClass("rounded-full");

    rerender(<ClientAvatar firstName="J" lastName="D" shape="square" />);
    expect(screen.getByText("JD")).toHaveClass("rounded-2xl");
  });
});
