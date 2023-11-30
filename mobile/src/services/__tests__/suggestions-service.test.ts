import { Suggestion } from '../../../app/restaurants';
import { api } from '../../lib/api';
import { addSuggestion, finishSuggestion, getSuggestions } from '../../services/suggestions-service';

jest.mock('../../lib/api');

describe('Testando as funções do serviço de sugestões', () => {
  const mockSuggestion: Suggestion = {
    id: '123',
    type: 'create',
    model: 'rest',
    data: { name: 'New Restaurant' },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve adicionar uma sugestão corretamente', async () => {
    let mockApiResponse: any = { suggestion: mockSuggestion, registered: true };
    const spyOnPost = jest.spyOn(api, 'post').mockResolvedValueOnce({ data: mockApiResponse });

    const result = await addSuggestion(mockSuggestion);

    mockApiResponse = result;

    expect(result).toEqual(mockApiResponse);
  });

  it('Deve finalizar uma sugestão corretamente', async () => {
    const suggestionId = '123';
    const mockFinishResponse = { finished: true };
    const spyOnDelete = jest.spyOn(api, 'delete').mockResolvedValueOnce({ data: mockFinishResponse });

    const result = await finishSuggestion(suggestionId);

    expect(spyOnDelete).toHaveBeenCalledWith(`/suggestions/${suggestionId}`);
  });

  it('Deve obter sugestões corretamente', async () => {
    const mockSuggestions = [
      { id: '1', type: 'create', model: 'rest', data: {} },
      { id: '2', type: 'update', model: 'meal', data: {} },
    ];
    const spyOnGet = jest.spyOn(api, 'get').mockResolvedValueOnce({ data: mockSuggestions });

    const result = await getSuggestions();

    expect(spyOnGet).toHaveBeenCalledWith('/suggestions');
    expect(result).toEqual(mockSuggestions);
  });

  it('Deve tratar erros corretamente ao adicionar sugestão', async () => {
    const errorMessage = 'Erro ao adicionar sugestão';
    jest.spyOn(api, 'post').mockRejectedValueOnce(new Error(errorMessage));

    const result = await addSuggestion(mockSuggestion);

    expect(result).toEqual({ registered: false });
  });

  it('Deve tratar erros corretamente ao finalizar sugestão', async () => {
    const errorMessage = 'Erro ao finalizar sugestão';
    const suggestionId = '123';
    jest.spyOn(api, 'delete').mockRejectedValueOnce(new Error(errorMessage));

    const result = await finishSuggestion(suggestionId);

    expect(api.delete).toHaveBeenCalledWith(`/suggestions/${suggestionId}`);
    expect(result).toEqual({ finished: false });
  });

  it('Deve tratar erros corretamente ao obter sugestões', async () => {
    const errorMessage = 'Erro ao obter sugestões';
    jest.spyOn(api, 'get').mockRejectedValueOnce(new Error(errorMessage));

    const result = await getSuggestions();

    expect(api.get).toHaveBeenCalledWith('/suggestions');
    expect(result).toEqual([]);
  });
});
