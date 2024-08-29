const URL = "http://localhost:3005/products/";

const getProducts = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    return data.products.slice(0, 20);
}

const loadProducts = async () => {
    const products = await getProducts();
    const div = document.getElementById('wrapper');
    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'wrapper';


    products.forEach(elm => {
        const productDiv = document.createElement('div');
        productDiv.className = 'cont';
        productDiv.innerHTML = `
        <img style="width:100px; height:150px" src="${elm.image}" alt="${elm.title}"/>
            <p>${elm.title}</p>
            <p><strong>${elm.price}$</strong></p>
            <button class="btn">buy now</button>
        `;
        wrapperDiv.appendChild(productDiv);
    });

    div.appendChild(wrapperDiv);
}

loadProducts();


