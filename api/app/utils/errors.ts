export class AppError extends Error {
  constructor(message: string) {
    super()
    this.message = message;
  }
  getStatusCode() { return 500 }
}


export class BadRequest extends AppError {
  constructor(message: string) {
    super(message)
    this.name = "BadRequest";
  }
  getStatusCode() { return 400 }
}


export class Unauthorized extends AppError {
  constructor(message: string) {
    super(message)
    this.name = "Unauthorized";
  }
  getStatusCode() { return 401 }
}

export class Forbidden extends AppError {
  constructor(message: string) {
    super(message)
    this.name = "Forbidden";
  }
  getStatusCode() { return 403 }
}

export class NotFound extends AppError {
  constructor(message: string) {
    super(message)
    this.name = "NotFound";
  }
  getStatusCode() { return 404 }
}

