import { AxiosResponse } from "axios";

import { api } from "../lib/api";

export interface Review {
  id: string;
  cntStar: number;
  comments: string;
  mealId: string;
}

export interface ReviewInput {
  cntStar: number;
  comments: string;
  mealId: string;
}

export interface ReviewResponse {
  registered: boolean;
  review: Review;
}

async function addReview({
  cntStar,
  comments,
  mealId
}: ReviewInput) {
  try {
    const response = await api.post<{}, AxiosResponse<ReviewResponse>>(
      `/reviews`,
      {
        cntStar,
        comments,
        mealId
      }
    );

    return response.data;
  } catch (err) {
    console.error(err);
    return {
      registered: false,
      review: {} as Review,
    };
  }
}

async function findAllReviews() {
  try {
    const response = await api.get<{}, AxiosResponse<Array<Review>>>(
      `/reviews`
    );

    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function findByMeal(id: string) {
  try {
    const response = await api.get<{}, AxiosResponse<Array<Review>>>(
      `/reviews/meal/${id}`
    );

    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export {
  addReview,
  findAllReviews,
  findByMeal
};
