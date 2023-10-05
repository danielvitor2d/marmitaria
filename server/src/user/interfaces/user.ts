export interface User extends Document {
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly address: string;
  readonly pwd: string;
}
