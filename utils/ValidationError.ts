class ValidationError extends Error {
  reason: string;

  constructor(reason: string) {
    super();
    this.reason = reason;
  }
}

export default ValidationError;
