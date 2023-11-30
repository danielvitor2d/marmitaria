import { AxiosResponse } from "axios";
import { api } from "../lib/api";
import { Meal } from "./meal-service";

interface Restaurant {
  id: string;
  name: string;
  address: string;
  value: string;
  paymentforms: string;
  isSuggestion: boolean;
  meals: Array<Meal>;
}

interface RegisterInput {
  name: string;
  address: string;
  value: string;
  paymentforms: string;
  isSuggestion: boolean;
}

interface RegisterResponse {
  registered: boolean;
  rest: Restaurant;
}

interface AddMealResponse {
  added: boolean;
  rest: Restaurant | null;
}

interface DeleteResponse {
  deleted: boolean;
}

async function register({
  name,
  address,
  value,
  paymentforms,
  isSuggestion,
}: RegisterInput) {
  try {
    const response = await api.post<{}, AxiosResponse<RegisterResponse>>(
      "/restaurants",
      {
        name,
        address,
        value,
        paymentforms,
        isSuggestion,
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return {
      registered: false,
      rest: null,
    };
  }
}

async function addMeal(id: string, mealId: string) {
  try {
    const response = await api.patch<{}, AxiosResponse<AddMealResponse>>(
      `/restaurants/${id}/meal/${mealId}`
    );
    // console.log(response.data);

    return response.data;
  } catch (err) {
    console.error(err);
    return {
      added: false,
      restaurant: null,
    };
  }
}

async function getRests() {
  try {
    const response = await api.get<{}, AxiosResponse<Array<Restaurant>>>(
      `/restaurants`
    );
    // console.log(response.data)

    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function remove(id: string) {
  try {
    const response = await api.delete<{}, AxiosResponse<DeleteResponse>>(
      `/restaurants/${id}`
    );

    return response.data;
  } catch (err) {
    console.error(err);
    return {
      deleted: false,
    }
  }
}

export { register, addMeal, getRests, remove };
