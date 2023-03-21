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
        `, ship, 0, -140)
    projectile.startEffect(effects.coolRadial, 100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate)
    info.changeScoreBy(1)
})
// info.changeLifeBy(-1)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.disintegrate)
    sprite.startEffect(effects.fire, 200)
})
let projectile: Sprite = null
let ship: Sprite = null
let asteroids = [sprites.space.spaceSmallAsteroid1, sprites.space.spaceSmallAsteroid0]
ship = sprites.create(img`
    . . 1 . . 
    . 1 1 1 . 
    1 1 1 1 1 
    . . 4 . . 
    . . . . . 
    `, SpriteKind.Player)
ship.setStayInScreen(true)
ship.bottom = 12
controller.moveSprite(ship, 100, 100)
info.setLife(3)
effects.starField.startScreenEffect()
game.onUpdate(function () {
    if (ship.x < 10) {
        ship.x = screen.width - 11
    } else if (ship.x > screen.width - 10) {
        ship.x = 11
    }
    if (ship.y < 10) {
        ship.y = screen.height - ship.height
    } else if (ship.y > screen.height - 10) {
        ship.y = 11
    }
})
game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(asteroids[randint(0, asteroids.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})
