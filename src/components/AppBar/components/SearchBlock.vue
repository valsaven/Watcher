<template>
  <div class="search">
    <button
      class="button search__btn"
      @click="goUp"
    >
      Up
    </button>

    <input
      v-model="imagesPath"
      type="text"
      class="search__input"
      placeholder="Enter the path..."
      @keyup.enter="getImages(imagesPath)"
    >
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { Image, Images } from '@/types';
import { sep } from 'path';
import { imageSize } from 'image-size';
import { format } from 'date-fns';
import md5File from 'md5-file';

const fs = require('fs');

@Component
export default class SearchBlock extends Vue {
  @Prop({
    type: Array,
  })
  images: any;

  imagesPath: string = '/home/val/dev_vs/tmppp';

  @Emit('load-images')
  loadImages(images: Images) {
    return images;
  }

  @Emit('clear-images')
  clearImages() {}

  getImages() {
    const humanFileSize = (size: number): string => {
      const i = Math.floor(Math.log(size) / Math.log(1024));
      const pow = 1024 ** i;
      return `${<any>(size / pow).toFixed(2) * 1} ${
        ['B', 'kB', 'MB', 'GB', 'TB'][i]
      }`;
    };

    const imageTypes = ['gif', 'jpg', 'jpeg', 'png', 'webp'];

    this.clearImages();

    // TODO: Remove console.log
    console.log('Start search...');

    // Empty path check
    if (!this.imagesPath) {
      alert('Error message:\nThe path is empty!');
      return;
    }

    fs.readdir(this.imagesPath, (err: any, dir: any) => {
      // Wrong path check
      if (err) {
        alert(`Error message:\n${err}`);
        return;
      }

      const tempImagesArray: Images = [];

      for (let i = 0; i < dir.length; i += 1) {
        const fileName = dir[i];
        const fileExt = fileName
          .split('.')
          .pop()
          .toLowerCase();

        if (imageTypes.includes(fileExt)) {
          const src = `${this.imagesPath}${sep}${fileName}`;
          const fileStats = fs.statSync(src);

          try {
            const dim = imageSize(src);
            const dimensions = `${dim.width}x${dim.height}`;

            const image: Image = {
              id: i,
              src,
              name: fileName,
              dimensions,
              ext: fileExt,
              size: humanFileSize(fileStats.size),
              modifiedTime: format(fileStats.mtimeMs, 'dd mmm yyyy, HH:mm:ss'),
              selected: false,
              active: false,
              md5: md5File.sync(src),
            };

            tempImagesArray.push(image);
          } catch (e) {
            throw new Error(e);
          }
        }
      }

      this.loadImages(tempImagesArray);
    });
  }

  goUp() {
    let tempPath = this.imagesPath.split(sep);
    tempPath.pop();
    this.imagesPath = tempPath.join(sep);
    this.getImages();
  }
}
</script>

<style scoped>

</style>
