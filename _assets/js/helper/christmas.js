// Grabbed from https://github.com/HungryTurtleCode/christmasSnow
class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    add(vector) {
        this.x += vector.x
        this.y += vector.y
    }
    static random(minX, maxX, minY, maxY) {
        return new Vector(
            Vector.randomNumBetween(minX, maxX),
            Vector.randomNumBetween(minY, maxY)
            )
    }
    static randomNumBetween(min, max) {
        return min + Math.random() * (max - min)
    }
}

class Snowflake {
    constructor(width, height) {
        this.boundaryX = width
        this.boundaryY = height
        this.pos = Vector.random(0, width, 0, height)
        this.vel = Vector.random(-0.3, 0.3, 0.3, 1)
        this.acc = new Vector(0, 0)
        this.radius = Vector.randomNumBetween(1, 4)
        this.alpha = Vector.randomNumBetween(0.1, 0.9)
    }
    update() {
        this.pos.add(this.vel)
        this.vel.add(this.acc)
        
        // check for wraparound
        if (this.pos.x > this.boundaryX) {
            this.pos.x = 0
        } else if (this.pos.y > this.boundaryY) {
            this.pos.y = 0
        } else if (this.pos.x < 0) {
            this.pos.x = this.boundaryX
        }
    }
}

export class Christmas {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        
        document.body.appendChild(this.canvas)
        
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.setup()
        requestAnimationFrame(() => this.update())
    }
    setup() {
        const NUMFLAKES = 500
        this.snowflakes = []
        
        for (let i = 0; i < NUMFLAKES; i++) {
            this.snowflakes.push(new Snowflake(
            this.canvas.width,
            this.canvas.height,
            ))
        }
    }
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        for (let flake of this.snowflakes) {
            flake.update()
            
            this.ctx.fillStyle = `rgba(94, 205, 239, ${flake.alpha})`
            this.ctx.beginPath()
            this.ctx.arc(
                flake.pos.x,
                flake.pos.y,
                flake.radius,
                0,
                2 * Math.PI
                )
            this.ctx.fill()
        }
        requestAnimationFrame(() => this.update())
    }
}
