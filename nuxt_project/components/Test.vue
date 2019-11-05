<template lang="pug">
  .test
    VueP5(
      @setup="setup"
      @draw="draw"
    )
    p dfgbhnj
</template>

<script>
import VueP5 from 'vue-p5';

export default {
  mehotds: {
    setup(sk) {
      if (process.client) {
        require('VueP5')
        console.log("setUp", sk);
      }
    },
    draw(sk) {
      if (process.client) {
        console.log(sk);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  color: #000;
  font-size: 54px;
}
</style>
