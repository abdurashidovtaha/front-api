const url = 'http://localhost:9999/api';//http://localhost:9999/api+/posts:+id
const rootEl = document.getElementById('root');

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
const formSubmitEl = rootEl.querySelector('[data-action="submit-form"]');
const inputPriceEl = rootEl.querySelector('[data-id="price"]');
const inputCategoryEl = rootEl.querySelector('[data-id="category"]');
let itemList = rootEl.querySelector('[data-id="item-list"]');

function getAllPosts() {
    const queryParams = '/posts';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}${queryParams}`);

    xhr.addEventListener('load', evt => {
        const response = xhr.responseText;
        posts = JSON.parse(response);

        posts.forEach(o => {
            let itemListEl = document.createElement('li');
            itemListEl.innerHTML = `
            Покупка на сумму ${o.price} в категории ${o.category}
            <button data-action="deletebtn">X</button>
            `;
            itemList.appendChild(itemListEl);
            const addDeleteBtn = itemListEl.querySelector('[data-action="deletebtn"]');
            addDeleteBtn.onclick = () => {
                deleteBtn(o.id);
            }

        })
    });
    xhr.send();
}

function addData() {
    const queryParams = "/posts"
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${url}${queryParams}`)
    xhr.setRequestHeader('Content-Type', 'application/json');

    const value = inputPriceEl.value;
    const category = inputCategoryEl.value;

    let data = {
        id: 0,
        category: category,
        price: value
    };

    xhr.send(JSON.stringify(data));
}

function deleteBtn(id) {
    const queryParams = `/posts/${id}`;
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://localhost:9999/api${queryParams}`);
    console.log(id);
    
    xhr.send();
}

function deleteData() {
    const queryParams = ""
}

formSubmitEl.addEventListener("submit", evt => {
    addData();
});