const DEFAULT_TIMEOUT_SEC = 20;

/**
 * Collect Rest API services in general way with inbulided timeout management
 * @author Bettenbuk István
 * */

export default class Utility {
  async #checkTimeout(sec = DEFAULT_TIMEOUT_SEC) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${sec} second`));
      }, sec * 1000);
    });
  }

  /** Get JSON data from the given url async way
   * @param {String} url the location the JSON data
   * @param {int} {sec = 20} waiting time in sec
   * @returns {JSON} the JSON value obtained
   * */

  async getJson(url, sec) {
    try {
      const result = await Promise.race([fetch(url), this.#checkTimeout(sec)]);
      const data = await result.json();
      if (!result.ok) throw new Error(`${data.message} (${res.status})`);
      return data;
    } catch (err) {
      console.log('Error in utility');
      throw err;
    }
  }

  /** Post JSON data to the given url async way
   * @param {String} url the location to send JSON data
   * @param {JSON} uploadData value to send
   * @param {int} {sec = 20} waiting time in sec
   * @returns {JSON} the response JSON value
   * */

  async sendJson(url, uploadData, sec) {
    try {
      const result = await Promise.race([
        this.#getFetchToUpload(url, uploadData),
        this.#checkTimeout(sec),
      ]);
      const data = await result.json();

      if (!result.ok) throw new Error(`${data.message} (${res.status})`);
      return data;
    } catch (err) {
      console.log('Error in utility');
      throw err;
    }
  }

  #getFetchToUpload(url, uploadData) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
  }
}
