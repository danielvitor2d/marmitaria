import { AxiosResponse } from "axios";
import { UserType } from "../contexts/auth";
import { api } from "../lib/api";

interface ChangeFavorite {
  success: boolean;
}

async function addFavorite(id: string, rest_id: string) {
  try {
    const response = await api.patch<{}, AxiosResponse<Array<ChangeFavorite>>>(
      `/users/${id}/favorite/add/${rest_id}`
    );

    response;
  } catch (err) {
    console.error(err);
    return {
      success: false,
    };
  }
}

async function rmvFavorite(id: string, rest_id: string) {
  try {
    const response = await api.patch<{}, AxiosResponse<Array<ChangeFavorite>>>(
      `/users/${id}/favorite/rmv/${rest_id}`
    );

    response;
  } catch (err) {
    console.error(err);
    return {
      success: false,
    };
  }
}

async function refetch(id: string) {
  try {
    const response = await api.get<{}, AxiosResponse<{ user: UserType }>>(
      `/users/${id}`
    );
    return response.data.user;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export { addFavorite, rmvFavorite, refetch };
