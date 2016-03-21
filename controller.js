(function($){

  $.extend({
    playSound: function(){
      return $(
        '<audio autoplay="autoplay" style="display:none;">' + '<source src="' + arguments[0] + '.mp3" />' + '<source src="' + arguments[0] + '.ogg" />' + '<embed src="' + arguments[0] + '.mp3" hidden="true" autostart="true" loop="false" class="playSound" />' + '</audio>').appendTo('body');
    }
  });

})(jQuery);

var controller = {
//////////////////////INIT AND LOOP/////////////////////////////////////////////
  init: function(){
    view.init();
    controller.randomPiece();
    $.playSound('assets/music');
  },

  update: function(){
    setInterval(function(){
      controller.render();
    }, 200);
    setInterval(controller.moveBlock, 50);
    setInterval(function(){$.playSound('assets/music');}, 83000);
  },

  render: function(){
    // controller.moveBlock();
    view.clearCanvas(view.canvas());
    controller.checkStack();
    controller.checkBottom();
    controller.ticBlock();
    controller.displayBlocks();
    controller.removeFullRow();
    view.renderScore(controller.score);
  },

//////////////////////////VARIABLES/////////////////////////////////////////////
  direction: "",
  fullR: 0,
  score: 0,

//////////////////////////GAME LOGIC////////////////////////////////////////////
  moveBlock: function(){
        var mov = block.movingBlock;
    if(controller.canMove()){
      if (controller.direction === "space"){
        mov.rotate();
      }
      else if (controller.direction === "down"){
        controller.fallFast();
      }
      else{
        mov.move();
        }
      controller.direction = "";
    }
  },

  canMove: function(){
    var canMove = true;
        var mov = block.movingBlock;
    $.each(mov.blocks, function(index, blk){
      if((blk.coord.x === 0 && controller.direction==="left") || (controller.blockHere(blk.coord.x - blk.size, blk.coord.y))){
        canMove = false;
      }
      else if ((blk.coord.x === config.width-blk.size && controller.direction==="right") || (controller.blockHere(blk.coord.x + blk.size, blk.coord.y))){
        canMove = false;
      }
    });
    return canMove;
  },

  fallFast: function(){
    $.each(block.movingBlock.blocks, function(index, blk){
      while(!blk.placed){
          controller.render();
      }
    });
    $.playSound('assets/drop');
  },

  blockHere: function(x,y){
    here = false;
    $.each(block.boardBlocks, function(index, blk){
      if(blk.coord.x === x && blk.coord.y === y){
        here = true;
      }
    });
    return here;
  },

  movingToPlaced: function(){
    $.each(block.movingBlock.blocks, function(index, blk){
      blk.placed = true;
      block.boardBlocks.push(blk);
    });
  },

  randomPiece: function(){
    var randPiece = [new block.TShapeConstructor(3,0), new block.LineShapeConstructor(3,0), new block.LLeftShapeConstructor(3,0),new block.LRightShapeConstructor(3,0), new block.ZLeftShapeConstructor(3,0), new block.ZRightShapeConstructor(3,0), new block.SquareShapeConstructor(3,0)];
    block.movingBlock = randPiece[Math.floor(Math.random() * randPiece.length)];
    block.movingBlock.fillBlock();
  },

  moveDownOne: function(){
    $.each(block.boardBlocks, function(index, blk){
      blk.coord.y += blk.size;
    });
  },

  checkFullRow: function(){
    var currentRow = 750 ;
    var blks = block.boardBlocks;
    var same = false;
    while(currentRow >= 0){
      var sameRow = 0;
      for(var i=0; i < blks.length; i++){
        if(blks[i].coord.y === currentRow){
          sameRow++;
          if(blks[i].coord.y - blks[i].size <= 0){
            controller.gameOver();
          }
        }
      }
      if(sameRow >= 20){
        same = true;
        controller.fullR = currentRow;
      }

      currentRow -= 30;
    }
    return same;
  },

  checkBottom: function(){
    $.each(block.movingBlock.blocks, function(index, blk){
      if(blk.coord.y > 750 - blk.size){
        for(var i =0; i < block.movingBlock.blocks.length; i++){
          block.movingBlock.blocks[i].placed = true;
        }
      }
    });
  },

  checkStack: function(){
    $.each(block.movingBlock.blocks, function(index, blk){
      for(var i=0; i < block.boardBlocks.length; i++){
        if(blk.coord.x == block.boardBlocks[i].coord.x && blk.coord.y + blk.size === block.boardBlocks[i].coord.y){
          controller.movingToPlaced();
          controller.randomPiece();
          return false;
        }
      }
    });
  },

//////////////////////////DISPLAY LOGIC/////////////////////////////////////////
  displayBlocks: function(){

    $.each(block.boardBlocks, function(index, block){
      view.renderBlock(block);
    });

    if(block.movingBlock !== undefined){
      $.each(block.movingBlock.blocks, function(index, block){
        view.renderBlock(block);
      });
    }
  },


  removeFullRow: function(){
    var rowArr = block.boardBlocks.slice(0);
    counter = 0;
    if(controller.checkFullRow()){
      for(var i=0; i < block.boardBlocks.length; i++){
        if(block.boardBlocks[i].coord.y === controller.fullR){
          rowArr.splice(i - counter, 1);
          counter++;
        }
      }
      controller.moveDownOne();
      controller.removeFullRow();
      block.boardBlocks = rowArr;
      controller.fullR = undefined;
      controller.score += 10;
      $.playSound('assets/break');
    }
  },



  ticBlock: function() {
    $.each(block.movingBlock.blocks, function(index, blk){
      if (blk.placed === false) {
        blk.coord.y += blk.size;
      }
      else{
        controller.movingToPlaced();
        controller.randomPiece();
        return false;
      }
    });
  },

  gameOver: function(){
    view.renderGameOver();
  }

};

$( document ).ready(function(){

  controller.init();
  controller.update();

});
