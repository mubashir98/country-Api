const countryName = new URLSearchParams(window.location.search).get('name');
const flagImage = document.querySelector('.country-details img');
const countryNameH1 = document.querySelector('.country-details h1');
const nativeName = document.querySelector('.nativeName');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');
const domain = document.querySelector('.domain');
const currency = document.querySelector('.currency');
const languages = document.querySelector('.languages');
const borderCountries = document.querySelector('.border-countries')
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => { //destructuring data[0] into country[country]
        console.log(country);
        flagImage.src = country.flags.svg
        countryNameH1.innerText = country.name.common
        if (country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common;
        } else {
            nativeName.innerText = country.name.common;
        }

        population.innerText = country.population;
        region.innerText = country.region;
        subRegion.innerText = country.subregion;
        capital.innerText = country.capital[0];
        domain.innerText = country.tld.join(", ")
        if (country.currencies) {
            currency.innerText = Object.values(country.currencies)
                .map((currency) => currency.name) // `.name` is a string, no `.join()` needed
                .join(', '); // Joins multiple currency names if present
        }
        if (country.languages) {
            languages.innerText = Object.values(country.languages).join(', ')
        }

        if (country.borders) {
            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountry]) => {
                        const borderCountryTag = document.createElement('a');
                        borderCountryTag.innerText = borderCountry.name.common
                        borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                        borderCountries.append(borderCountryTag);

                    })
            });
        }

    })