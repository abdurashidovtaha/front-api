const url = 'https://requeststaha.herokuapp.com/api';
const rootEl = document.getElementById('root');
const img = '../media/loader.gif';

let posts = [];
getAllPosts();

rootEl.innerHTML = `
    <form data-action="submit-form">
        <label for="price">Enter the price</label>
        <input id="price" placeholder="price" data-id="price"/>
        <label for="category">Enter the category</label>
        <input id="category" placeholder="category" data-id="category"/>
        <button data-action="submit-but">Add</button>
    </form>
    <ul data-id="item-list">
    </ul>
`;

const loading = document.createElement('img');
loading.src = img; 
rootEl.appendChild(loading);
loading.classList.add('hidden');
    
const formSubmitEl = rootEl.querySelector('[data-action="submit-form"]');
const inputPriceEl = rootEl.querySelector('[data-id="price"]');
const inputCategoryEl = rootEl.querySelector('[data-id="category"]');
const submitBtn = rootEl.querySelector('[data-action="submit-but"]');
const idNum = rootEl.querySelector('[data-id="id-number"]')
let itemList = rootEl.querySelector('[data-id="item-list"]');


formSubmitEl.onsubmit = evt => {
    evt.preventDefault();
    addData();
};

function getAllPosts() {
    loading.classList.remove('hidden');
    const queryParams = '/posts';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}${queryParams}`);

    xhr.onload = () => {
        //load-error-loadend
        const response = xhr.responseText;//xhr.response->DORA xdsh=> chize ki az back miya
        posts = JSON.parse(response);

        posts.forEach(o => {
            let itemListEl = document.createElement('li');
            itemListEl.innerHTML = `
            Покупка на сумму ${o.price} в категории ${o.category}
            <button data-action="deletebtn">X</button>
            <button data-action="edit">Edit</button>
            `;
            itemList.appendChild(itemListEl);
            //dalshe baroi digar chizay imruzda xay darkor nest, dalshe paga
            const addDeleteBtn = itemListEl.querySelector('[data-action="deletebtn"]');
            addDeleteBtn.onclick = evt => {
                evt.preventDefault();
                itemList.innerHTML = ``;
                deleteBtn(o.id);
            }

            const addEditBtn = itemListEl.querySelector('[data-action="edit"]');
            addEditBtn.onclick = evt => {
                evt.preventDefault();
                inputPriceEl.focus();
                submitBtn.innerHTML = `Edit`;
                inputPriceEl.value = o.price;
                inputCategoryEl.value = o.category;
                formSubmitEl.onsubmit = () => {
                    itemList.innerHTML = ``;
                    editData(o.id);
                }
            }
        })
    };

    xhr.onloadend = () => {
        loading.classList.add('hidden');
    }

    xhr.send();
}

function addData() {
    loading.classList.remove('hidden');
    const queryParams = "/posts";
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${url}${queryParams}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const value = inputPriceEl.value;
    const category = inputCategoryEl.value;

    let data = {
        id: 0,
        category: category,
        price: value
    };

    xhr.onload = () => {
    }

    xhr.onloadend = () => {
        loading.classList.add('hidden');
    }

    xhr.send(JSON.stringify(data));
}

function editData(id) {
    loading.classList.remove('hidden');
    const queryParams = "/posts";
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${url}${queryParams}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const value = inputPriceEl.value;
    const category = inputCategoryEl.value;

    const data = {
        id: id,
        category: category,
        price: value
    };

    xhr.onload = () => {
    }

    xhr.onloadend = () => {
        loading.classList.add('hidden');
    }

    xhr.send(JSON.stringify(data));
    getAllPosts();
}

function deleteBtn(id) {
    loading.classList.remove('hidden');
    const queryParams = `/posts/${id}`;
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${url}${queryParams}`);
    xhr.onload = () => {
        getAllPosts();
        console.log(id);
    }

    xhr.onloadend = () => {
        loading.classList.add('hidden');
    }

    xhr.send();
}