import { render } from '@testing-library/react-native';
import React from 'react';
import ReviewCard from '../review_card';

describe('ReviewCard Component', () => {
  test('renders ReviewCard correctly', () => {
    const review = {
      id: '',
      mealId: '',
      cntStar: 4,
      comments: 'Great product!',
    };
  
    const { getByText } = render(<ReviewCard review={review} />);
  
    expect(getByText('Comentários: Great product!')).toBeTruthy();
    expect(getByText('Nota: 4')).toBeTruthy();
  });

  test('renders stars correctly based on review count', () => {
    const review = {
      id: '',
      mealId: '',
      cntStar: 3,
      comments: 'Good product!'
    };
  
    const { getAllByA11yHint } = render(<ReviewCard review={review} />);
    const stars = getAllByA11yHint('star');
  
    expect(stars.length).toBe(3);
  });

  test('renders empty stars correctly based on review count', () => {
    const review = {
      id: '',
      mealId: '',
      cntStar: 2,
      comments: 'Decent product!'
    };
  
    const { getAllByA11yHint } = render(<ReviewCard review={review} />);
    const emptyStars = getAllByA11yHint('star-o');
  
    expect(emptyStars.length).toBe(3);
  });
});
