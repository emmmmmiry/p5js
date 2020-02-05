<template>
  <div class="home"></div>
</template>

<script>
// p5のbuild前のファイルを移植する
// import gd from "@/assets/js/lib/generative-design-library/generative-design-library";
import P5 from "p5";

export default {
  name: "home",
  components: {},
  data() {
    return {
      img: "",
      colors: [],
      sortMode: null,
      width: 600,
      height: 600
    };
  },
  mounted() {
    // new P5(this.script);
    window.onclick = () => {
      console.log("scroll");
      new P5(this.draw);
    };
  },
  methods: {
    // script(p5) {
    //   const setImage = loadImageFile => {
    //     this.img = loadImageFile;
    //   };
    //   p5.preload = () => {
    //     p5.loadImage(require("@/assets/pic1.jpg"), setImage);
    //   };

    //   p5.setup = () => {
    //     // const width = window.innerWidth;
    //     // const height = window.innerHeight;
    //     // p5.createCanvas(width, height);
    //     // p5.noCoursor();
    //     // p5.noStroke();
    //   };
    // },
    draw(p5) {
      const setImage = loadImageFile => {
        this.img = loadImageFile;
      };

      p5.preload = () => {
        p5.loadImage(require("@/assets/pic1.jpg"), setImage);
      };

      p5.setup = () => {
        const max = 300;
        const min = 100;
        const width = Math.floor(Math.random() * (max + 1 - min)) + min;
        const height = Math.floor(Math.random() * (max + 1 - min)) + min;
        p5.createCanvas(width, height);
      };
      // new P5(this.script);
      p5.draw = () => {
        // max() 2つの入力のうち大きい値を選ぶ
        // const mouseX = p5.mouseX > 400 ? 400 : p5.mouseX;
        const tileCount = p5.floor(p5.width / p5.max(p5.mouseX / 5, 5));
        // console.log(tileCount, p5.width, p5.max(p5.mouseX, 5), "tileCount");

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
            // そもそもこのiはなんだ
            // console.log(
            //   this.img.pixels[i],
            //   i,
            //   this.img.pixels.length,
            //   "this.img.pixels[i],"
            // );
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
