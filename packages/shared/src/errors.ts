export class SlackPandaError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'SlackPandaError';
  }
}

export class NotEnoughParameterError extends SlackPandaError {
  constructor(message: string) {
    super(message);

    this.name = 'NotEnoughParameterError';
  }
}
