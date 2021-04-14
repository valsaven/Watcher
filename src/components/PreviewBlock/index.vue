<template>
  <div class="preview-block">
    <img
      v-if="activeImage"
      class="preview-block__image"
      :src="`safe-file-protocol://${activeImage.src}`"
      alt="image"
    >
    <img
      v-else
      svg-inline
      class="preview-block__blank"
      src="./assets/portrait-black-18dp.svg"
      alt="image"
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { Image } from '../../types';

@Component
export default class PreviewBlock extends Vue {
  @Prop()
  activeImage?: Image;
}
</script>

<style scoped>
.preview-block {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
}

.preview-block__image {
  max-height: 100%;
  max-width: 100%;
}

.preview-block__blank {
  height: 350px;
  width: 350px;
}
</style>
