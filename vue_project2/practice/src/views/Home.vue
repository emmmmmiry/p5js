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
      sortMode: null
    };
  },
  mounted() {
    new P5(this.script);
  },
  methods: {
    script(p5) {
      const setImage = loadImageFile => {
        this.img = loadImageFile;
      };
      p5.preload = () => {
        p5.loadImage(require("@/assets/pic1.jpg"), setImage);
      };

      p5.setup = () => {
        p5.createCanvas(window.innerwidth, window.innerHeight);
        // p5.noCoursor();
        // p5.noStroke();
      };

      p5.draw = () => {
        const tileCount = p5.floor(p5.width / p5.max(p5.mouseX, 5));
        const rectSize = p5.width / tileCount;

        this.img.loadPixels();
        this.colors = [];
      };
    }
  }
};
</script>
