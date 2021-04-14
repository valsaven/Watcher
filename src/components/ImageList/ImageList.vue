<template>
  <div
    class="v-image-list__wrapper"
  >
    <div
      v-if="images.length > 0"
      class="v-image-list"
    >
      <RecycleScroller
        v-slot="{ item }"
        class="scroller"
        :items="images"
        :item-size="8"
        key-field="id"
      >
        <v-thumbnail
          :image="item"
          @open-image="$emit('open-image', item)"
          @select-image="$emit('select-image', item)"
        />
      </RecycleScroller>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Watch,
} from 'vue-property-decorator';

import { Image, Images } from '../../types';
import VImage from './components/VImage.vue';
import VThumbnail from './components/VThumbnail.vue';

@Component({
  components: {
    VImage,
    VThumbnail,
  },
})
export default class ImageList extends Vue {
  @Prop({
    type: Image || null,
  })
  activeImage: Image | null = null;

  @Prop({
    type: Array,
  })
  selectedImages: Images = [];

  @Prop({
    type: Array,
  })
  images: Images = [];

  @Watch('activeImage')
  onActiveImageChanged(value: Image, oldValue: Image): void {
    console.log(value);
    console.log(oldValue);
    console.log(this.activeImage);
  }

  // METHODS
  // open(link: string): void {
  //   this.$electron.shell.openExternal(link);
  // }

  // hotKeys(event: KeyboardEvent): void {
  //   if (event.key === 'Delete') {
  //     console.log('delete');
  //     console.log(this.activeImage);
  //     console.log(this.images);
  //
  //     if (this.deleteToRecycleBin) {
  //       // Safe delete (to recycle bin)
  //       trash([this.activeImage.src]).then(() => {
  //         console.log('Images were successfully deleted.');
  //         this.search(); // Update after deleting
  //       });
  //     } else if (!this.deleteToRecycleBin) {
  //       // Permanently delete
  //       fs.unlinkSync(this.activeImage.src);
  //       this.search(); // Update after deleting
  //     } else {
  //       console.log('Error in deleting process.');
  //     }
  //   }
  //
  //   event.preventDefault(); // prevent the default action (scroll / move caret)
  // }

  // HOOKS
  created(): void {
    // window.addEventListener('keyup', this.hotKeys);
  }
}
</script>

<style scoped>
.v-image-list__wrapper {
  height: 100%;
  width: 400px;
}

.v-image-list {
  flex-basis: 80%;
  height: 100%;
  overflow-y: auto;
  width: 100%;
}

.v-image-list__images-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}
</style>
