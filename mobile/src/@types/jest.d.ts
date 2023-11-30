declare namespace jest {
  interface Matchers<R, T> {
    toHaveStyle(style: Record<string, unknown>): R;
  }
}
