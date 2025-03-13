const countriesContainer=document.querySelector('.countries-container');

fetch('https://restcountries.com/v3.1/all')
.then((res)=>res.json())
.then((data)=>{
    data.forEach((country) => {
        console.log(country);
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
})




