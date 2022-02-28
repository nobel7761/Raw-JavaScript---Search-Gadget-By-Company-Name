const search = () => {
    let searchText = document.getElementById('search-input').value;
    console.log(searchText);
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(response => response.json())
        .then(data => searchPhone(data.data))
}


const searchResults = document.getElementById('search-results');

const searchPhone = (phones) => {
    phones.map(phone => {

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card shadow rounded p-3" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top mx-auto img-fluid w-75">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-center">${phone.phone_name}</h5>
                    <a href="#" class="btn btn-primary mx-auto">Details</a>
                </div>
            </div>
        `
        searchResults.appendChild(div)
        console.log(phone)
    })
}