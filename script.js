const countriesContainer=document.querySelector('.countries-container');
const filterbyregion=document.querySelector('.filter-by-region');
const searchInput=document.querySelector('.search-container input');
let allCountriesData 
fetch('https://restcountries.com/v3.1/all')
.then((res)=>res.json())
.then((data)=>{
    renderCountries(data)
    allCountriesData=data   
})

filterbyregion.addEventListener('change',(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${filterbyregion.value}`)
    .then((res)=>res.json())
    .then(renderCountries)

})

function renderCountries(data){
    countriesContainer.innerHTML=""
    data.forEach((country) => {
        const countryCard=document.createElement('a');
        countryCard.href=`/country.html?name=${country.name.common}`;
        countryCard.classList.add('country-card');
        countryCard.innerHTML=` <img src=${country.flags.svg} alt="flag" srcset="">
         <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>population: </b>${country.population.toLocaleString('en-IN')}</p>
            <p><b>region: </b>${country.region}</p>
            <p><b>capital: </b>${country.capital}</p>
         </div>`
         countriesContainer.append(countryCard);

    })
}
searchInput.addEventListener('input', (e) => {
    const filteredCountries = allCountriesData.filter((country) =>
        country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
   renderCountries(filteredCountries);
});






