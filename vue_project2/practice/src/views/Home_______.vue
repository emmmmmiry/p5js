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
      img: "",
      colors: [],
      sortMode: null,
      width: 0,
      height: 0,
      p5: null
    };
  },
  mounted() {
    const max = 300;
    const min = 100;
    this.width = Math.floor(Math.random() * (max + 1 - min)) + min;
    this.height = Math.floor(Math.random() * (max + 1 - min)) + min;
    this.p5 = new P5();
    // this.p5.createCanvas(width, height);

    // this.p5(this.draw);
    window.onclick = () => {
      console.log("scroll");
      // canvasができるのnew P5してるからか
      // new P5(this.draw);
      this.draw();
    };
  },
  methods: {
    init() {
      const setImage = loadImageFile => {
        this.img = loadImageFile;
      };

      this.p5.preload = () => {
        this.p5.loadImage(require("@/assets/pic1.jpg"), setImage);
      };

      this.p5.setup = () => {
        const max = 300;
        const min = 100;
        this.width = Math.floor(Math.random() * (max + 1 - min)) + min;
        this.height = Math.floor(Math.random() * (max + 1 - min)) + min;
        this.p5.createCanvas(width, height);
      };
    },
    draw() {
      this.init();

      this.p5.draw = () => {
        // max() 2つの入力のうち大きい値を選ぶ
        const tileCount = this.p5.floor(
          this.p5.width / this.p5.max(this.p5.mouseX / 5, 5)
        );

        const rectSize = this.p5.width / tileCount; // 5

        this.img.loadPixels();
        this.colors = [];

        for (let gridY = 0; gridY < tileCount; gridY++) {
          for (let gridX = 0; gridX < tileCount; gridX++) {
            // int() 小数点切り捨て
            let px = this.p5.int(gridX * rectSize);
            let py = this.p5.int(gridY * rectSize);
            let i = (py * this.img.width + px) * 4;

            let c = this.p5.color(
              this.img.pixels[i], // r
              this.img.pixels[i + 1], // g
              this.img.pixels[i + 2], // b
              this.img.pixels[i + 3] // a
            );
            this.colors.push(c);
          }
        }

        const sortMode = gd.HUE.sortMode;
        gd.sortColors(this.colors, sortMode);

        let i = 0;
        for (let gridY = 0; gridY < tileCount; gridY++) {
          for (let gridX = 0; gridX < tileCount; gridX++) {
            this.p5.pushMatrix();
            this.p5.translate(this.width / 2, this.height / 2);
            this.p5.fill(this.colors[i]);
            this.p5.rect(
              gridX * rectSize,
              gridY * rectSize,
              rectSize,
              rectSize
            );
            this.p5.strokeWeight(0);
            this.p5.popMatrix();
            i++;
            // https://p5codeschool.net/tutorial/chapter10/
            // 座標がリセットされない
          }
        }
      };
    }
  }
};
</script>
