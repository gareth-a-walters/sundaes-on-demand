import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SummaryForm from '../SummaryForm'

test('Initial conditions', () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked()

  const confirmButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  expect(confirmButton).toBeDisabled()
})

test("Checkbox enables button on first click and disables on second click", async () => {
  const user = userEvent.setup()
  render(<SummaryForm />)
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i })
 
  await user.click(checkbox)
  expect(confirmButton).toBeEnabled()
 
  await user.click(checkbox)
  expect(confirmButton).toBeDisabled()
});

test('popover responds to hover', async () => {
  render(<SummaryForm />);
 
  // set up userEvent
  const user = userEvent.setup();
 
  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
 
  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText('No ice cream will actually be delivered');
  expect(popover).toBeInTheDocument();
 
  // popover disappears when we mouse out

  // PASSES:
  await user.unhover(termsAndConditions);
  const overlay = screen.queryByText(/no ice cream will actually be delivered/i);
  await waitFor(() => {
    expect(overlay).not.toBeInTheDocument()
  })

  // FAILS:
  // await user.hover(termsAndConditions)
  // const overlay = screen.queryByText(/no ice cream will actually be delivered/i);
  // expect(overlay).not.toBeInTheDocument()

  // FAILS:
  // await waitForElementToBeRemoved(() =>
  //   screen.queryByText(/no ice cream will actually be delivered/i)
  // );
});
