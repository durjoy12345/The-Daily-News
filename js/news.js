
const loadData = async () => {
    const url= "https://openapi.programming-hero.com/api/news/categories"
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  
  const displayData = async () => {
   
      const data = await loadData();
    
      const allData = data.data.news_category;
      const secondNav = document.getElementById("second-nav");
      const countingName = [];
      allData.forEach((singleData) => {
      if (countingName.indexOf(singleData.category_name) === -1) {
        
          const userul = document.createElement("ul");
        
          userul.innerHTML = `
              <li onclick="loadPostId('${singleData.category_id ? singleData.category_id : 'no post'}')" class="nav-item active mx-2 px-1">
                  <a class="nav-link" href="#">${singleData.category_name}</a>
              </li>
        `;
          secondNav.appendChild(userul);
        }
    });
    
  };
displayData();


const spinBar = isLoading => {
    const loadSection = document.getElementById('loader');
    if (isLoading) {
        loadSection.classList.remove('d-none');
    }
    else{
        loadSection.classList.add('d-none');
    }
}
  
  const loadPostId = (category_id) => {
      const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
      fetch(url)
      .then(res => res.json())
        .then(data => displayPostData(data.data))
        .catch(error => console.log(error))
  }
  loadPostId('01');
  
const displayPostData = post => {
    const totalPost = document.getElementById('count-post');
    totalPost.innerHTML = `
    <p>Here are <span>${post.length}</span> items found for category Entertainment</p>
    `;
   
      const mainContainer = document.getElementById('main-container');
      mainContainer.innerHTML = ``;
      post = post.slice(0, 10);
      const noPost = document.getElementById('no-post');
      if (post.length === 0) {
          noPost.classList.remove('d-none');
      }
      else {
          noPost.classList.add('d-none');
      }
      post.forEach(post => {
      
          const div = document.createElement('div');
          div.classList.add('row');
          div.innerHTML = `
          <div class="col-md-3 col-sm-12 border border-1 border-start-0 border-end-0 py-4">
              <img src="${post.thumbnail_url}" class="img-fluid rounded-start ms-4" alt="...">
        </div>
        <div class="col-md-9 col-sm-12 border border-1 border-start-0 border-end-0 py-4">
          <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p onclick="ModalviewNews('${post._id}')" class="card-text">${post.details.slice(0, 400)}</p>
            
              <!-- Scrollable modal -->
              
              <div class="d-flex justify-content-between mt-5">
                    <div class="d-flex justify-content-between">
                    <img class="author-image author-image rounded-3 mt-1" src="${post.image_url}">
                    <div class="ms-2 mt-2">
                        <h5>${post.author.name ? post.author.name : 'No Author Name'}</h5>
                        <p>${post.author.published_date}</p>
                    </div>
                    </div>
                    <div class="mt-4">
                    <h3 class="card-text"><i class="fas fa-eye"></i> ${post.total_view ? post.total_view : 'No View'}</h3>
                    </div>
                    <div class="mt-4 d-flex justify-content-between">
                        <h4><i class="fas fa-star"></i></h4>
                        <h4><i class="fas fa-star-half-alt"></i></h4>
                        <h4><i class="far fa-star"></i></h4>
                    </div>
                    <div class="mt-4">
                        <h3><a href="#"><i class="fas fa-arrow-right"></i></a></h3>
                    </div>
              </div>
          </div>
         </div>
          `
          mainContainer.appendChild(div);
      });
      spinBar(false);
}

const ModalviewNews = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayModalviewNews(data.data))
        .catch(error => console.log(error))
};

const displayModalviewNews = detailsNews => {
   
    const details = document.getElementById('modal');
    details.innerText = '';
    for (const detail of detailsNews) {
        
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <p>${detail.details.slice(0, 1500)}</p>
        
        `;
        
        details.appendChild(newDiv);
    }
}

ModalviewNews();