let num_fotos = 19; 
// função responsável por criar as tags 'espaços' onde as sub imagens vão ficar.
for(let i=0;i<=num_fotos;i++){

    document.write("<div onclick=colocarNaBig("+i+") style='margin-right: 1%;cursor: pointer;'><img id='img"+i+"' class='sub_img' src='images/leadster_icon.png' alt=''></div>")

}