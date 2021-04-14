<template>
  <div
    :class="{ 'image-active': image.selected }"
    class="image-block"
    @click.exact="$emit('openImage', image)"
    @click.ctrl="toggleImageSelection(image.id)"
  >
    <img
      :src="`file:///${image.src}`"
      width="180px"
      alt="image"
    >
    <div class="image-block__image">
      <!--      <v-tooltip-->
      <!--        bottom-->
      <!--        light-->
      <!--        color="blue-grey darken-2"-->
      <!--      >-->
      <!--        <template v-slot:activator="{ on }">-->
      <!--          <img-->
      <!--            v-on="{ on }"-->
      <!--            :src="`file:///${image.src}`"-->
      <!--            width="180px"-->
      <!--            alt="image"-->
      <!--          >-->
      <!--        </template>-->
      <!--        <div>-->
      <!--          <span v-text="image.name" /><br>-->
      <!--          <span v-text="image.modifiedTime" /><br>-->
      <!--          <span v-text="image.size" />-->
      <!--        </div>-->
      <!--      </v-tooltip>-->
    </div>
    <div class="image-block__title">
      <span v-text="image.name" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VImage',
  props: {
    image: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    // ...mapState([
    //   'selectedImages',
    // ]),
  },
  methods: {
    // ...mapActions([
    //   'toggleImageSelection',
    // ]),
  },
};
</script>

<style scoped>
.image-block {
  border: 1px solid #acacac;
  height: 170px;
  margin: 6px;
  width: 170px;
}

.image-block__image {
  height: 150px;
  padding: 14px 10px;
}

.image-block__image img {
  border: 1px solid #acacac;
  box-shadow: 0 0 2px 1px #acacac;
  cursor: pointer;
  height: 100%;
  width: 100%;
}

.image-block__title {
  height: 20px;
}

.image-block__title span {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;
}

.image-active {
  background-color: #d7d0ff;
}
</style>
