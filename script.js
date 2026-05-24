let products = [];
let activeCategory = 'Alle';

async function loadData(){
 const productsRes = await fetch('./data/products.json');
 const categoriesRes = await fetch('./data/categories.json');

 products = await productsRes.json();
 const categories = await categoriesRes.json();

 renderCategories(categories);
 renderProducts(products);

 document.getElementById('search')
 .addEventListener('input', filterProducts);
}

function renderCategories(categories){
 const nav = document.getElementById('categories');
 nav.innerHTML = '';

 categories.forEach(cat=>{
   const btn = document.createElement('button');
   btn.className = 'category-btn';
   btn.innerText = cat;

   btn.onclick = ()=>{
      activeCategory = cat;
      filterProducts();
   };

   nav.appendChild(btn);
 });
}

function filterProducts(){
 const search = document.getElementById('search').value.toLowerCase();

 const filtered = products.filter(p=>{
   const matchesSearch = p.title.toLowerCase().includes(search);
   const matchesCategory = activeCategory === 'Alle' || p.category === activeCategory;

   return matchesSearch && matchesCategory;
 });

 renderProducts(filtered);
}

function renderProducts(list){
 const container = document.getElementById('products');
 container.innerHTML = '';

 list.forEach(product=>{
   const card = document.createElement('div');
   card.className = 'card';

   card.innerHTML = `
     <img src="${product.image}" alt="${product.title}">
     <div class="card-content">
       <div class="featured-badge">${product.trending ? 'TRENDING' : ''}</div>
       <h2>${product.title}</h2>
       <p>${product.description}</p>
       <h3>${product.price}</h3>
       <a class="btn" href="${product.link}" target="_blank">Bei Amazon ansehen</a>
     </div>
   `;

   container.appendChild(card);
 });
}

loadData();
