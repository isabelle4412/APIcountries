import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



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
  infos.innerHTML=""
  flag.innerHTML=""
  message.innerHTML=""
  api
    .get(`name/${name.value}`)
    .then(data => {
      const [countryData] = data
      const{name,region,capital,currencies,languages} = countryData
      const[currencyCountry] = currencies
      const[languageCountry] = languages
      infos.insertAdjacentHTML("beforeend",
      `<ul class="list-unstyled bg-light p-3 rounded text-center">
      <h2 class="pb-4 ">${name}</h2>
        <li>Continent : ${region}</li>
        <li>Capital : ${capital}</li>
        <li>Currency : ${currencyCountry.name}</li>
        <li>Language : ${languageCountry.name}</li>
      </ul>`);
      flag.insertAdjacentHTML("beforeend", `<img src="${data[0].flag}" width=75%/>`);
    })
    .catch((error) => {
      message.insertAdjacentHTML("beforeend", '<div class="alert alert-primary text-center" role="alert">Try again! Write in English.</div>');
    });
});
