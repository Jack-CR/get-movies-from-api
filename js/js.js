let d = document;
const $moviesList = d.querySelector(".movies-list");
const $search = d.getElementById("search");
const $template = d.querySelector(".movie-list-template").content;
const $inputMovie = d.getElementById("inputMovie");
const $fragment = d.createDocumentFragment();

const getMovie = async (movieName) => {
    try {
        let res = await fetch(`https://api.tvmaze.com/search/shows?q=${movieName}`),
            json = await res.json();

        DomMovies(json);
    } catch (error) {

    }
}

const DomMovies = async (json) => {
    json.forEach(el => {
        console.log(el.show)

        $template.querySelector(".movieName").textContent = el.show.name;

        if (el.show.image != null) {
            $template.querySelector(".movieImage").setAttribute("src", `${el.show.image.medium}`),
                $template.querySelector(".movieImage").setAttribute("alt", `${el.show.name}`);
        }

        let node = d.importNode($template, true);
        $fragment.appendChild(node);
    });

    $moviesList.appendChild($fragment);
}

d.addEventListener("submit", async e => {
    e.preventDefault();
    getMovie($inputMovie.value)
});
