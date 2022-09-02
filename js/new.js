const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(categories => showCategories(categories.data.news_category));
}
const showCategories = (categories) =>{
    for(const category of categories){
        console.log(category.category_name)
        const categoryContainer = document.getElementById('categories');
        const newCategoryDiv = document.createElement('div');
        newCategoryDiv.innerHTML = `
        <button class="text-2xl tab">${category.category_name}</button>
        `
        categoryContainer.appendChild(newCategoryDiv)
    }
}



loadCategories();