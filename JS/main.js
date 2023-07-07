var productName = document.getElementById('pn');
var productPrice = document.getElementById('pp');
var productCategory = document.getElementById('pc');
var productDescription = document.getElementById('pd');
var tbody = document.getElementById('tbody');
var addBtn = document.getElementById('addBtn');

var allProducts = [];
var mainIndex = 0;

if (localStorage.getItem('allProducts') != null) {
    allProducts = JSON.parse( localStorage.getItem('allProducts') );
    displayAllData();
}

function addElement() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDescription.value,
    }
    if (addBtn.innerHTML == 'Add') {
        allProducts.push(product);
        localStorage.setItem( 'allProducts', JSON.stringify(allProducts) );
        displayAllData();
        clearForm()
    }

    else {
        allProducts.splice(mainIndex, 1, product);
        localStorage.setItem( 'allProducts', JSON.stringify(allProducts) );
        displayAllData();
        clearForm();
    }
}

function displayAllData() {
    var groupingProducts = '';
    for (var i = 0; i < allProducts.length; i++) {
        groupingProducts += `
            <tr>
                <td>${allProducts[i].name}</td>
                <td>${allProducts[i].price}</td>
                <td>${allProducts[i].category}</td>
                <td>${allProducts[i].desc}</td>
                <td>
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteElement(${i})">Delete</button>
                </td>
                <td>
                    <button class="btn btn-outline-success btn-sm" onclick="update(${i})">Update</button>
                </td>
            </tr>
        `;
    }
    tbody.innerHTML = groupingProducts + `
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <button class="btn btn-outline-success btn-sm" onclick="deleteAll()">Delete All</button>
        </td>
        <td></td>
        <td>
        </td>
    </tr>
    `;
}

function clearForm() {
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDescription.value = '';
}

function deleteElement(index) {
    if (allProducts.length == 1) {
        allProducts.splice(index, 1);
        localStorage.setItem('allProducts', JSON.stringify(allProducts));
        displayAllData();
        tbody.innerHTML = '';
    } else {
        allProducts.splice(index, 1);
        localStorage.setItem('allProducts', JSON.stringify(allProducts));
        displayAllData();
    }
}

function update(index) {
    mainIndex = index;
    addBtn.innerHTML = 'update';
    productName.value = allProducts[index].name;
    productPrice.value = allProducts[index].price;
    productCategory.value = allProducts[index].category;
    productDescription.value = allProducts[index].desc;
}

function deleteAll() {
    tbody.innerHTML = '';
    localStorage.clear();
}

function search(term) {
    var trs = '';
    for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name.toLowerCase().includes(term.toLowerCase()) || allProducts[i].category.toLowerCase().includes(term.toLowerCase())) {
            trs += `
            <tr>
                <td>${allProducts[i].name.replace(term, `<span>${term}</span>`)}</td>
                <td>${allProducts[i].price}</td>
                <td>${allProducts[i].category.replace(term, `<span>${term}</span>`)}</td>
                <td>${allProducts[i].desc}</td>
                <td>
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteElement(${i})">Delete</button>
                </td>
                <td>
                    <button class="btn btn-outline-success btn-sm" onclick="update(${i})">Update</button>
                </td>
            </tr>
        `;
        }
    } 

    tbody.innerHTML = trs  + `
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <button class="btn btn-outline-success btn-sm" onclick="deleteAll()">Delete All</button>
        </td>
        <td></td>
        <td>
        </td>
    </tr>
    `;
}