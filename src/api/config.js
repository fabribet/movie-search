import { BASE_API_URL, API_KEY, METHODS } from './utils'

/**
 * Calls the Configuration API to get the config info.
 * 
 * @returns Promise<Response>
 */
export const getConfig = function() {
    return fetch(`${BASE_API_URL}/configuration?api_key=${API_KEY}`, {
      method: METHODS.GET,
    })
  }