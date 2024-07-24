"use strict"

const nav = document.getElementById('navigation');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const clearButton = document.getElementById('clearButton');
const heroRecommendations = document.getElementById('hero-recommendations');


(function getRecommendation() {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            window.recommendations = data;
        })
        .catch(error => {

            console.log(error)
        });
})()


const getTimeZone = (zone) => {
    zone = zone.replace(', ', '/').replaceAll(' ', '_').split('/').reverse().join('/')
    const options = {timeZone: zone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric'};
    try {
        const currentTime = new Date().toLocaleTimeString('en-US', options);
        return `Current time in ${zone.split('/')[1]}:  ${currentTime}`
    } catch (e) {
        return 'Cannot Provide Timezone for this area..'
    }
}

const renderTemplate = ({imageUrl, name, description}) => {
    const time = getTimeZone(name)
    return `<div class="recommendation">
                <img src="images/${imageUrl}" alt="${name}">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <p>${time}</p>
                    <button>Visit</button>
                </div>
            </div>`
}

const clearRecommendations = () => {
    heroRecommendations.innerHTML = '';
    heroRecommendations.classList.add('hide')
    heroRecommendations.classList.remove('show')
}


searchButton.onclick = function (event) {
    event.preventDefault()
    clearRecommendations()
    const arr = [];
    Object.keys(window.recommendations).forEach(category => {
        window.recommendations[category]?.forEach(j => {
            if (!j.cities && j.name.toLowerCase().includes(searchInput.value.toLowerCase())) {
                arr.push(j)
            }
            j?.cities?.forEach(sin => {
                if (sin.name.toLowerCase().includes(searchInput.value.toLowerCase())) {
                    arr.push(sin)
                }
            })
        })

    })
    arr?.forEach(recommendation => {

        heroRecommendations.classList.remove('hide')
        heroRecommendations.classList.add('show')
        heroRecommendations.innerHTML += renderTemplate(recommendation)
    })

}


clearButton.onclick = () => {
    clearRecommendations()
    searchInput.value = ""

}