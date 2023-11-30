export interface Review extends Document {
  readonly cntStar: number;
  readonly comments: string;
  readonly meal: string;
}
