class FlightResponse {
  constructor(err = false, data) {
    this._err = err;
    this._data = data;
  }

  get err() {
    return this._err;
  }

  get data() {
    return this._data;
  }
}

module.exports = FlightResponse;
