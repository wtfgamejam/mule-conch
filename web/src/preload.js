var preload = function(game) {}

preload.prototype = {
    preload: function() {

        // balls
        this.game.load.spritesheet('dude', 'assets/sprite/dude.png', 32, 48);
        this.game.load.spritesheet('controller-indicator', 'assets/sprite/controller-indicator.png', 16,16);

        // table
        this.game.load.image('background', 'assets/background/jungle.jpg');


        this.game.stage.backgroundColor = '#124184';
    },
    create: function() {
        this.game.state.start("TheGame");
    }
}