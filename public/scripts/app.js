/*
Estados 
  Turno Jugador
  Tablero
  Ya ganaron 
*/
//identificacion de jugador 
var viewport = document.getElementById("viewport");
var state= {
  tablero: [[0,0,0],[0,0,0],[0,0,0]],
  turno: 0,
  ganador: false
} ;
var botones= []
var sbotones=[]
function resetear(){
  botones= []
  sbotones=[]
  state= {
    tablero: [[0,0,0],[0,0,0],[0,0,0]],
    turno: 0,
    ganador: false
  } ;
  renderAssign();

}

function escribir(casilla){
  var escribir=0;
  if(state.turno==0){
    escribir=1
  }else{
    escribir=-1
  }
  if(casilla==1){
    state.tablero[0][0]=escribir;
    sbotones[sbotones.length]=casilla;
  }
  if(casilla==2){
    state.tablero[0][1]=escribir;
    sbotones[sbotones.length]=casilla; 
  }
  if(casilla==3){
    state.tablero[0][2]=escribir;
    sbotones[sbotones.length]=casilla;
  }
  if(casilla==4){
    state.tablero[1][0]=escribir;
    sbotones[sbotones.length]=casilla;
  }
  if(casilla==5){
    state.tablero[1][1]=escribir;
    sbotones[sbotones.length]=casilla;
  }
  if(casilla==6){
    state.tablero[1][2]=escribir;
    sbotones[sbotones.length]=casilla;
  }
  if(casilla==7){
    state.tablero[2][0]=escribir;
    sbotones[sbotones.length]=casilla;
  }
  if(casilla==8){
    state.tablero[2][1]=escribir;
    sbotones[sbotones.length]=casilla;
  }
  if(casilla==9){
    state.tablero[2][2]=escribir;
    sbotones[sbotones.length]=casilla;
  }
}

function render (state){
  var turno= state.turno;
  var tablero= state.tablero;
  var ganador= state.ganador; 
  botones=[];
  var html = "";
  if(ganador== true){
    html+="<h2>Gana Jugador: "+turno +"</h2><button class=\"reset\"  id=\"reset\"><h3>Reset</h3></button>";
  }
  else if(sbotones.length==9){
    html+="<h2>Empate !!!!</h2><button class=\"reset\"  id=\"reset\"><h3>Reset</h3></button>";
  }
  else{
    for(var i=0; i<3;i++){
      html+="<div>"
      for(var j=0; j<3;j++){
        if (tablero[i][j]==0){
          html+="<button class=\"boton\" id=\"boton"+i+j+"\"></button>"
        }
        if (tablero[i][j]==1){
          html+="<button class=\"boton x\" id=\"boton"+i+j+"\"><h1>X</h1></button>"
        }
        if (tablero[i][j]==-1){
          html+="<button class=\"boton o\" id=\"boton"+i+j+"\"><h1>O</h1></button>"
        }
      }
      html+="</div>"
    }
    html+="<div><h2>Turno jugador: "+turno+"</h2></div>"
  }
  return html; 
 }

function getGanador(tablero){
  var suma;
  for(var i=0; i<3;i++){
    suma=0; 
    for(var l=0; l<3;l++){
      suma+=tablero[i][l];
    }
    if(suma==3 || suma== -3){
      state.ganador=true;
      break
    }
  }
  for(var i=0; i<3;i++){
    suma=0; 
    for(var l=0; l<3;l++){
      suma+=tablero[l][i];
    }
    if(suma==3 || suma== -3){
      state.ganador=true;
      break
    }
  }
  suma=0;
  suma=tablero[0][0]+tablero[1][1]+tablero[2][2];
  if(suma==3 || suma== -3){
      state.ganador=true;
  }
  suma=0;
  suma=tablero[0][2]+tablero[1][1]+tablero[2][0];
  if(suma==3 || suma== -3){
      state.ganador=true;
  }
}

function actualizacion(casilla){
  if(sbotones.indexOf(casilla)==-1){
    escribir(casilla);
    getGanador(state.tablero);
    if(state.ganador==false){
      if(state.turno==0){
        state.turno=1; 
      }else{
        state.turno=0; 
      }
    }
    renderAssign(state);
  }
}

function renderAssign(){
  viewport.innerHTML= render(state);
  if(state.ganador==true || sbotones.length==9){
   reset= document.getElementById("reset");
   reset.addEventListener("click",function(){resetear()});
  }
  else{
    for(var i=0; i<3;i++){
      for(var j=0; j<3;j++){
        botones[botones.length]=document.getElementById("boton"+i+j);
      }
    }
    for(let i=0; i<botones.length;i++){
      botones[i].addEventListener("click",function(){actualizacion(i+1)});
    }
  }
}
renderAssign();