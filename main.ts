controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        `, ship1, 0, -140)
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        `, ship2, 0, -140)
    projectile.startEffect(effects.coolRadial, 100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate)
    info.changeScoreBy(1)
})
scene.onOverlapTile(SpriteKind.Player, img`
. . . . . . . . c . . . . . . . 
. . . . . . . c c c . . . . . . 
. . . . . . . c c c . . . . . . 
. . . . . . c c c c c . . . . . 
. . . . . c 9 9 9 9 9 c . . . . 
. . . . . c c c c c c c . . . . 
. . . . . c 9 9 9 9 9 c . . . . 
. . . . c c c c c c c c c . . . 
. . c c c c 9 9 9 9 9 c c c . . 
c c c c c c c c c c c c c c c c 
. . . 1 8 8 c c c c c 8 8 1 . . 
. . . . 1 8 8 8 8 8 8 8 1 . . . 
. . . . . 1 8 8 8 8 8 1 . . . . 
. . . . . . 1 1 1 1 1 . . . . . 
. . . . . . . 1 1 1 . . . . . . 
. . . . . . . . 1 . . . . . . . 
`, function(sprite: Sprite, location: tiles.Location) {
    sprite.destroy()
    game.over(false)
})
scene.onOverlapTile(SpriteKind.Player, img`
. . . . . . . . 1 . . . . . . . 
. . . . . . . 1 1 1 . . . . . . 
. . . . . . 1 1 1 1 1 . . . . . 
. . . . . 1 8 8 8 8 8 1 . . . . 
. . . . 1 8 8 8 8 8 8 8 1 . . . 
. . . 1 8 8 c c c c c 8 8 1 . . 
c c c c c c c c c c c c c c c c 
. . c c c c 9 9 9 9 9 c c c . . 
. . . . c c c c c c c c c . . . 
. . . . . c 9 9 9 9 9 c . . . . 
. . . . . c c c c c c c . . . . 
. . . . . c 9 9 9 9 9 c . . . . 
. . . . . . c c c c c . . . . . 
. . . . . . . c c c . . . . . . 
. . . . . . . c c c . . . . . . 
. . . . . . . . c . . . . . . . 
`, function (sprite: Sprite, location: tiles.Location) {
    sprite.destroy()
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.disintegrate)
    sprite.startEffect(effects.fire, 200)
    //info.changeLifeBy(-1)
})
game.onGameOver(function(win: Boolean){
    ship1.startEffect(effects.fire)
    ship2.startEffect(effects.fire)
    while(true){
        ship1.x += 2 * endLoop(ship1)
        ship2.x += 2 * endLoop(ship2)
    }
})

let projectile2: Sprite = null
let projectile: Sprite = null
let ship1: Sprite = null
let ship2: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
let asteroids = [sprites.space.spaceSmallAsteroid1, sprites.space.spaceSmallAsteroid0]
ship1 = sprites.create(img`
    . . . . . . . .
    . . . . . . . .
    . . . 9 9 . . .
    . . 1 1 1 1 . .
    . 1 1 1 1 1 1 .
    1 1 1 5 5 1 1 1
    . . . 4 4 . . .
    . . . . . . . .
`, SpriteKind.Player)
ship2 = sprites.create(img`
    . . . . . . . .
    . . . . . . . .
    . . . 2 2 . . .
    . . 1 1 1 1 . .
    . 1 1 1 1 1 1 .
    1 1 1 5 5 1 1 1
    . . . 4 4 . . .
    . . . . . . . .
`, SpriteKind.Player)
ship1.setStayInScreen(true)
ship1.setPosition(screen.width / 4, screen.height / 3)
controller.player1.moveSprite(ship1, 100, 100)
ship2.setStayInScreen(true)
ship2.setPosition(screen.width * 3 / 4, screen.height / 3)
controller.player2.moveSprite(ship2, 100, 100)
info.setLife(6)
let hazzard1 = 1 // x position of tile

game.onUpdate(function () {
    teleport(ship1)
    teleport(ship2)
})

game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(asteroids[randint(0, asteroids.length - 1)], randint(-15, 15), 75)
    //projectile2 = sprites.createProjectileFromSprite(asteroids[randint(0, asteroids.length - 1)], null, 50, 50)
    projectile.setKind(SpriteKind.Enemy)
    //projectile2.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})
game.onUpdateInterval(4000, function () {
    tiles.setTileAt(tiles.getTileLocation(hazzard1,3), img`.`)
    hazzard1 = randint(1, 8)
    tiles.setTileAt(tiles.getTileLocation(hazzard1, 3), img`
. . . . . . . . c . . . . . . . 
. . . . . . . c c c . . . . . . 
. . . . . . . c c c . . . . . . 
. . . . . . c c c c c . . . . . 
. . . . . c 9 9 9 9 9 c . . . . 
. . . . . c c c c c c c . . . . 
. . . . . c 9 9 9 9 9 c . . . . 
. . . . c c c c c c c c c . . . 
. . c c c c 9 9 9 9 9 c c c . . 
c c c c c c c c c c c c c c c c 
. . . 1 8 8 c c c c c 8 8 1 . . 
. . . . 1 8 8 8 8 8 8 8 1 . . . 
. . . . . 1 8 8 8 8 8 1 . . . . 
. . . . . . 1 1 1 1 1 . . . . . 
. . . . . . . 1 1 1 . . . . . . 
. . . . . . . . 1 . . . . . . . 
`)
})
function teleport(ship: Sprite){
    if (ship.x < 10) {
        ship.x = screen.width - 11
    } else if (ship.x > screen.width - 10) {
        ship.x = 11
    }
    if (ship.y < 10) {
        ship.y = screen.height - 11
    } else if (ship.y > screen.height - 10) {
        ship.y = 11
    }
}
function endLoop(ship: Sprite){
    let direction = 1
    if(ship.x < 16){
        direction = 1
    } else if(ship.x > screen.width - 16){
        direction = -1
    }
    return direction
}