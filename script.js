
const countryButtons = document.querySelectorAll('.country-btn');
const countryInfoDiv = document.getElementById('countryInfo');


countryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const countryName = button.getAttribute('data-country');
        fetchCountryData(countryName);
    });
});


function fetchCountryData(countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            displayCountryInfo(data[0]);
        })
        .catch(error => {
            console.error('Erro ao buscar dados do país:', error);
            countryInfoDiv.innerHTML = `<p>Erro ao buscar o país. Tente novamente.</p>`;
        });
}


function displayCountryInfo(country) {
    if (!country) {
        countryInfoDiv.innerHTML = `<p>País não encontrado.</p>`;
    } else {
        countryInfoDiv.innerHTML = `
            <img src="${country.flags.svg}" alt="Bandeira de ${country.name.common}">
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'Desconhecida'}</p>
            <p><strong>Região:</strong> ${country.region}</p>
            <p><strong>População:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Área:</strong> ${country.area.toLocaleString()} km²</p>
        `;
    }
}
