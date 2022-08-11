let size= prompt('type the preferred grid size', '64');
let grid= document.getElementById("grid-container");
window.onload= () => makeGrid(size);

let rainbowBtn= document.getElementById("rainbow-mode");
let chooseColorBtn= document.getElementById("choose-color-mode");
let eraserBtn= document.getElementById('eraser');
let clearBtn= document.getElementById('clear');
let colorPicker= document.getElementById('color-picker');
let customInput= document.getElementById('custom-input');
let penSvg= document.getElementById("svg-pen");
let gridSwitch= document.querySelector('input[type="checkbox"]');

let smallGrid = document.getElementById('small');
let medieumGrid = document.getElementById('medieum');
let bigGrid = document.getElementById('big');


let DEFAULT_COLOR= "#1d1d1d";
let color= DEFAULT_COLOR;
let currentMode= 'color';
penSvg.style.fill= DEFAULT_COLOR;

rainbowBtn.onclick= ()=> setMode('rainbow');
chooseColorBtn.onclick= ()=> setMode('color');
eraserBtn.onclick= () => setMode('eraser');
clearBtn.onclick= () => reloadGrid(size);
colorPicker.oninput= (e)=> colorUpdate(e.target.value);
customInput.oninput= (e)=> reloadGrid(e.target.value);
customInput.onmouseup= (e) => e.stopPropagation();
gridSwitch.onchange= () => gridOn();

smallGrid.onclick= ()=> sizeUpdate('16');
medieumGrid.onclick= ()=> sizeUpdate('32');
bigGrid.onclick= ()=> sizeUpdate('64');


function setMode(mode){
  currentMode= mode;
}

function colorUpdate(newColor){
   color= newColor;
   currentMode= 'color';
   penSvg.style.fill= newColor;
}

function sizeUpdate(newSize){
  size= newSize;
  reloadGrid(newSize);
  gridOn();
}

function reloadGrid(newSize){
  clearGrid();
  makeGrid(newSize);
}

function clearGrid(){
  grid.innerHTML= '';
}


function makeGrid(size){
  size= Number(size);
  grid.style.gridTemplateColumns= `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows= `repeat(${size}, 1fr)`;

  for(let i=0; i<size*size; i++){
    let gridElement= document.createElement('div');
    gridElement.addEventListener("mouseover", changeColor);
    gridElement.addEventListener("mousedown", changeColor);
    grid.appendChild(gridElement);
  }
}

  function gridOn(){
    let gridElement= document.getElementById('grid-container').querySelectorAll('div');
    if(gridSwitch.checked){
      gridElement.forEach(element => {
        element.classList.add('gridOn');
      });
    }
    else{
      gridElement.forEach(element => {
        element.classList.remove('gridOn');
      });
    }
  }

let disableSelect= (e) => {return false};
document.onselectstart= disableSelect;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeColor(e){
  if(e.type === 'mouseover' && !mouseDown)return;
  if(currentMode === 'color'){
  e.target.style.backgroundColor= color;
  document.body.classList.remove('rainbow-cursor');
  document.body.classList.remove('eraser-cursor');
  document.body.classList.add('color-cursor');
  }
  else if(currentMode === 'rainbow'){
    let r= Math.floor(Math.random()*256);
    let g= Math.floor(Math.random()*256);
    let b= Math.floor(Math.random()*256);
    e.target.style.backgroundColor= `rgb(${r}, ${g}, ${b})`;
    document.body.classList.remove('color-cursor');
    document.body.classList.remove('eraser-cursor');
    document.body.classList.add('rainbow-cursor');
  }
  else if(currentMode === 'eraser'){
    e.target.style.backgroundColor= "";
    document.body.classList.remove('rainbow-cursor');
    document.body.classList.remove('color-cursor');
    document.body.classList.add('eraser-cursor');
  }
}


