import { api } from '../../lib/api';
import { addFavorite, refetch, rmvFavorite } from '../../services/user-service';

jest.mock('../../lib/api');

describe('Testando as funções do serviço', () => {
  const mockUserId = 'user123';
  const mockRestId = 'rest456';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve adicionar um restaurante aos favoritos corretamente', async () => {
    const mockApiResponse = { data: [{ success: true }] };
    api.patch = jest.fn().mockResolvedValueOnce(mockApiResponse);

    const result = await addFavorite(mockUserId, mockRestId);

    expect(api.patch).toHaveBeenCalledWith(`/users/${mockUserId}/favorite/add/${mockRestId}`);
  });

  it('Deve remover um restaurante dos favoritos corretamente', async () => {
    const mockApiResponse = { data: [{ success: true }] };
    api.patch = jest.fn().mockResolvedValueOnce(mockApiResponse);

    const result = await rmvFavorite(mockUserId, mockRestId);

    expect(api.patch).toHaveBeenCalledWith(`/users/${mockUserId}/favorite/rmv/${mockRestId}`);
  });

  it('Deve refetch do usuário corretamente', async () => {
    const mockUser = {
      id: mockUserId,
      name: 'Mock User',
      // ... outras propriedades
    };
    const mockApiResponse = { data: { user: mockUser } };
    api.get = jest.fn().mockResolvedValueOnce(mockApiResponse);

    const result = await refetch(mockUserId);

    expect(api.get).toHaveBeenCalledWith(`/users/${mockUserId}`);
    expect(result).toEqual(mockUser);
  });

  it('Deve tratar erros corretamente ao adicionar favorito', async () => {
    const errorMessage = 'Erro ao adicionar favorito';
    api.patch = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    const result = await addFavorite(mockUserId, mockRestId);

    expect(api.patch).toHaveBeenCalledWith(`/users/${mockUserId}/favorite/add/${mockRestId}`);
    expect(result).toEqual({ success: false });
  });

  it('Deve tratar erros corretamente ao remover favorito', async () => {
    const errorMessage = 'Erro ao remover favorito';
    api.patch = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    const result = await rmvFavorite(mockUserId, mockRestId);

    expect(api.patch).toHaveBeenCalledWith(`/users/${mockUserId}/favorite/rmv/${mockRestId}`);
    expect(result).toEqual({ success: false });
  });

  it('Deve tratar erros corretamente no refetch do usuário', async () => {
    const errorMessage = 'Erro ao refetch do usuário';
    api.get = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    const result = await refetch(mockUserId);

    expect(api.get).toHaveBeenCalledWith(`/users/${mockUserId}`);
    expect(result).toBeNull();
  });
});
