
var board = new Array(11);
var highlightedBalls = [];
var emptyPositions = [];
var corners = ["2 2","2 3","3 2","3 3","2 7","2 8","3 7","3 8","7 2","7 3","8 2","8 3","7 7","7 8","8 7","8 8"];
var img1 = "<img id=\"";
var img2 = "\" src=\"./public/assets/ball.png\" height=\"80\" width=\"80\">";
var blank1 = "<img id=\"";
var blank2 = "\" src=\"./public/assets/empty.png\" height=\"80\" width=\"80\">";
var ballElements;
var click1 = 0;

const ballFactory = (img) =>{
	return{
		img,
		node:document.createElement("IMG"),
	}
	
}

const wallFactory = (img) =>{
	return{
		img,
		node:document.createElement("IMG"),
	}
	
}

const eventMap = new Map();

function getMapKey(i, j) {
	return `${i},${j}`;
}


function checkCorners(i,j){
	for(let ii=0;ii<corners.length;ii++){
		if((i+" "+j)===corners[ii]) return false;
	}
	return true;
}



function makeBoard(ball1,ball2,wall1,wall2){

	for (let i = 0; i < board.length; i++) {
		board[i] = new Array(11);
	}
	

	for(let i=0;i<11;i++){
		for(let j=0;j<11;j++){
			if((i>1&&i<9&&j>1&&j<9)&&checkCorners(i,j)===true) {
				board[i][j]=ballFactory(ball1+i+j+ball2);

				
				
			}
			else
				board[i][j]=wallFactory(wall1+i+j+wall2);

			
		}


	}

}

function printArray(length,width){
	for(let i=0;i<length;i++){
		for(let j=0;j<width;j++){
			if(board[i][j].img==="<img id=\"00\" src=\"./public/assets/empty.png\" height=\"80\" width=\"80\">") document.write(board[i][j].img+" ");
			else document.write(board[i][j].img+" ");
		}
		document.write("<br>");
	}
}


function consolePrintArray(length,width){
	for(let i=0;i<length;i++){
		for(let j=0;j<width;j++){
			console.log(board[i][j]+" ");
			console.log(i+" "+j);
		}
	}
}

var removeBall = function(i,j) {
	return function curried_func(ii,jj) {
		let ball = document.getElementById(i.toString()+j.toString());
		ball.src="./public/assets/ball_empty.png";
		emptyPositions.push(i+" "+j);
		removeEvents();
	}
}

function addEvents() {
	for (let i = 0; i < 11; i++) {
		for (let j = 0; j < 11; j++) {
			if ((i > 1 && i < 9 && j > 1 && j < 9) && checkCorners(i, j) === true) {
				let ball = document.getElementById(i.toString() + j.toString());
				let removeBallFn = removeBall(i, j);
				let key = getMapKey(i, j);
				eventMap.set(key , removeBallFn);
				ball.addEventListener('click', removeBallFn);
			}
		}
	}
    //
}

function arrayRemove(arr, value) {

	return arr.filter(function(ele){
		return ele != value;
	});

}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}

//var result = arrayRemove(array, 6);

var removeBall2 = function(i,j) {
	return function curried_func(ii,jj) {
		let ball = document.getElementById(i.toString()+j.toString());
		let ballCorners = [document.getElementById((i-2).toString()+j.toString()),document.getElementById((i+2).toString()+j.toString()),document.getElementById(i.toString()+(j-2).toString()),document.getElementById(i.toString()+(j+2).toString())];
		let middleBall;
		if("/public"+ball.src.split("/public")[1]==="/public/assets/ball.png"){	
			ball.src="./public/assets/ball_selected.png";
			if(highlightedBalls.length>0){
				ball = document.getElementById(highlightedBalls[0].charAt(0).toString()+highlightedBalls[0].charAt(2).toString());
				ball.src="./public/assets/ball.png";
				highlightedBalls.pop();			
			}
			highlightedBalls.push(i+" "+j);

		}else if("/public"+ball.src.split("/public")[1]==="/public/assets/ball_empty.png"){
			if("/public"+ballCorners[0].src.split("/public")[1]==="/public/assets/ball_selected.png"||"/public"+ballCorners[1].src.split("/public")[1]==="/public/assets/ball_selected.png"||"/public"+ballCorners[2].src.split("/public")[1]==="/public/assets/ball_selected.png"||"/public"+ballCorners[3].src.split("/public")[1]==="/public/assets/ball_selected.png"){


						//if(highlightedBalls[0].charAt(0).toString()===i) middleBall = i;
						//else 
						
						highlightedBalls[0].charAt(0)===i.toString() ? middleBall = i : (parseInt(highlightedBalls[0].charAt(0))>i ? middleBall = i+1 : middleBall = parseInt(highlightedBalls[0].charAt(0))+1);

						highlightedBalls[0].charAt(2)===j.toString() ? middleBall = middleBall.toString() +j.toString() : (parseInt(highlightedBalls[0].charAt(2))>j ? middleBall = middleBall.toString()+(j+1).toString() : middleBall = middleBall.toString() + (parseInt(highlightedBalls[0].charAt(2))+1).toString());



						ball = document.getElementById(middleBall);


						
						var string_copy = (' '+ball.src).slice(1);
						//PENTRU CODUL BANTUIT CARE NU SE  EXECUTA IN ORDINE SE FORTEAZA ALOCAREA DE  MEMORIE CU SPLICE (also known as string cloning)
						


						if("/public"+ball.src.split("/public")[1]==="/public/assets/ball.png"){
							ball.src="./public/assets/ball_empty.png";
							ball = document.getElementById(highlightedBalls[0].charAt(0).toString()+highlightedBalls[0].charAt(2).toString());
							ball.src="./public/assets/ball_empty.png";
							highlightedBalls.pop();
							ball = document.getElementById(i.toString()+j.toString());
							ball.src="./public/assets/ball.png";
						}
					}
					for (let i = 0; i < 11; i++) {
						for (let j = 0; j < 11; j++) {
							if ((i > 1 && i < 9 && j > 1 && j < 9) && checkCorners(i, j) === true) {
								
							}
						}
					}
				}
			}
		}

		function addEvents2() {
			for (let i = 0; i < 11; i++) {
				for (let j = 0; j < 11; j++) {
					if ((i > 1 && i < 9 && j > 1 && j < 9) && checkCorners(i, j) === true) {
						let ball = document.getElementById(i.toString() + j.toString());
						let removeBallFn = removeBall2(i, j);
						let key = getMapKey(i, j);
						eventMap.set(key , removeBallFn);
						ball.addEventListener('click', removeBallFn);
					}
				}
			}
		}

		function removeEvents() {
			for (let i = 0; i < 11; i++) {
				for (let j = 0; j < 11; j++) {
					if ((i > 1 && i < 9 && j > 1 && j < 9) && checkCorners(i, j) === true) {
						let ball = document.getElementById(i.toString() + j.toString());
						let key = getMapKey(i, j);
						let removeBallFn = eventMap.get(key);
						ball.removeEventListener('click', removeBallFn);
						eventMap.delete(key);
					}
				}
			} 
			addEvents2();
		}

		
		makeBoard(img1,img2,blank1,blank2);
		printArray(11,11);
		addEvents();
