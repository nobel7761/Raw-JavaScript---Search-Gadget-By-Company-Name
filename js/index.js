const searchResults = document.getElementById('search-results');
const detailSection = document.getElementById('phone-details');

const search = () => {
    let searchText = document.getElementById('search-input').value;
    searchText = searchText.toLowerCase();
    // console.log(searchText);
    if (searchText === '') {
        searchResults.textContent = '';
        detailSection.textContent = '';
        document.getElementById('search-input').value = '';
        document.getElementById('empty-inputField').style.display = 'block';
        document.getElementById('no-search-result').style.display = 'none';
        document.getElementById('results-number-section').style.display = 'none';
    }
    else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(response => response.json())
            .then(data => searchPhone(data.data))
    }
}

const searchPhone = (phones) => {

    if (phones.length === 0) {
        detailSection.textContent = '';
        searchResults.textContent = '';
        document.getElementById('search-input').value = '';
        document.getElementById('empty-inputField').style.display = 'none'
        document.getElementById('no-search-result').style.display = 'block'
        document.getElementById('results-number-section').style.display = 'none';
    }
    else if (phones.length > 0) {
        console.log(phones.length);
        detailSection.textContent = '';
        searchResults.textContent = '';
        document.getElementById('search-input').value = '';
        document.getElementById('no-search-result').style.display = 'none';
        document.getElementById('empty-inputField').style.display = 'none';
        document.getElementById('results-number-section').style.display = 'block';
        document.getElementById('results-number').innerText = phones.length;

        phones.splice(1, 20).map(phone => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card shadow rounded p-3" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top mx-auto img-fluid w-75">
                 <div class="card-body  d-flex flex-column">
                     <h5 class="card-title text-center">${phone.phone_name}</h5>
                     <h5 class="brand_name text-center">${phone.brand}</h5>
                     <a href="#" onclick="getPhone('${phone.slug}')" class="btn btn-primary mx-auto">Show Details</a>
                </div>
            </div>
            `
            searchResults.appendChild(div)
            // console.log(phone)
        })
    }
}

const getPhone = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(response => response.json())
        .then(data => phoneDetails(data.data))
}

const phoneDetails = (details) => {
    document.getElementById('results-number-section').style.display = 'none';
    detailSection.textContent = '';
    const detailDiv = document.createElement('div');
    detailDiv.innerHTML = `
        <div class="phone-detail rounded shadow">
            <div class="details">
                <img src="${details.image}">
                <h4 class="text-primary">${details.name}</h4>
            </div>
            <div>
                <p class="text-danger">${details.releaseDate}</p>

                <h5 ><b><u>Main Features:</u></b> </h5>
                <p><b>Storage: </b><span>${details.mainFeatures.storage}</span></p>
                <p><b>Display Size: </b><span>${details.mainFeatures.displaySize}</span></p>
                <p><b>Chipset: </b><span>${details.mainFeatures.chipSet}</span></p>
                <p><b>Memory: </b><span>${details.mainFeatures.memory}</span></p>
                <p><b>Sensors: </b><span>${details.mainFeatures.sensors}</span></p>
            </div>

            <div>
                <h5><b><u>Other Features:</u></b> </h5>
                <p><b>WLAN: </b><span>${details.others.WLAN}</span></p>
                <p><b>Bluetooth: </b><span>${details.others.Bluetooth}</span></p>
                <p><b>GPS: </b><span>${details.others.GPS}</span></p>
                <p><b>NFC: </b><span>${details.others.NFC}</span></p>
                <p><b>Radio: </b><span>${details.others.Radio}</span></p>
                <p><b>USB: </b><span>${details.others.USB}</span></p>
            </div>
        </div>
    `
    detailSection.appendChild(detailDiv);

}
