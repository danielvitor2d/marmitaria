export interface Restaurant extends Document {
  readonly name: string;
  readonly address: string;
  readonly value: string;
  readonly paymentforms: string;
  readonly isSuggestion: boolean;
  meals: Array<string>;
}
