<template>
  <div id="app">
    <div id="wrapper">
      <app-bar
        :images="images"
        :delete-to-recycle-bin="deleteToRecycleBin"
        @toggle-delete-mode="onToggleDeleteMode"
        @load-images="onLoadImages"
        @clear-images="onClearImages"
        @delete-images="onDeleteImages"
      />
      <main>
        <image-list
          :active-image="activeImage"
          :images="images"
          :selected-images="selectedImages"
          @open-image="onOpenImage"
          @select-image="onSelectImage"
        />
        <preview-block :active-image="activeImage" />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import trash from 'trash';
import fs from 'fs';

import {
  Image,
  Images,
} from './types';

import AppBar from './components/AppBar/index.vue';

import ImageList from './components/ImageList/ImageList.vue';
import PreviewBlock from './components/PreviewBlock/index.vue';

@Component({
  components: {
    AppBar,
    ImageList,
    PreviewBlock,
  },
})
export default class App extends Vue {
  public activeImage: Image | null = null;

  public images: Images = [];

  public selectedImages: Images = [];

  public total = 0;

  public deleteToRecycleBin = true;

  public setActiveImage(image: Image): void {
    this.activeImage = image;
  }

  public setTotal(total: number): void {
    this.total = total;
  }

  public setImages(images: Images): void {
    this.images = images;
  }

  onLoadImages(images: Images): void {
    try {
      this.setTotal(images.length);

      if (this.images.length !== 0) {
        this.setActiveImage(this.images[0]);
      }

      this.setImages(images);
    } catch (err) {
      throw new Error(err);
    }
  }

  onClearImages(): void {
    try {
      this.setImages([]);
      this.setTotal(0);
    } catch (err) {
      throw new Error(err);
    }
  }

  onToggleDeleteMode(val: boolean): void {
    this.deleteToRecycleBin = !val;
  }

  onDeleteImages(): void {
    this.selectedImages.forEach((selectedImage: Image) => {
      if (this.deleteToRecycleBin) {
        // Safe delete (to recycle bin)
        // FIXME: Fix detele to recucle bin
        trash(selectedImage.src).then(() => {
          console.log('Images were successfully deleted.');
          // this.search(); // Update after deleting
        });
      } else if (!this.deleteToRecycleBin) {
        // Permanently delete
        fs.unlinkSync(selectedImage.src);
        // this.search(); // Update after deleting
      } else {
        console.log('Error in deleting process.');
      }
    });
  }

  onOpenImage(image: Image): void {
    this.setActiveImage(image);
  }

  toggleSingleImageSelect(image: Image): void {
    const index = this.images.findIndex((tempImage) => tempImage.md5 === image.md5);

    if (index > -1) {
      this.images[index].selected = !this.images[index].selected;
    }
  }

  onSelectImage(image: Image): void {
    const index = this.selectedImages
      .findIndex((selectedImage) => selectedImage.md5 === image.md5);

    if (index > -1) {
      this.selectedImages.splice(index, 1);
    } else {
      this.selectedImages.push(image);
    }

    this.toggleSingleImageSelect(image);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,
body,
#app {
  margin: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, .9) 100%
  );
  height: 100vh;
  width: 100vw;
}

main {
  display: flex;
  height: calc(100% - 51px);
  width: 100vw;
  flex-direction: row;
}
</style>
