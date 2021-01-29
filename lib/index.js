"use strict";

require("core-js/modules/es.promise.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("bootstrap");

require("bootstrap/dist/css/bootstrap.min.css");

class ApiCall {
  constructor() {
    this.baseUrl = "";
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint) {
    const response = await fetch(this.baseUrl + endpoint);
    return await response.json();
  }

}

const api = new ApiCall();
api.setBaseUrl("https://restcountries.eu/rest/v2/");
const button = document.querySelector("#go");
const name = document.querySelector("#name");
const infos = document.querySelector("#infos");
const flag = document.querySelector("#flag");
const message = document.querySelector("#message");
button.addEventListener("click", event => {
  event.preventDefault();
  infos.innerHTML = "";
  flag.innerHTML = "";
  message.innerHTML = "";
  api.get("name/".concat(name.value)).then(data => {
    const [countryData] = data;
    const {
      name,
      region,
      capital,
      currencies,
      languages
    } = countryData;
    const [currencyCountry] = currencies;
    const [languageCountry] = languages;
    infos.insertAdjacentHTML("beforeend", "<ul class=\"list-unstyled bg-light p-3 rounded text-center\">\n      <h2 class=\"pb-4 \">".concat(name, "</h2>\n        <li>Continent : ").concat(region, "</li>\n        <li>Capital : ").concat(capital, "</li>\n        <li>Currency : ").concat(currencyCountry.name, "</li>\n        <li>Language : ").concat(languageCountry.name, "</li>\n      </ul>"));
    flag.insertAdjacentHTML("beforeend", "<img src=\"".concat(data[0].flag, "\" width=75%/>"));
  }).catch(error => {
    message.insertAdjacentHTML("beforeend", '<div class="alert alert-primary text-center" role="alert">Try again! Write in English.</div>');
  });
});