// With the API endpoint provided in the file call the API and display the
// Avatar, Name, Number of Public Repos and Followers on the page.

class populateUserCardInformation {
  constructor(url, element) {
    this.url = url;
    this.element = element;
    this.apiData = [];

    this.initialize();
  }

  async initialize() {
    await this.getDataFromApi();
    this.addDataToCard();
  }

  async getDataFromApi() {
    const response = await fetch(this.url);
    const jsonResponse = await response.json();

    this.apiData.avatar_url = jsonResponse.avatar_url;
    this.apiData.name = jsonResponse.name;
    this.apiData.public_repos = jsonResponse.public_repos;
    this.apiData.followers = jsonResponse.followers;
  }

  addDataToCard() {
    this.element.querySelector('.js-Avatar').src = this.apiData.avatar_url;
    this.element.querySelector('.js-Name').innerText = this.apiData.name;
    this.element.querySelector('.js-RepoNumber').innerText = this.apiData.public_repos;
    this.element.querySelector('.js-Followers').innerText = this.apiData.followers;
  }
}

new populateUserCardInformation(
  'https://api.github.com/orgs/clicksco',
  document.querySelector('.UserCard')
);