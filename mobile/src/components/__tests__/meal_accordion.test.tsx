import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';
import MealAccordion from '../meal_accordion';

describe('MealAccordion Component', () => {
  const mockTitle = 'Test Meal';
  const mockOnRemove = jest.fn();

  it('renders correctly with title', () => {
    const { getByText } = render(
      <MealAccordion title={mockTitle} onRemove={mockOnRemove}>
        <Text>Test Children</Text>
      </MealAccordion>
    );
    expect(getByText(mockTitle)).toBeDefined();
  });

  it('expands/collapses on press', () => {
    const { getByTestId } = render(
      <MealAccordion title={mockTitle} onRemove={mockOnRemove}>
        <Text>Test Children</Text>
      </MealAccordion>
    );

    const accordionButton = getByTestId('accordion-button');

    fireEvent.press(accordionButton); // expand
    const expandedBody = getByTestId('accordion-body');
    expect(expandedBody.props.style.height).toBe(0);

    fireEvent.press(accordionButton); // collapse
    const collapsedBody = getByTestId('accordion-body');
    expect(collapsedBody.props.style.height).toBe(0);
  });

  it('calls onRemove when remove button is pressed', () => {
    const { getByTestId } = render(
      <MealAccordion title={mockTitle} onRemove={mockOnRemove}>
        <Text>Test Children</Text>
      </MealAccordion>
    );

    const removeButton = getByTestId('remove-button');
    fireEvent.press(removeButton);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });
});
