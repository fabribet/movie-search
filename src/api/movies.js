import { BASE_API_URL, API_KEY, METHODS } from './utils'

/**
 * Calls the search movie API.
 * @param {string} query - The query string for the search.
 * 
 * @returns Promise<Response>
 *  *************
 *  Usage Example
 *  *************
 * 
 *  searchMovies()
 *    .then(function(response){
 *      if (response.ok) {
 *        response.json().then(function(data) {
 *          console.log(data);
 *        })
 *      } else {
 *        console.log('There was an error searching albums. Error status = ', response.status)
 *      }
 *    })
 */
export const searchMovies = function(query) {
  return fetch(`${BASE_API_URL}/search/movie?query=${query}&api_key=${API_KEY}`, {
    method: METHODS.GET,
  })
}

/**
 * Calls the Popular Movies API
 * 
 * @returns Promise<Response>
 */
export const getPopularMovies = function() {
  return fetch(`${BASE_API_URL}/movie/popular?api_key=${API_KEY}`, {
    method: METHODS.GET,
  })
}