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
      speed2: 2,
      posX: 0,
      posX2: 1,
      flag: true
    };
  },
  mounted() {
    new P5(this.script);
    window.onclick = () => {
      console.log("click");
      this.flag = !this.flag;
      console.log(this.flag);
    };
  },
  methods: {
    script(p5) {
      p5.setup = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        p5.createCanvas(width, height);
        // p5.colorMode("HSB");
        p5.fill(255, 204, 100);
        //ellipse(x, y, w, [h])
        // ずけいのまんなかが基点
        // p5.ellipse(width / 2, height / 2, width, height);
      };

      // p5.draw = () => {
      //   p5.background(0);
      //   // frameCount;// まいびょうかわる
      //   const degree = p5.frameCount * 3;
      //   // 秒
      //   // console.log(p5.frameCount);
      //   const y = p5.sin(p5.radians(degree)) * 50;

      //   // p5.push();//いらない？

      //   // trondform-originてきな(うごくときの軸の位置)
      //   p5.translate(0, p5.height / 2);
      //   // p5.ellipse(0, y, 50, 50);

      //   p5.ellipse(this.posX, y, 50, 50);
      //   // p5.pop();
      //   this.posX += this.speed;
      //   if (this.posX > p5.width || this.posX < 0) {
      //     this.speed *= -1;
      //   }
      // };

      p5.draw = () => {
        // for (let i = 0; i < 3; i++) {
        //   // p5.background(0);
        //   // frameCount;// まいびょうかわる
        //   const degree = p5.frameCount * 3;
        //   // 秒
        //   // console.log(p5.frameCount);
        //   const y = p5.sin(p5.radians(degree)) * 50;

        //   p5.push();
        //   p5.translate(50, p5.height / 4);
        //   p5.fill(255, 50, 50);
        //   p5.ellipse(this.posX, y, 50, 50);
        //   p5.pop();

        //   p5.push();
        //   p5.translate(100, p5.height / 2);
        //   p5.fill(255, 255, 0);
        //   p5.ellipse(this.posX, y, 50, 50);
        //   p5.pop();

        //   p5.push();
        //   p5.translate(0, p5.height / 3);
        //   p5.fill(255, 204, 100);
        //   p5.ellipse(this.posX2, y, 50, 50);
        //   p5.pop();

        //   this.posX += this.speed;
        //   this.posX2 += this.speed2;
        //   if (
        //     (this.posX > p5.width && this.posX2 > p5.width) ||
        //     (this.posX < 0 && this.posX2 < 0)
        //   ) {
        //     this.speed *= -1;
        //     this.speed2 *= -1.3;
        //   }
        // }

        // p5.background(0);
        // frameCount;// まいびょうかわる
        const degree = p5.frameCount * 3;
        // 秒
        // console.log(p5.frameCount);
        const y = p5.sin(p5.radians(degree)) * 50;

        if (this.flag) {
          p5.push();
          p5.translate(50, p5.height / 4);
          p5.fill(255, 50, 50);
          p5.ellipse(this.posX, y, 50, 50);
          p5.pop();

          p5.push();
          p5.translate(100, p5.height / 2);
          p5.fill(255, 255, 0);
          p5.ellipse(this.posX, y, 50, 50);
          p5.pop();

          p5.push();
          p5.translate(0, p5.height / 3);
          p5.fill(255, 204, 100);
          p5.ellipse(p5.mouseX, p5.mouseY - 200, 50, 50);
          p5.pop();

          this.posX += this.speed;
          this.posX2 += this.speed2;
        } else {
          this.posX += 0;
          this.posX2 += 0;
        }

        if (
          (this.posX > p5.width && this.posX2 > p5.width) ||
          (this.posX < 0 && this.posX2 < 0)
        ) {
          this.speed *= -1;
          this.speed2 *= -1.3;
        }
      };
    }
  }
};
</script>
