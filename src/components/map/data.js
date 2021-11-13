import axios from 'axios'

export default   ()=>{
var options = {
  method: 'GET',
  url: 'https://hotels4.p.rapidapi.com/locations/search',
  params: {query: 'new york', locale: 'en_US'},
  headers: {
    'x-rapidapi-host': 'hotels4.p.rapidapi.com',
    'x-rapidapi-key': '5c2c8979e5msha0f9182d3bae9e0p107de4jsnfe57e814a2ab'
  }
};

axios.request(options).then(function (response) {

}).catch(function (error) {
	console.error(error);
});
}
