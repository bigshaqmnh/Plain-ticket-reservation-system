class CustomError {
  constructor(dbError, message) {
    this._dbError = dbError;
    this._message = message;
  }

  get dbError() {
    return this._dbError;
  }

  get message() {
    return this._message;
  }
}

module.exports = CustomError;
