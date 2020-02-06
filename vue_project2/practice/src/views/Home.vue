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
      x: 0,
      y: 0,
      imgs: [
        require("@/assets/pic1.jpg"),
        require("@/assets/pic2.jpg"),
        require("@/assets/pic3.jpg"),
        require("@/assets/pic4.jpg"),
        require("@/assets/pic5.jpg")
      ]
    };
  },
  mounted() {
    // 毎フレームやってるのを間引く
    // 重いのはfor文を減らすなどコードを最適化するしかない

    window.onclick = e => {
      const p5 = new P5(this.draw);
      this.x = e.pageX - 50;
      this.y = e.pageY - 50;
    };
  },
  methods: {
    draw(p5) {
      const setImage = loadImageFile => {
        this.img = loadImageFile;
      };

      p5.preload = () => {
        const i = Math.floor(Math.random() * (5 - 0)) + 0;
        const img = this.imgs[i];
        p5.loadImage(img, setImage);
      };

      p5.setup = () => {
        const max = 300;
        const min = 100;
        const width = Math.floor(Math.random() * (max + 1 - min)) + min;
        const height = Math.floor(Math.random() * (max + 1 - min)) + min;

        const cnv = p5.createCanvas(width, height);
        cnv.canvas.width = width;
        cnv.canvas.height = height;
        console.log(cnv.canvas.width, "width");
        // const x = Math.floor(Math.random() * window.innerWidth + 0);
        // const y = Math.floor(Math.random() * window.innerHeight + 0);
        console.log(p5, this.x, this.y, width, height);
        cnv.position(this.x, this.y);
      };
      // new P5(this.script);
      p5.draw = () => {
        // max() 2つの入力のうち大きい値を選ぶ
        const tileCount = p5.floor(p5.width / p5.max(p5.mouseX / 5, 2));

        const rectSize = p5.width / tileCount; // 5

        this.img.loadPixels();
        this.colors = [];

        // 事前に計算したグリッド間隔のrectSizeを使って、1行づつ画像を読み取っている
        // ピクセルは配列pixels[]に格納
        // px, pyをもとに対応するインデックス番号iを計算する必要がある
        for (let gridY = 0; gridY < tileCount; gridY++) {
          for (let gridX = 0; gridX < tileCount; gridX++) {
            // int() 小数点切り捨て
            let px = p5.int(gridX * rectSize);
            let py = p5.int(gridY * rectSize);
            let i = (py * this.img.width + px) * 4; //この*4はなんだ

            // xがでかいとiがthis.img.pixels.lengthよりも大きくなって
            // this.img.pixels[i]がundifinedになる
            let c = p5.color(
              this.img.pixels[i], // r
              this.img.pixels[i + 1], // g
              this.img.pixels[i + 2], // b
              this.img.pixels[i + 3] // a
            );
            // 1行づつ画像を読み取ってピクセルを配列に格納
            // 画像データは、画像の左から右、下から上へ向かう順番で格納されます。
            // (this.img.pixels[r, g, b, a, r, g, b, a])色のデータが順番に入っているイメージ

            this.colors.push(c);
          }
        }

        const sortMode = gd.HUE.sortMode;
        gd.sortColors(this.colors, sortMode);

        let i = 0;
        for (let gridY = 0; gridY < tileCount; gridY++) {
          for (let gridX = 0; gridX < tileCount; gridX++) {
            p5.fill(this.colors[i]);
            p5.rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
            p5.strokeWeight(0);
            i++;
          }
        }
      };
    }
  }
};
</script>

<style>
.home {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #370083;
}
canvas {
  position: absolute;
}
</style>
