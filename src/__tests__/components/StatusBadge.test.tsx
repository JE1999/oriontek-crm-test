import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBadge } from "@/components/clients/StatusBadge";
import { CLIENT_STATUS } from "@/constants";

describe("StatusBadge", () => {
  it("renders the active status correctly", () => {
    render(<StatusBadge status={CLIENT_STATUS.ACTIVE} />);
    
    expect(screen.getByText("status.active")).toBeInTheDocument();
    const badge = screen.getByText("status.active").closest("span");
    expect(badge).toHaveClass("bg-emerald-50");
  });

  it("renders the inactive status correctly", () => {
    render(<StatusBadge status={CLIENT_STATUS.INACTIVE} />);
    
    expect(screen.getByText("status.inactive")).toBeInTheDocument();
    const badge = screen.getByText("status.inactive").closest("span");
    expect(badge).toHaveClass("bg-slate-100");
  });
});
