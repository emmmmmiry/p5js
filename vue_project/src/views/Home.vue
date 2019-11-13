<template>
  <div class="home"></div>
</template>

<script>
import P5 from "p5";

export default {
  name: "home",
  components: {},
  data() {
    return {
      speed: 2,
      posX: 0
    };
  },
  mounted() {
    console.log("eag");
    const script = function(p5) {
      var speed = 2;
      var posX = 0;
      p5.setup = () => {
        p5.createCanvas(500, 500);
        p5.ellipse(p5.width / 2, p5.height / 2, 500, 500);
      };

      p5.draw = () => {
        p5.background(0);
        const degree = p5.frameCount * 3;
        const y = p5.sin(p5.radians(degree)) * 50;
        p5.push();
        p5.translate(0, p5.height / 2);
        p5.ellipse(posX, y, 50, 50);
        p5.pop();

        posX += speed;
        if (posX > p5.width || posX < 0) {
          speed *= -1;
        }
      };
    };
    new P5(this.script);
  },
  methods: {
    // script(p5) {
    //   p5.setup = () => {
    //     const width = window.innerWidth;
    //     const height = window.innerHeight;
    //     p5.createCanvas(width, height);
    //     p5.ellipse(p5.width / 2, p5.height / 2, width, height);
    //     p5.frameRate(0);
    //   };

    //   p5.draw = () => {
    //     p5.background(0);
    //     // frameCount
    //     const degree = p5.frameCount * 3;
    //     // console.log(p5.frameCount);
    //     const y = p5.sin(p5.radians(degree)) * 50;
    //     p5.push();
    //     p5.translate(0, p5.height / 2);
    //     p5.ellipse(this.posX, y, 50, 50);
    //     p5.pop();

    //     this.posX += this.speed;
    //     if (this.posX > p5.width || this.posX < 0) {
    //       this.speed *= -1;
    //     }
    //   };
    // }
  }
};
</script>
