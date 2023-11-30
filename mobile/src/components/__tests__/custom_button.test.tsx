import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { CustomButton } from '../custom_button';

describe('CustomButton Component', () => {
  test('renders button with provided text', () => {
    const { getByText } = render(<CustomButton text="Click Me" fontSize={16} />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  // test('renders button with default NEUTRAL type', () => {
  //   const { getByTestId } = render(<CustomButton text="Default Button" fontSize={16} />);
  //   const button = getByTestId('custom-button');
  //   const { backgroundColor } = button.props.style[1]; // Get style at index 1
  //   expect(backgroundColor).toBe('#797979');
  // });

  // test('renders button with PRIMARY type', () => {
  //   const { getByTestId } = render(<CustomButton text="Primary Button" fontSize={16} type="PRIMARY" />);
  //   const button = getByTestId('custom-button');
  //   const { backgroundColor } = button.props.style[1]; // Get style at index 1
  //   expect(backgroundColor).toBe('#A60C0C');
  // });

  // test('renders button with SECONDARY type', () => {
  //   const { getByTestId } = render(<CustomButton text="Secondary Button" fontSize={16} type="SECONDARY" />);
  //   const button = getByTestId('custom-button');
  //   const { backgroundColor } = button.props.style[0]; // Get style at index 1
  //   expect(backgroundColor).toBe('#34416D');
  // });

  test('calls onPress callback when clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<CustomButton text="Click Me" fontSize={16} onPress={onPressMock} />);
    const button = getByText('Click Me');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });

  test('renders button with custom font size', () => {
    const { getByText } = render(<CustomButton text="Custom Font Size" fontSize={18} />);
    const buttonText = getByText('Custom Font Size');
    const { fontSize } = buttonText.props.style[0]; // Get style at index 0
    expect(fontSize).toBe(18);
  });
});
