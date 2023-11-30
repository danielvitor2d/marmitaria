import { AxiosResponse } from "axios";

import { api } from "../lib/api";

interface Suggestion {
  id: string;
  type: 'create' | 'update' | 'delete',
  model: 'rest' | 'meal'
  data: object;
}

interface SuggestionInput {
  type: 'create' | 'update' | 'delete',
  model: 'rest' | 'meal'
  data: object;
}

interface SuggestionResponse {
  suggestion: Suggestion
  registered: boolean
}

interface FinishSuggestionResponse {
  finished: boolean
}

async function addSuggestion({
  type,
  model,
  data,
}: SuggestionInput) {
  try {
    const response = await api.post<{}, AxiosResponse<SuggestionResponse>>(
      `/suggestions`,
      {
        type,
        model,
        data,
      }
    );

    response;
  } catch (err) {
    console.error(err);
    return {
      registered: false,
    };
  }
}

async function finishSuggestion(id: string) {
  try {
    const response = await api.delete<{}, AxiosResponse<FinishSuggestionResponse>>(
      `/suggestions/${id}`,
    );

    response;
  } catch (err) {
    console.error(err);
    return {
      finished: false,
    };
  }
}

async function getSuggestions() {
  try {
    const response = await api.get<{}, AxiosResponse<Array<Suggestion>>>(
      `/suggestions`
    );
    console.log(response.data)

    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export {
  addSuggestion,
  getSuggestions,
  finishSuggestion,
};
