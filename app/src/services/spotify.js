const axios = require('axios');
const querystring = require('querystring');

const CLIENT_ID = '4c05f9412a7f40539df30196dc61af7d'; // Substitua pelo seu Client ID
const CLIENT_SECRET = 'a39495c29eea4604b6e7c001d0130a3b'; // Substitua pelo seu Client Secret

// Função para obter um token de acesso
async function getAccessToken() {
  const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
    grant_type: 'client_credentials'
  }), {
    headers: {
      'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return response.data.access_token;
}

// Função para buscar uma faixa pelo nome
async function searchTrack(trackName) {
  const token = await getAccessToken();
  const response = await axios.get('https://api.spotify.com/v1/search', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      q: trackName,
      type: 'track',
      limit: 1
    }
  });
  return response.data.tracks.items[0]; // Retorna a primeira faixa
}

// Substitua pelo nome da faixa que você deseja buscar
const trackName = 'Sweet Child O\' Mine'; // Exemplo: "Sweet Child O' Mine" por Guns N' Roses

searchTrack(trackName)
  .then(track => {
    if (track) {
      console.log('Track Info:', track);
    } else {
      console.log('No track found.');
    }
  })
  .catch(err => {
    console.error('Error:', err);
  });

  export default track;