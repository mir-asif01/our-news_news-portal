// loading category

const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(categories => showCategories(categories.data.news_category));
}
const showCategories = (categories) =>{
    for(const category of categories){
        // console.log(category.category_id)
        const categoryContainer = document.getElementById('categories');
        const newCategoryDiv = document.createElement('div');
        newCategoryDiv.innerHTML = `
        <button class="text-2xl tab" onclick="loadNews(${category.category_id})" >${category.category_name}</button>
        `
        categoryContainer.appendChild(newCategoryDiv)
    }
}
loadCategories();

///////////////////////////////////////////////
// show news function

const loadNews = (category) =>{
    // console.log(category);
    const url =`https://openapi.programming-hero.com/api/news/category/0${category}`
    fetch(url)
    .then(res => res.json())
    .then(allNews => showNews(allNews.data));
}

const showNews = (newsArray) =>{
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    for(const news of newsArray){
        console.log(news)
        // console.log(news.total_view ? news.total_view : 'no data')
        const newNewsDiv = document.createElement('div');
        newNewsDiv.innerHTML = `
        <div class="card lg:card-side bg-base-100 m-3 shadow-xl">
        <img src="${news.thumbnail_url}" alt="Album">
        <div class="card-body">
          <h2 class="card-title">New album is released!</h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Listen</button>
          </div>
        </div>
    </div>
        `
        newsContainer.appendChild(newNewsDiv);
    }
}