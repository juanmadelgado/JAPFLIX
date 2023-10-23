const bton = document.getElementById("btnBuscar");
const lista = document.getElementById("lista");
const url = "https://japceibal.github.io/japflix_api/movies-data.json";
const infoCanvas = document.getElementById("infoCanvas");

//Buscador y fetch
function performSearch(){
  const busqueda = document.getElementById("inputBuscar").value; 
  if (busqueda.trim() === "") { // Valida si el campo de búsqueda está vacío
      alert("Debes escribir el nombre de una película"); // Mostrar una alerta al usuario
    //  return; // Salir de la función sin realizar la solicitud
  }else{

  fetch (url)
  .then(response => response.json())
  .then(data => {
      console.log(data);
      showMovies(data, busqueda);
      showOffCanvas(data);
  })
  .catch(error => {console.log(error)});
}
};

//Busca al presionar la tecla Enter
inputBuscar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
      // Verificar si se presionó la tecla "Enter"
      performSearch();
  }
});

//Busca al clickear el botón
bton.addEventListener("click", () => {
  performSearch();
});


function showMovies(data_movies, busqueda) {
    lista.innerHTML = '';
    data_movies.forEach(movie =>  {
        const title = movie.title;
        const genres = movie.genres.join(","); //el join une los generos en una cadena para generar la comparacion con busqueda
        const overview = movie.overview;
        const tagline = movie.tagline;
        // 
      // Verificar si la película coincide con la búsqueda
      if (
        title.toLowerCase().includes(busqueda.toLowerCase()) ||
        genres.toLowerCase().includes(busqueda.toLowerCase()) ||
        tagline.toLowerCase().includes(busqueda.toLowerCase()) ||
        overview.toLowerCase().includes(busqueda.toLowerCase())
    ) {
      lista.innerHTML += `
        <div class="list-group-item mb-2 bg-dark text-white" data-bs-toggle="offcanvas" data-bs-target="#offcanvas_${movie.id}" aria-controls="offcanvasTop">
            <h5>${movie.title}</h4>
            <em class="text-muted">${movie.tagline}</em>
            <span class="estrella">
            ${stars(movie.vote_average)}
           </span>
        </div>
        `;

       
    }})
};


function showOffCanvas(data_movies){
  data_movies.forEach(movie =>  {
  infoCanvas.innerHTML += `

  <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvas_${movie.id}" aria-labelledby="offcanvasTopLabel">
        <div class="offcanvas-header">
        <h5 class="offcanvas-title"  id="offcanvasTopLabel">${movie.title}</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
    <div class="offcanvas-body"  style="overflow: visible;">
    <div class="row">
        <div class="col-12">
          <p>${movie.overview}</p>
         </div>
         <hr>
       <div class="col-10">
          <p class="text-muted">${movie.genres.map(item => item["name"]).join(" - ")}</p>
        </div>
        <div class="col-2">
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle float-end" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          More
        </button>
        <ul class="dropdown-menu">
          <li class="dropdown-item-text">Year: ${getYearFromDate(movie.release_date)}</li>
          <li class="dropdown-item-text">Runtime: ${movie.runtime} mins</li>
          <li class="dropdown-item-text">Budget: $${movie.budget}</li>
          <li class="dropdown-item-text">Revenue: $${movie.revenue}</li>
        </ul>
     </div>
  </div>
  </div>
          `
})};

//Mostrar solo el año
function getYearFromDate(date) {
  const parts = date.split('-');
  return parts[0];
}

//Mostrar estrellas
  function stars(quantity) {
    return "<i class='fa fa-star checked'></i>".repeat(Math.floor(quantity/2)) + "<i class='fa fa-star'></i>".repeat(5 - Math.floor(quantity/2));
  };

 


    
    



    