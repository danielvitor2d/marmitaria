export interface Restaurant extends Document {
  readonly name: string;
  readonly address: string;
  readonly value: string;
  readonly paymentforms: string;
  readonly meals: Array<string>;
}
