var theGame = function(game) {}

theGame.prototype = {
    init: function() {
        var self = this;
        var player;
        facing = 'left';
        jumpTimer = 0;
        var cursors;
        var jumpButton;
        var bg;
        var controller;
    },

    create: function() {

        var self = this;
        var game = self.game;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        bg = game.add.tileSprite(0, 0, 800, 600, 'background');

        game.physics.arcade.gravity.y = 300;

        indicator = game.add.sprite(10, 10, 'controller-indicator');
        indicator.scale.x = indicator.scale.y = 2;
        indicator.animations.frame = 1;

        player = game.add.sprite(32, 320, 'dude');
        game.physics.enable(player, Phaser.Physics.ARCADE);

        player.anchor.setTo(0.5, 0);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1000;
        player.body.maxVelocity.y = 500;
        player.body.setSize(20, 32, 5, 16);

        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('turn', [4], 20, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        game.input.gamepad.start();
        pad1 = game.input.gamepad.pad1;

        leftTriggerButton = pad1.getButton(Phaser.Gamepad.XBOX360_LEFT_TRIGGER);
        rightTriggerButton = pad1.getButton(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);
        jumpButton = pad1.getButton(Phaser.Gamepad.XBOX360_A);

        // leftTriggerButton.onDown.add(self.onLeftTrigger);
        // leftTriggerButton.onUp.add(self.onLeftTrigger);
        // leftTriggerButton.onFloat.add(self.onLeftTrigger);

        // rightTriggerButton.onDown.add(self.onRightTrigger);
        // rightTriggerButton.onUp.add(self.onRightTrigger);
        // rightTriggerButton.onFloat.add(self.onRightTrigger);

    },

    update: function() {
        // game.physics.arcade.collide(player, layer);

        var self = this;
        var game = self.game;

        // Pad "connected or not" indicator
        if (game.input.gamepad.supported && game.input.gamepad.active && pad1.connected) {
            indicator.animations.frame = 0;
        } else {
            indicator.animations.frame = 1;
        }

        player.body.velocity.x = 0;

        if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) ||
            pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
            player.body.velocity.x = -150;

            if (facing != 'left') {
                player.animations.play('left');
                facing = 'left';
            }
        } else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) ||
            pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
            player.body.velocity.x = 150;

            if (facing != 'right') {
                player.animations.play('right');
                facing = 'right';
            }
        } else {
            if (facing != 'idle') {
                player.animations.stop();

                if (facing == 'left') {
                    player.frame = 0;
                } else {
                    player.frame = 5;
                }

                facing = 'idle';
            }
        }

        if (jumpButton.isDown && this.game.time.now > jumpTimer) {
            player.anchor.setTo(0.5, 1);
            //player.body.velocity.y = -500;
            player.body.gravity.y = -1000;
            player.scale.setTo(1, -1);
            jumpTimer = this.game.time.now + 750;
        } else if (!jumpButton.isDown){
            player.anchor.setTo(0.5, 0);
            player.body.gravity.y = 1000;
            player.scale.setTo(1, 1);
        }
    },

    render: function() {
        self = this;
        // game.debug.text(game.time.physicsElapsed, 32, 32);
        // game.debug.body(player);
        self.game.debug.bodyInfo(player, 16, 24);
    },

    onLeftTrigger: function(button, value) {
        console.log("left");
    },

    onRightTrigger: function(buttonCode, value) {
        console.log("right")
    }

}