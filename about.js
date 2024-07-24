"use strict"
const workers = document.getElementById('workers');


const workersData = [
    {name: 'Dor Levy', desc: 'Good Man', job: 'CEO'},
    {name: 'Eden Iskovich', desc: 'Good Worker', job: 'Lead'},
    {name: 'Roman Zadorov', desc: 'Good Worker', job: 'Delivery Head'},
]
const renderTemplate = ({name, desc, job}) => {
    return `<div class="worker">
                <img src="" alt="">
                <div class="details">
                    <p>${name}</p>
                    <p>${desc}</p>
                    <span>${job}</span>
                </div>
            </div>`
}

(function () {
    workersData.forEach(worker => {
        workers.innerHTML += renderTemplate(worker)
    })

})()