import {config} from '../config';

const baseUrl = config.apiBaseUrl;

//creates new user
export async function signUpQuery(data) {
  const response = await fetch(`${baseUrl}/v3/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}