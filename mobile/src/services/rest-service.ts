import { AxiosResponse } from "axios";
import { api } from "../lib/api";
import { Meal } from "./meal-service";

interface Restaurant {
  id: string;
  name: string;
  address: string;
  value: string;
  paymentforms: string;
  meals: Array<Meal>;
}

interface RegisterInput {
  name: string;
  address: string;
  value: string;
  paymentforms: string;
}

interface RegisterResponse {
  registered: boolean;
  rest: Restaurant;
}

interface AddMealResponse {
  added: boolean,
  rest: Restaurant | null,
}

async function register({ name, address, value, paymentforms }: RegisterInput) {
  try {
    const response = await api.post<{}, AxiosResponse<RegisterResponse>>(
      "/restaurants",
      {
        name,
        address,
        value,
        paymentforms,
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
    console.log(response.data)

    return response.data;
  } catch (err) {
    console.error(err);
    return {
      added: false,
      restaurant: null
    };
  }
}

export { register, addMeal };
