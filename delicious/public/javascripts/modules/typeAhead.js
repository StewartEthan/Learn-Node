const axios = require('axios');

function searchResultsHtml(stores) {
  return stores.map(store => {
    return `
<a href="/store/${store.slug}" class="search__result">
  <strong>${store.name}</strong>
</a>
    `;
  }).join('');
}

function typeAhead(search) {
  if (!search) return;

  const searchInput = search.querySelector('input[name="search"]');
  const searchResults = search.querySelector('.search__results');

  searchInput.on('input', function() {
    if (!this.value) {
      searchResults.style.display = 'none';
      return;
    }

    searchResults.innerHTML = '';
    searchResults.style.display = 'block';
    
    axios
      .get(`/api/search?q=${this.value}`)
      .then(res => {
        if (res.data.length) {
          searchResults.innerHTML = searchResultsHtml(res.data);
        }
      })
      .catch(err => {
        console.error(err);
      });
  });
}

export default typeAhead;