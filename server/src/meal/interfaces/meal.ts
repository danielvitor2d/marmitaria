export interface Meal extends Document {
  readonly name: string;
  readonly desc: string;
  readonly value: string;
  readonly reviews: string[];
}
