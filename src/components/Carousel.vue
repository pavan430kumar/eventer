<template>
    <v-carousel>
    <v-carousel-item 
    v-for="(item,i) in items" v-bind:src="item.src" :key="i">
    </v-carousel-item>
    </v-carousel>
</template>

<<script>
export default {
  data () {
    return {
      items: [
            { src: 'https://media.timeout.com/images/103444978/image.jpg' },
            { src: 'http://www.touristsbook.com/boston/files/2015/02/Boston-Downtown-Skyline-Buidlings.jpg' },
            { src: 'http://image.myvr.com/36072b4208f38136/f8d8a898d349dbd2/102-1downtown-los-angeles.jpg' }
      ]
    }
  }
}
</script>

