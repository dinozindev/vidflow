const containerVideos = document.querySelector(".videos__container");
const barraDePesquisa = document.querySelector(".pesquisar__input");
const botaoCategoria = document.querySelectorAll(".superior__item");

async function buscarEMostrarVideos() {
    try {
        const fetchAPI = await fetch("http://localhost:3000/videos")
        const videos = await fetchAPI.json();
        videos.forEach(video => {
            if (video.categoria == "") {
                throw new Error("Vídeo não tem categoria");
            }
            containerVideos.innerHTML += `
        <li class="videos__item">
        <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
        <div class="descricao-video">
            <img src="${video.imagem}" class="img-canal" alt="Logo do canal">
            <h3 class="titulo-video">${video.titulo}</h3>
            <p class="titulo-canal">${video.descricao}</p>
            <p class="categoria" hidden>${video.categoria}</p>
        </div>
        </li>
        `
        })
    } catch (error) {
        containerVideos.innerHTML = `
            <p>Houve um erro ao carregar os vídeos. ${error}</p>
        `
    } finally {

    }
}

buscarEMostrarVideos();

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll(".videos__item")
    let valorFiltro = barraDePesquisa.value.toLowerCase();

    if (barraDePesquisa.value != "") {
        videos.forEach(video => {
            if (!video.querySelector(".titulo-video").textContent.toLowerCase().includes(valorFiltro)) {
                video.style.display = 'none';
            } else {
                video.style.display = 'block';
            }
        })
    } else {
        videos.forEach(video => {
           video.style.display = 'block'; 
        })
        
    }
}

botaoCategoria.forEach(botao => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
})

function filtrarPorCategoria(filtro) {
    const videos = document.querySelector(".videos__item");
    videos.forEach(video => {
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let filtroNome = filtro.toLowerCase();

        if (!categoria.includes(filtroNome) && filtroNome != "Tudo") {
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    })

}


