export interface Suggestion extends Document {
  readonly type: string;
  readonly model: string;
  readonly data: object;
}
