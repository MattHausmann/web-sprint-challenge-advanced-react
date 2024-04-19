import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"

import '@testing-library/jest-dom'

import AppFunctional from "./AppFunctional";
import React from 'react';

// Write your tests here
describe('Grid Game tests', () => {
  let component;
  const user = userEvent.setup();
 
  it('should have a button that says LEFT', () => {

    render(<AppFunctional />);
    const leftButton = screen.getByText('LEFT');
    expect(leftButton).toBeInTheDocument();
  });

  it('should have a button that says reset', () => {

    render(<AppFunctional />);
    const leftButton = screen.getByText('reset');
    expect(leftButton).toBeInTheDocument();
  });

  it('should initially say Coordinates (2,2)',()=>{
    render(<AppFunctional />);
    let coordinatesMessage = screen.getByText("Coordinates (2, 2)");
    expect(coordinatesMessage).toBeInTheDocument();
  });

  it('should have an email field with the placeholder text "type email"', () => {
    render(<AppFunctional />);
    const textEntry = screen.getByPlaceholderText('type email');
    expect(textEntry).toBeInTheDocument();
  });

  it('should modify the email field when you type into it', async () => {
    render(<AppFunctional />);
    const textEntry = screen.getByPlaceholderText('type email');
    await user.type(textEntry, 'hello!');
    expect(textEntry.value).toBe('hello!');
  })
}); 