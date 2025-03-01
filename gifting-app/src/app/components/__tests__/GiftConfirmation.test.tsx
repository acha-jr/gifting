import { render, screen, fireEvent } from "@testing-library/react";
import GiftConfirmation from "../GiftConfirmation";

test("calls onConfirm when button is clicked", () => {
  const mockOnConfirm = jest.fn();

  render(<GiftConfirmation property="Luxury Villa" recipient="JohnDoe" onConfirm={mockOnConfirm} userId={0} />);

  const button = screen.getByText(/Confirm & Send Gift/i);
  fireEvent.click(button);

  expect(mockOnConfirm).toHaveBeenCalledTimes(1);
});