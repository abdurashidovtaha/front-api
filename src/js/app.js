const url = 'http://localhost:9999/api';
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

{/* <form data-action="find">
        <input placeholder="id" data-id="id-number"/>
        <button>give me the id</button>
    </form> */}

    
const formSubmitEl = rootEl.querySelector('[data-action="submit-form"]');
const inputPriceEl = rootEl.querySelector('[data-id="price"]');
const inputCategoryEl = rootEl.querySelector('[data-id="category"]');
const submitBtn = rootEl.querySelector('[data-action="submit-but"]');
const findBtn = rootEl.querySelector('[data-action="find"]');
const idNum = rootEl.querySelector('[data-id="id-number"]')
let itemList = rootEl.querySelector('[data-id="item-list"]');


formSubmitEl.onsubmit = evt => {
    addData();
};

findBtn.onsubmit = evt => {
    evt.preventDefault();
    const index = idNum;
    itemList.innerHTML = ``;
    findData(index);
}

// function findData(id) {
//     const queryParams = `/posts/${id}`;
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', `${url}${queryParams}`);

//     xhr.onload = () => {
//         const response = xhr.responseText;
//         posts = JSON.parse(response);
//         console.log(posts);

//         let itemListEl = document.createElement('li');
//         itemListEl.innerHTML = `
//             Покупка на сумму ${posts.price} в категории ${posts.category}
//             <button data-action="deletebtn">X</button>
//             <button data-action="edit">Edit</button>
//             `;
//         itemList.appendChild(itemListEl);
//         const addDeleteBtn = itemListEl.querySelector('[data-action="deletebtn"]');
//         addDeleteBtn.onclick = () => {
//             itemList.innerHTML = ``;
//             deleteBtn(posts.id);
//         }

//         const addEditBtn = itemListEl.querySelector('[data-action="edit"]');
//         addEditBtn.onclick = () => {
//             inputPriceEl.focus();
//             submitBtn.innerHTML = `Edit`;
//             formSubmitEl.onsubmit = () => {
//                 itemList.innerHTML = ``;
//                 editData(posts.id);
//             }
//         }
//     }

//     xhr.send();
// }


function getAllPosts() {
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
            addDeleteBtn.onclick = () => {
                itemList.innerHTML = ``;
                deleteBtn(o.id);
            }

            const addEditBtn = itemListEl.querySelector('[data-action="edit"]');
            addEditBtn.onclick = () => {
                inputPriceEl.focus();
                submitBtn.innerHTML = `Edit`;
                formSubmitEl.onsubmit = () => {
                    itemList.innerHTML = ``;
                    editData(o.id);
                }
            }
        })
    };

    xhr.send();
}

function addData() {
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

    xhr.send(JSON.stringify(data));
}

function editData(id) {
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
    xhr.send(JSON.stringify(data));
    getAllPosts();
}

function deleteBtn(id) {
    const queryParams = `/posts/${id}`;
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://localhost:9999/api${queryParams}`);
    xhr.onload = () => {
        getAllPosts();
        console.log(id);
    }

    xhr.send();
}