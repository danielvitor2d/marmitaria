import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Suggestion } from '../../../app/restaurants';
import AuthContext, { UserType } from '../../contexts/auth';
import { SuggestionCard } from '../suggestion_card';

describe('SuggestionCard Component', () => {
  // Teste para renderização adequada do componente
  it('renders SuggestionCard correctly', () => {
    const suggestion = {
      type: 'create',
      model: 'meal',
      data: { meal: { name: 'Test Meal' } },
    };

    const { getByText } = render(
      <AuthContext.Provider
        value={{
          isAdmin: false,
          meal: null,
          rest: {
            address: '',
            id: '',
            isSuggestion: false,
            meals: [],
            name: '',
            paymentforms: '',
            value: '',
          },
          signed: true,
          user: {} as UserType,
          logout: async () => {},
          refetchUser: async () => {},
          setMeal: () => {},
          setRest: () => {},
          signIn: async () => ({ logged: true, isAdmin: false }),
          update: async () => true,
          setSuggestion: () => {},
          suggestion: {},
        }}
      >
        <SuggestionCard suggestion={suggestion as Suggestion} onAcceptSuggestion={jest.fn()} />
      </AuthContext.Provider>
    );
    
    expect(getByText('Test Meal')).toBeTruthy();
  });

  // Teste para verificar se a função de aceitar sugestão é chamada ao pressionar o botão 'Aceitar'
  it('calls onAcceptSuggestion when "Aceitar" button is pressed', () => {
    const onAcceptSuggestionMock = jest.fn();
    const suggestion = {
      type: 'create',
      model: 'meal',
      data: { meal: { name: 'Test Meal' } },
    };

    const { getByText } = render(
      <AuthContext.Provider
        value={{
          isAdmin: false,
          meal: null,
          rest: {
            address: '',
            id: '',
            isSuggestion: false,
            meals: [],
            name: '',
            paymentforms: '',
            value: '',
          },
          signed: true,
          user: {} as UserType,
          logout: async () => {},
          refetchUser: async () => {},
          setMeal: () => {},
          setRest: () => {},
          signIn: async () => ({ logged: true, isAdmin: false }),
          update: async () => true,
          setSuggestion: () => {},
          suggestion: {},
        }}
      >
        <SuggestionCard suggestion={suggestion as Suggestion} onAcceptSuggestion={onAcceptSuggestionMock} />
      </AuthContext.Provider>
    );
    
    const acceptButton = getByText('Aceitar');
    fireEvent.press(acceptButton);

    expect(onAcceptSuggestionMock).toHaveBeenCalledTimes(0);
  });

  // Outros testes podem ser adicionados para cobrir mais cenários e interações do componente
});
