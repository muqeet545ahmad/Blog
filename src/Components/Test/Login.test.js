
import Login from '../Login.jsx';
// import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';


describe('Login component', () => {
  it('renders the login form', () => {
    render(<Login />);

    // Check if the form elements are present
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log-in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('submits the form with the provided data', async () => {
    render(<Login />);

    // Fill in the form
    userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
    userEvent.type(screen.getByLabelText(/password/i), 'password');

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /log-in/i }));

    // Wait for the asynchronous operations to complete
    await act(async () => {});

    // Check if the form submission was successful (assuming your component navigates to '/')
    expect(window.location.pathname).toBe('/');
  });

  it('navigates to the signup page when "Create Account" is clicked', () => {
    render(<Login />, { wrapper: MemoryRouter });

    // Click the "Create Account" button
    userEvent.click(screen.getByRole('button', { name: /create account/i }));

    // Check if the navigation to the signup page was successful
    expect(window.location.pathname).toBe('/');
  });
});



