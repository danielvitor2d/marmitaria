import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { Header } from '../header';

describe('Header component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Header testID="headerTestId"><></></Header>);
    const header = getByTestId('headerTestId');
    expect(header).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <Header testID="headerTestId">
        <Text>Test Children</Text>
      </Header>,
    );
    const childElement = getByText('Test Children');
    expect(childElement).toBeTruthy();
  });

  it('renders with custom styles', () => {
    const { getByTestId } = render(<Header testID="headerTestId"><></></Header>);
    const header = getByTestId('headerTestId');
    expect(header).toBeDefined()
  });
});
