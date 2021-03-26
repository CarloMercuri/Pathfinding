// Frontend 

const maxRows = 30;
const maxColumns = 70;

const tableDiv = document.getElementById('table-div');
var mainTable = document.getElementById('main-table');

var isMouseDown = false;


// Backend

const startCellX = 10;
const startCellY = 13;

const targetCellX = 50;
const targetCellY = 13;

function Node(x, y, visited, type) {
    this.xPos = x;
    this.yPos = y;
    this.visited = visited;
    this.type = type; // UNKNOWN, START, VALID, GOAL, INVALID (obstacle or w/e)
    this.path = [];
}

// Create the nodes array
var nodeArray = [];

for(var i = 0; i < maxColumns; i++) {
    nodeArray[i] = [];
    for(var j = 0; j < maxRows; j++){
        if(targetCellX === i && targetCellY === j) {
            nodeArray[i][j] = new Node(i, j, false, 'GOAL');
        } else if (startCellX === i && startCellY === j) {
            nodeArray[i][j] = new Node(i, j, false, 'START');
        } else {
            nodeArray[i][j] = new Node(i, j, false, 'VALID');
        }
        
    }
}


// CODE

tableCreate();

document.body.addEventListener('mousedown', () => {
    isMouseDown = true;
})

document.body.addEventListener('mouseup', () => {
    isMouseDown = false;
})

function setVisited(node){
    mainTable.rows[node.yPos].cells[node.xPos].classList.add('visited-cell');
    node.visited = true;
}

// DJIKSTRA

//Djikstra();

const locaon = {
    x: targetCellX,
    y: targetCellY,
    type: 'UNKNOWN'
}

console.log(checkLocation(locaon, nodeArray));

function Djikstra(){

    const startNode = mainTable.rows[startCellX].cells[startCellY];
    findPath(startNode, nodeArray);
}

function findPath(startNode, grid) {
     
    var queue = [startNode];

    while(queue.length > 0) {
        // Take the first element off the queue
        var c = queue.shift();

        // Scan in all 4 directions
        var location = explore(c, 'Up', grid);
        if(location.type === 'GOAL') {
            return location.path;
        } else if (location.type === 'VALID') {
            queue.push(location);
            setVisited(grid[location.xPos][location.yPos]);
        }

        var location = explore(c, 'Down', grid);
        if(location.type === 'GOAL') {
            return location.path;
        } else if (location.type === 'VALID') {
            queue.push(location);
            setVisited(grid[location.xPos][location.yPos]);
        }

        var location = explore(c, 'Left', grid);
        if(location.type === 'GOAL') {
            return location.path;
        } else if (location.type === 'VALID') {
            queue.push(location);
            setVisited(grid[location.xPos][location.yPos]);
        }

        var location = explore(c, 'Right', grid);
        if(location.type === 'GOAL') {
            return location.path;
        } else if (location.type === 'VALID') {
            queue.push(location);
            setVisited(grid[location.xPos][location.yPos]);
        }
    }

    // There is no valid path
    return false;

}

function explore(node, direction, grid) {

    var newX = node.xPos;
    var newY = node.yPos;

    if(direction === 'Up') {
        newY += 1;
    } else if (direction === 'Down') {
        newY -= 1;
    } else if (direction === 'Left') {
        newX -= 1;
    } else if (direction === 'Right') {
        newX += 1;
    }

    var location = {
        x: newX,
        y: newY,
        type: 'UNKNOWN'
    }

    location.type = checkLocation(location, grid);
    
    return location;
}

function checkLocation(loc, grid){

    if(loc.x < 0 ||
        loc.x >= grid.length ||
        loc.y < 0 ||
        loc.y >= grid[0].length) {
            return 'INVALID';
        } else if (grid[loc.x][loc.y].type === 'GOAL') {
            return 'GOAL';
        } else if (grid[loc.x][loc.y].type === 'OBSTACLE') {
            return 'OBSTACLE';
        } else {
            return 'VALID';
        }
}



function tableCreate(){
    for(var i = 0; i < maxRows; i++){

        var tr = mainTable.insertRow();

        for(var j = 0; j < maxColumns; j++){
            var td = tr.insertCell();
            td.xPos = j;
            td.yPos = i;
            td.visited = false;

            td.onclick = function () {
                tableCellClick(this);
            };

            

            td.addEventListener('mousemove', function () {
                tableCellMouseMove(this);
            })

            td.addEventListener('mouseclick', function () {
                tableCellClick(this);
            })

            td.classList.add('empty-cell');
            //td.onclick
            //td.addEventListener("click", tableCellClick(this), false);
            
            
        }
    }



    mainTable.rows[startCellY].cells[startCellX].classList.add('start-cell');


    mainTable.rows[targetCellY].cells[targetCellX].classList.add('target-cell');

    //addTableCellsOnClickEvents();
}



function addTableCellsOnClickEvents(){
    /*
    mainTable.rows[0].cells[0].onclick = function (){
        console.log("mmm");
    }
    */
    for(var r = 0; r < maxRows; r++){
        for(var c = 0; c < maxColumns; c++){
            mainTable.rows[r].cells[c].onclick = () => {
                tableCellClick(this);
            }
        }
    }
}



function tableCellMouseMove(cell){

    if(isMouseDown){
        mainTable.rows[cell.yPos].cells[cell.xPos].classList.add('obstacle-cell');
    }


    //document.getElementById('main-table').rows[c].cells[r].classList.add('obstacle-cell');
}


function tableCellClick(cell){
    mainTable.rows[cell.yPos].cells[cell.xPos].classList.add('obstacle-cell');
    //console.log(nodeArray[cell.yPos][cell.xPos].type);
    
    console.log(getNode(cell.xPos, cell.yPos).type);
}

function getNode(x, y){
    return nodeArray[x][y];
}

function getTableCell(x, y){
    return mainTable.rows[y].cells[x];
}

