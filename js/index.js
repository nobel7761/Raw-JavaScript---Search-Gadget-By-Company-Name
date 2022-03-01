const searchResults = document.getElementById('search-results');

const search = () => {
    let searchText = document.getElementById('search-input').value;
    searchText = searchText.toLowerCase();
    // console.log(searchText);

    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(response => response.json())
        .then(data => searchPhone(data.data))
}




const searchPhone = (phones) => {
    if (phones.length === 0) {
        searchResults.textContent = '';
        document.getElementById('search-input').value = '';
        document.getElementById('no-search-result').style.display = 'block'
    }
    else {
        searchResults.textContent = '';
        document.getElementById('search-input').value = '';
        document.getElementById('no-search-result').style.display = 'none';
        phones.splice(0, 20).map(phone => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card shadow rounded p-3" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top mx-auto img-fluid w-75">
                 <div class="card-body  d-flex flex-column">
                     <h5 class="card-title text-center">${phone.phone_name}</h5>
                     <h5 class="brand_name text-center">${phone.brand}</h5>
                     <a href="#" onclick="phoneDetail('${phone.slug}')" class="btn btn-primary mx-auto">Show Details</a>
                </div>
            </div>
            `
            searchResults.appendChild(div)
            console.log(phone)
        })
    }

}

const phoneDetail = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(response => response.json())
        .then(data => console.log(data.data))
}