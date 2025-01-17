let token = 'xhgX05EiAmzF4OzrBlvItr4tbmSOG1Avk7yq95Z1eDbK38kS2t3SbzjT'; // key de autorização ao fazer requisição no API pexels
let urlAuth; 
let foto = document.querySelectorAll('.sub_img'); 
let containeSubImg = document.querySelector('#container-sub_img');
let imgBig = document.querySelector('#img-big'); 
let capaAlbum = document.querySelector('#capaAlbum'); 
let galeria = document.querySelector('#galeria');
let containerLoading = document.querySelector('#loading');
let autor = new Array();
let urlAutor= new Array(); 
var vetorFoto = new Array(); 
let flag=0; 
let position=0; 
let pag=1; 

let campoBusca = document.querySelector("#campoBusca");

//função inicial e responsável por chamar a fução que faz a requisição na API
function criarLista(){    
    
    if(campoBusca.value){
        containeSubImg.style.visibility = 'hidden';
        document.querySelector("#legend-img").style.display = "none";
        let width = tamdaTela(galeria);
        width = tamTelaInt(width);
        containerLoading.style.visibility ='visible';
        pag=1;
        $('#galeria').animate({
            scrollLeft: '0px' 
        }, 1000);
        flag=0;
        imgBig.style.visibility = 'hidden';
        capaAlbum.textContent = campoBusca.value;
        capaAlbum.style.visibility = 'hidden';
        urlAuth = "https://api.pexels.com/v1/search?query="+campoBusca.value;
        geraAuthToken(urlAuth);
    }      
}

//Função para fazer autenticação/requisição na API e armazenamento dos dados Json. exemplo autores e urls. 
async function geraAuthToken(urlAuthToken) {
    try {
        if (flag <= 19) {
            const response = await fetch(urlAuthToken, {
                headers: { Authorization: token },
            });

            if (response.ok) {
                const jsonObj = await response.json();
                vetorFoto[flag] = jsonObj.photos[0];
                let newUrl = jsonObj.next_page;
                inserirSubImg(vetorFoto[flag].src.large, flag);
                flag++;
                geraAuthToken(newUrl);
            } else {
                alert('Erro ao receber os dados.');
                location.reload();
            }
        } else {
            capaAlbum.style.visibility = 'visible';
            containerLoading.style.visibility = 'hidden';
            containeSubImg.style.visibility = 'visible';
        }
    } catch (error) {
        alert('Digite outro tema.');
        location.reload();
    }
}

//carregando fotos para carrossel
function inserirSubImg(src,img){
    
    foto = document.querySelector("#img"+img); 
    foto.setAttribute('src',src);  
    autor[img] = vetorFoto[img].photographer;
    urlAutor[img] = vetorFoto[img].photographer_url;
}

//definindo a foto selecionada no carrossel como a imagem principal
function colocarNaBig(img){
    document.querySelector("#legend-img").style.display = "block";
    capaAlbum.style.visibility = 'hidden';
    imgBig.style.visibility = 'visible';
    foto = document.querySelector("#img"+img);
    let src = foto.getAttribute('src');
    document.querySelector('#legend-img').innerHTML = "<a id='link-autor' href='"+urlAutor[img]+"'target='_blank'>Autor:<br>"+autor[img]+"</a>";

    imgBig.setAttribute('src',src);

}

// função responsável por pegar o tamanho do container das sub imagens.
function tamdaTela(container){
    return window.getComputedStyle(container).getPropertyValue('width');
}


//função responsavel pela paginação e controle das páginas
function paginacao(action){
    let width = tamdaTela(galeria);
    let totalFotos;
    totalFotos = (flag);

    let fotosPagina = numFotos(width);

    if(action===1){
        if(pag*fotosPagina<totalFotos){
            $('#galeria').animate({
                scrollLeft: (pag*position)+'px' 
            }, 1000); 
            pag++;
        }    
    }
    if(action===0){
        if(pag>1){
            pag--;
            $('#galeria').animate({
                scrollLeft: (pag*position - position)+'px'
            }, 1000);
        }
        
    }
    
}

//função responsável por alterar o tamanho do deslocamento do scroll e o numero de fotos em cada pagina de acordo 
//com o tamanho do container das imagens do carrossel.
function numFotos(width){
    if(width==='270px'){
        position=272;
        return fotosPagina = 3;
    }
    if(width==='660px'){
        position=660;
        return fotosPagina = 7;
    }
    if(width==='893px'){
        position=893;
        return fotosPagina = 7;
    }
    if(width==='1200px'){
        position=1200;
        return fotosPagina = 10;
    }    
}

//função responsável por retornar o tamanho da região onde as sub imagens se localizam em valor númerico
function tamTelaInt(width){
    if(width==='270px'){
        return 270;
    }
    if(width==='660px'){
        return 660;
    }
    if(width==='893px'){
        return position=893;
    }
    if(width==='1200px'){
        return position=1200;
    }  
}