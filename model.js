var block = block || {};

block.boardBlocks = [];
block.movingBlock = undefined;
block.people =  ['andrew', 'chris', 'deepa', 'eric', 'john', 'josh', 'kit', 'sam', 'tom'];
block.randPerson = function(){
  return block.people[Math.floor(Math.random() * block.people.length)];
};
////////////////////////////////////////////////////////////////////////////////
block.BlockConstructor = function(x, y, color) {
  this.coord = {
    x: x,
    y: y,
  };
  this.color = color;
  this.blocks = [];
  this.size = config.size;
  this.placed = false;
  this.dir = "";
  this.currentOrient = 0;
  var that = this;
  this.move = function(){
    if (controller.direction === "left"){
      $.each(that.blocks, function(index, blk){
        blk.coord.x -= blk.size;
      });
    }else if(controller.direction === "right"){
      $.each(that.blocks, function(index, blk){
        blk.coord.x += blk.size;
      });
    }
    controller.dir = "";
  };

  this.nextOrientation = function() {
    that.currentOrient = that.currentOrient >= 4 ? 1 : that.currentOrient + 1;
    return that.currentOrient;
  };

  this.rotate = function(dir) {
    var currentBlock;
    var nextOrient = that.nextOrientation();
    for (var i = 0; i < that.blocks.length; i++) {
      currentBlock = that.blocks[i];
        currentBlock.coord.x += that.orient(nextOrient)[i][0] * that.size;
        currentBlock.coord.y += that.orient(nextOrient)[i][1] * that.size;
    }
  };

  this.orient = function(rotate){
      switch(rotate){
        case 1:
        return that.rotate0;

        case 2:
        return that.rotate90;

        case 3:
        return that.rotate180;

        case 4:
        return that.rotate270;
    }
  };

};
////////////////////////////////////////////////////////////////////////////////

block.LLeftShapeConstructor = function(x, y) {
  block.BlockConstructor.call(this, x, y);
  this.pivotIndex = 1;
  this.rotate0 = [[1,1], [0,0], [-1,-1], [-2, 0]];
  this.rotate90 = [[-1,1], [0,0], [1, -1], [0, -2]];
  this.rotate180 = [[-1,-1], [0,0], [1, 1], [2, 0]];
  this.rotate270 = [[1,-1], [0,0], [-1, 1], [0, 2]];
  this.color = "blue";

  this.fillBlock = function() {
    var startingShape = [[0,0],[0,1],[0,2],[1,2]];
    var startPos = [x, y];

    for (var j = 0; j < startingShape.length; j++) {
      startingShape[j][0] += startPos[0];
      startingShape[j][1] += startPos[1];
    }

    for (var i = 0; i < startingShape.length; i++) {
      this.blocks.push(new block.BlockConstructor(startingShape[i][0] * this.size, startingShape[i][1] * this.size, this.color));
    }
  };

};

block.LLeftShapeConstructor.prototype = Object.create(block.BlockConstructor.prototype);
block.LLeftShapeConstructor.prototype.constructor = block.LLeftShapeConstructor;

////////////////////////////////////////////////////////////////////////////////

block.LRightShapeConstructor = function(x,y) {
  block.BlockConstructor.call(this, 0, 0);

  this.pivotIndex = 1;
  this.rotate0 = [[1,1], [0,0], [-1,-1], [0, -2]];
  this.rotate90 = [[-1,1], [0,0], [1, -1], [2, 0]];
  this.rotate180 = [[-1,-1], [0,0], [1, 1], [0, 2]];
  this.rotate270 = [[1,-1], [0,0], [-1, 1], [-2, 0]];
  this.color = "blue";

  this.fillBlock = function() {
    var startingShape = [[0,0],[0,1],[0,2],[-1,2]];
    var startPos = [x, y];

    for (var j = 0; j < startingShape.length; j++) {
      startingShape[j][0] += startPos[0];
      startingShape[j][1] += startPos[1];
    }

    for (var i = 0; i < startingShape.length; i++) {
      this.blocks.push(new block.BlockConstructor(startingShape[i][0] * this.size, startingShape[i][1] * this.size, this.color));
    }
  };
};

block.LRightShapeConstructor.prototype = Object.create(block.BlockConstructor.prototype);
block.LRightShapeConstructor.prototype.constructor = block.LRightShapeConstructor;

////////////////////////////////////////////////////////////////////////////////
block.LineShapeConstructor = function(x,y) {
  block.BlockConstructor.call(this, 0, 0);
  this.pivotIndex = 2;
  this.rotate0 = [[2,2], [1,1], [0,0], [-1, -1]];
  this.rotate90 = [[-2,2], [-1,1], [0,0], [1, -1]];
  this.rotate180 = [[-2,-2], [-1,-1], [0,0], [1, 1]];
  this.rotate270 = [[2,-2], [1,-1], [0,0], [-1, 1]];
  this.color = "green";

  this.fillBlock = function() {
    var startingShape = [[0,0],[0,1],[0,2],[0,3]];
    var startPos = [x, y];

    for (var j = 0; j < startingShape.length; j++) {
      startingShape[j][0] += startPos[0];
      startingShape[j][1] += startPos[1];
    }

    for (var i = 0; i < startingShape.length; i++) {
      this.blocks.push(new block.BlockConstructor(startingShape[i][0] * this.size, startingShape[i][1] * this.size, this.color));
    }
  };
};

block.LineShapeConstructor.prototype = Object.create(block.BlockConstructor.prototype);
block.LineShapeConstructor.prototype.constructor = block.LineShapeConstructor;

////////////////////////////////////////////////////////////////////////////////

block.SquareShapeConstructor = function(x,y) {
  block.BlockConstructor.call(this, 0, 0);
  this.pivotIndex = 2;
  this.rotate0 = [[0,0], [0,0], [0,0], [0,0]];
  this.rotate90 = [[0,0], [0,0], [0,0], [0,0]];
  this.rotate180 = [[0,0], [0,0], [0,0], [0,0]];
  this.rotate270 = [[0,0], [0,0], [0,0], [0,0]];
  this.color = "orange";

  this.fillBlock = function() {
    var startingShape = [[0,0],[0,1],[1,0],[1,1]];
    var startPos = [x, y];

    for (var j = 0; j < startingShape.length; j++) {
      startingShape[j][0] += startPos[0];
      startingShape[j][1] += startPos[1];
    }

    for (var i = 0; i < startingShape.length; i++) {
      this.blocks.push(new block.BlockConstructor(startingShape[i][0] * this.size, startingShape[i][1] * this.size, this.color));
    }
  };
};

block.SquareShapeConstructor.prototype = Object.create(block.BlockConstructor.prototype);
block.SquareShapeConstructor.prototype.constructor = block.SquareShapeConstructor;

////////////////////////////////////////////////////////////////////////////////

block.ZLeftShapeConstructor = function(x,y) {
  block.BlockConstructor.call(this, 0, 0);
  this.pivotIndex = 1;
  this.rotate0 = [[1,1], [0,0], [-1,1], [-2,0]];
  this.rotate90 = [[-1,1], [0,0], [-1,-1], [0,-2]];
  this.rotate180 = [[-1,-1], [0,0], [1,-1], [2,0]];
  this.rotate270 = [[1,-1], [0,0], [1,1], [0,2]];
  this.color = "red";

  this.fillBlock = function() {
    var startingShape = [[0,0],[0,1],[1,1],[1,2]];
    var startPos = [x, y];

    for (var j = 0; j < startingShape.length; j++) {
      startingShape[j][0] += startPos[0];
      startingShape[j][1] += startPos[1];
    }

    for (var i = 0; i < startingShape.length; i++) {
      this.blocks.push(new block.BlockConstructor(startingShape[i][0] * this.size, startingShape[i][1] * this.size, this.color));
    }
  };
};

block.ZLeftShapeConstructor.prototype = Object.create(block.BlockConstructor.prototype);
block.ZLeftShapeConstructor.prototype.constructor = block.ZLeftShapeConstructor;

////////////////////////////////////////////////////////////////////////////////

block.ZRightShapeConstructor = function(x,y) {
  block.BlockConstructor.call(this, 0, 0);
  this.pivotIndex = 1;
  this.rotate0 = [[1,1], [0,0], [1,-1], [0,-2]];
  this.rotate90 = [[-1,1], [0,0], [1,1], [2,0]];
  this.rotate180 = [[-1,-1], [0,0], [-1,1], [0,2]];
  this.rotate270 = [[1,-1], [0,0], [-1,-1], [-2,0]];
  this.color = "red";

  this.fillBlock = function() {
    var startingShape = [[1,0],[1,1],[0,1],[0,2]];
    var startPos = [x, y];

    for (var j = 0; j < startingShape.length; j++) {
      startingShape[j][0] += startPos[0];
      startingShape[j][1] += startPos[1];
    }

    for (var i = 0; i < startingShape.length; i++) {
      this.blocks.push(new block.BlockConstructor(startingShape[i][0] * this.size, startingShape[i][1] * this.size, this.color));
    }
  };
};

block.ZRightShapeConstructor.prototype = Object.create(block.BlockConstructor.prototype);
block.ZRightShapeConstructor.prototype.constructor = block.ZRightShapeConstructor;

////////////////////////////////////////////////////////////////////////////////
block.TShapeConstructor = function(x,y) {
  block.BlockConstructor.call(this, 0, 0);
  this.pivotIndex = 2;
  this.rotate0 = [[1,1], [1,-1], [0,0], [-1,1]];
  this.rotate90 = [[-1,1], [1,1], [0,0], [-1,-1]];
  this.rotate180 = [[-1,-1], [-1,1], [0,0], [1,-1]];
  this.rotate270 = [[1,-1], [-1,-1], [0,0], [1,1]];
  this.color = "yellow";

  this.fillBlock = function() {
    var startingShape = [[1,0],[0,1],[1,1],[2,1]];
    var startPos = [x, y];

    for (var j = 0; j < startingShape.length; j++) {
      startingShape[j][0] += startPos[0];
      startingShape[j][1] += startPos[1];
    }

    for (var i = 0; i < startingShape.length; i++) {
      this.blocks.push(new block.BlockConstructor(startingShape[i][0] * this.size, startingShape[i][1] * this.size, this.color));
    }
  };
};

block.TShapeConstructor.prototype = Object.create(block.BlockConstructor.prototype);
block.TShapeConstructor.prototype.constructor = block.TShapeConstructor;

////////////////////////////////////////////////////////////////////////////////
var board = {

};

var config = {
  size: 30,
  height: 800,
  width: 600,
};
