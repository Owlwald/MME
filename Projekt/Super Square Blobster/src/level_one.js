var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
    preload: preload,
    create: create,
    update: update
});
var platforms,
    player,
    cursors,
    gravity = 400,
    bounce = 0,
    zahnrad,
    zahnrad2,
    fall,
    death,
    score = 0,
    scoreText,
    collectibles,
    marginScore = 32;
/*
 * function that is called before the game starts.
 * loads all the images we need from the assets folder
 */

function preload() {
    game.load.image('sky', '../assets/sky.png');
    game.load.image('ground', '../assets/platform.png');
    game.load.spritesheet('character', '../assets/blopsterv1.png', 64, 64);
    game.load.image('star', '../assets/collectible.png');
    game.load.image('death', '../assets/zahnrad.png');
    game.load.image('fall', '../assets/rect.png');
}


function create() {

    /*
     *  create the world and set the bounds of the level
     */
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 3200, 600);

    /*
     *  add the background  
     */
    
    game.background = game.add.sprite(0, 0, 'sky');
    game.background.fixedToCamera = true;

    /*
     *  create the groups for the platforms and the obstacles
     */
    
    death = game.add.group();
    death.enableBody = true;
    platforms = game.add.group();
    platforms.enableBody = true;

    /*
     *  create the platforms
     */
    
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(1, 2);
    ground.body.immovable = true;


    var ground2 = platforms.create(2000, game.world.height - 64, 'ground');
    ground2.scale.setTo(1, 1);
    ground2.body.immovable = true;

    var ledge = platforms.create(250, 450, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(0.8, 1);

    ledge = platforms.create(550, 340, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(0.5, 1);

    ledge = platforms.create(800, 450, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(1400, 340, 'ground');
    ledge.body.immovable = true;


    /*
     *  creating the player
     */
    
    player = game.add.sprite(32, game.world.height - 150, 'character');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.setSize(64, 64, 0, 0);
    player.body.bounce.y = bounce;
    player.body.gravity.y = gravity;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 11, true);
    player.animations.add('right', [5, 6, 7, 8], 11, true);
    game.camera.follow(player);


    /*
     *  Group for the collectibles 
     */
    
    collectibles = game.add.group();
    collectibles.enableBody = true;

    
    /*
     *  creating the collectibles
     */
    
    for (var i = 0; i < 5; i++) {
        var collectible = collectibles.create(340 + i * 38, 410, 'star');
        collectible.scale.setTo(0.66, 0.66)
    }
    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < 3; i++) {
            var collectible = collectibles.create(620 + j * 38, 220 + i * 38, 'star');

            collectible.scale.setTo(0.66, 0.66)

        }
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 3; i++) {
            var collectible = collectibles.create(1400 + j * 38, 220 + i * 38, 'star');
            collectible.scale.setTo(0.66, 0.66)
        }
    }


    /*
     *  Text for the highscore
     */
    
    scoreText = game.add.text(marginScore, marginScore, '000000', {
        fontSize: '16px',
        fill: '#FFF',
        stroke: '#000',
        strokeThickness: 8
    });


    /*
     *  platform for falling off the edge
     *  and obstacles
     */
    
    fall = death.create(500, 580, 'fall');
    fall.scale.setTo(20, 1);
    fall.body.immovable = true;
    
    zahnrad = death.create(1000, 370, 'death');
    zahnrad.body.immovable = true;

    zahnrad2 = death.create(760, 370, 'death');
    zahnrad2.body.immovable = true;
}


/*
 *  update function that is called on every frame
 */

function update() {
    
    /*
     * Check for collisions
     */

    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, zahnrad, collision);
    game.physics.arcade.collide(player, fall, collision);
    game.physics.arcade.collide(player, zahnrad2, collision);

    /*
     *  Update the position of the score, so its always seen by the player
     */

    scoreText.x = game.camera.x + marginScore;

    /*
    for(var i=0;i<collectibles.children.length;i++){
        collectibles.getChildAt(i).rotation+=0.05;
    }*/

    
    /*
     *  Movement of the player
     */

    cursors = game.input.keyboard.createCursorKeys();
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        player.animations.stop();
        player.frame = 4;
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }

    /*
     *  Collection of the collectibles
     */

    game.physics.arcade.overlap(player, collectibles, collectCoin, null, this);

}


/*
 *  function that is called when the player touches an enemy or an obstacle
 */

function collision(obj1, obj2) {
    game.state.start(game.state.current);
}

/*
 *  function that is called when the player collects a collectible
 */

function collectCoin(player, coin) {
    coin.kill();
    score += 10;
    scoreText.text = pad(score, 6)
}

/*
 *  function to help the calculation of the score
 */ 

function pad(num, size) {
    var s = "000000" + num;
    return s.substr(s.length - size);
}