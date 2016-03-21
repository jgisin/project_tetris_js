var view = {

  init: function(){
    view.listeners.keypressListener();
    view.listeners.keyUpListener();
  },

  renderBlock: function(block){
    var c = view.canvas();
    // var imageObj = new Image();
    // imageObj.src = 'assets/' + block.color + '.png';
    // var image = c.createPattern(imageObj, "repeat");
    c.beginPath();
    c.fillStyle = block.color;
    c.fillRect(block.coord.x, block.coord.y, block.size, block.size);
  },

  canvas: function(){
    return $('#canvas')[0].getContext('2d');
  },

  renderScore: function(score){
    $('#score').text(score);
  },

  renderGameOver: function(){
    $('body').text("Game Over, Please Refresh to play again");
  },

  clearCanvas: function(context){
    context.clearRect(0,0,600,800);
  },

  listeners: {
    keypressListener: function(){
      $( document ).keydown(function(e) {
        switch(e.which) {

          case 32: // space
          controller.direction = "space";
          break;

          case 37: // left
          controller.direction = "left";
          break;

          case 39: // right
          controller.direction = "right";
          break;

          case 40: // down
          controller.direction = "down";
          break;
        }
        e.preventDefault();
      });
    },//end keypressListener

    keyUpListener: function(){
      $( document ).keyup(function(e) {
        switch(e.which){
          case 32: // space
          controller.direction = "";
          break;

          case 37: // left
          controller.direction = "";
          break;

          case 39: // right
          controller.direction = "";
          break;

          case 40: // down
          controller.direction = "";
          break;
        }
      e.preventDefault();
      });
    }//end keyUpListener
  }

};
