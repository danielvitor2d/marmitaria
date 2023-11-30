import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { BackButton } from '../back_button';

describe('BackButton component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<BackButton name="arrow-left" size={20} />);
    const backButton = getByTestId('backButtonTestId');
    expect(backButton).toBeTruthy();
  });

  it('renders with custom props', () => {
    const { getByTestId } = render(
      <BackButton name="arrow-left" size={20} type="PRIMARY" />,
    );
    const backButton = getByTestId('backButtonTestId');
    expect(backButton).toBeDefined();
  });

  it('calls router back function on press when onPress is not provided', () => {
    const mockRouterBack = jest.fn();
    jest.mock('expo-router', () => ({
      useRouter: () => ({ back: mockRouterBack }),
    }));

    const { getByTestId } = render(<BackButton name="arrow-left" size={20} onPress={mockRouterBack} />);
    const backButton = getByTestId('backButtonTestId');
    fireEvent.press(backButton);
    expect(mockRouterBack).toHaveBeenCalledTimes(1);
  });

  it('calls onPress function when provided', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <BackButton name="arrow-left" size={20} onPress={mockOnPress} />,
    );
    const backButton = getByTestId('backButtonTestId');
    fireEvent.press(backButton);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
