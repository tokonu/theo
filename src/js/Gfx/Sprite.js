class Sprite {

    constructor(draw) {
        this.draw = draw;
    }

    render(callback) {
        const draw = this.draw;
        draw.begin();
        for (let y=1; y>-2; y--) {
            for (let x=-1; x<2; x++) {
                draw.begin().to(x*24+24, y*24+24);
                this.hero(x, y);
                draw.end();
                draw.begin().to(x*24+120, y*24+24);
                this.evil(x, y);
                draw.end();
            }
        }

        draw.begin().to(72, 0);
        this.hero(0, 0, true);
        draw.end();

        draw.to(0, 72);
        for (let a=0; a<3; a++) {
            draw.begin().to(a * 32, 0);
            this.cog(a * 10);
            draw.end();
        }

        draw.to(0, 32);
        this.door();

        draw.end().merge(true, callback);
    }

    door() {
        let blue = "#669",
            dark = "#003",
            rock = draw.grad("#ccc", "#999", 24),
            sky = draw.glin("#09c", "#0cf", 0, 0, 0, 24);
        this.draw
            .begin()
            .rect(24, 32, 0)
            .to(1, 1)
            .rect(22, 30, "#630")
            .to(14, 14)
            .rect(5, 2, 0)
            .end()

            .begin()
            .to(24, 0)
            .rect(24, 32, 0)
            .to(12, 19)
            .rect(11, 12, 2)
            .to(-6, 6)
            .rect(17, 6, 3)
            .end()

            .begin()
            .to(60, 8)
            .begin()
            .to(-7, 16)
            .rect(6, 8, dark)
            .to(1, 1)
            .rect(4, 6, blue)
            .end()
            .begin()
            .to(-3, 0)
            .rect(6, 24, dark)
            .to(1, 1)
            .rect(4, 22, blue)
            .end()
            .ellipse(10.5, 7)
            .fill(blue)
            .stroke(dark)
            .ellipse(5, 3)
            .composite("destination-out")
            .fill(1)
            .composite()
            .stroke(dark)
            .end()

            .begin()
            .to(72, 0)
            .rect(32, 24, sky)
            .to(1, 1)
            .rect(10, 22)
            .stroke(0, 2)
            .to(10, 0)
            .rect(10, 22)
            .stroke(0, 2)
            .to(10, 0)
            .rect(10, 22)
            .stroke(0, 2)
            .end()

            .begin()
            .to(105, 1)
            .rect(14, 11)
            .fill(rock)
            .stroke(0, 2)
            .to(14, 0)
            .rect(14, 11)
            .fill(rock)
            .stroke(0, 2)
            .to(-7, 11)
            .rect(14, 11)
            .fill(rock)
            .stroke(0, 2)
            .end();
    }

    cog(a) {
        let draw = this.draw,
            color = draw.grad("#ccc", "#666", 16);
        draw.begin()
            .to(16, 16)
            .rotate(a)
            .ngon(15, 15.3, 12)
            .fill(color)
            .stroke()
            .ellipse(3)
            .fill(0)
            .end();
    }

    head(x, y, color) {
        this.draw
            .to(12, 12)
            .begin()
            .ellipse(11.3)
            .fill(color)
            .stroke()
            .to(-3-x, 5+y)
            .rect(6, 1, 0)
            .end();
    }

    hero(x, y, dead) {
        let draw = this.draw,
            color = draw.grad("#fc0", "#960", 12, -4, -4);
        this.head(x, y, color);
        if (dead) {
            draw.to(-4, -2)
                .rect(8, 2, 0);
        } else {
            draw.to(x, y-3)
                .ellipse(5)
                .fill(1)
                .to(x, y)
                .ellipse(2)
                .fill(0);
        }
    }

    evil(x, y) {
        let draw = this.draw,
            color = draw.grad("#0c0", "#060", 12, -4, -4);
        this.head(x, y, color);
        draw.begin()
            .to(-3-x, 6+y)
            .ngon(3, 2.5)
            .fill(0)
            .end()
            
            .begin()
            .to(3-x, 6+y)
            .ngon(3, 2.5)
            .fill(0)
            .end()

            .begin()
            .to(x-4, y-3)
            .ellipse(4)
            .fill(1)
            .to(x, y)
            .ellipse(1.5)
            .fill(0)
            .end()

            .begin()
            .to(x+4, y-3)
            .ellipse(4)
            .fill(1)
            .to(x, y)
            .ellipse(1.5)
            .fill(0)
            .end();
    }
}
