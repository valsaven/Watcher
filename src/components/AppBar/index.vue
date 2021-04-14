<template>
  <div class="app-bar">
    <!-- SEARCH -->
    <search-block
      class="app-bar__item"
      :images="images"
      @load-images="onLoadImages"
      @clear-images="$emit('clear-images')"
    />

    <!-- SHORT INFO -->
    <short-info-block
      class="app-bar__item"
      :total="images.length"
    />

    <!-- DELETE -->
    <delete-block
      class="app-bar__item"
      @toggle-delete-mode="toggleDeleteMode"
      @delete-images="$emit('delete-images')"
    />
    <!-- FIXME: [Vue warn]: Avoid mutating a prop directly at line 18 -->
  </div>
</template>

<script lang="ts">
import {
  Component,
  Emit,
  Prop,
  Vue,
} from 'vue-property-decorator';

import SearchBlock from './components/SearchBlock.vue';
import ShortInfoBlock from './components/ShortInfoBlock.vue';
import DeleteBlock from './components/DeleteBlock.vue';

import { Images } from '../../types';

@Component({
  components: {
    SearchBlock,
    ShortInfoBlock,
    DeleteBlock,
  },
})
export default class AppBar extends Vue {
  @Prop({
    type: Boolean,
  })
  deleteToRecycleBin = true;

  @Prop({
    type: Array,
  })
  images: Images = [];

  @Emit('load-images')
  onLoadImages(images: Images): Images {
    return images;
  }

  @Emit('toggle-delete-mode')
  toggleDeleteMode(val: boolean): boolean {
    return val;
  }
}
</script>

<style>
.app-bar {
  background-color: #f1f1f1;
  display: flex;
  padding: 10px 0 10px;
}

.app-bar__item {
  flex: 20%;
}
</style>
