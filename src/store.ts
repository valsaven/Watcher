import Vue from 'vue';
import Vuex from 'vuex';
import os from 'os';
import { format } from 'date-fns';
const fs = require('fs');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeImage: null,
    images: [] as any[],
    selectedImages: [] as any[],
    total: 0,
  },
  mutations: {
    setItem(state: any, { item, value }) {
      state[item] = value;
    },
  },
  actions: {
    toggleImageSelection(state, imageId) {
      const { selectedImages } = state;

      if (selectedImages.includes(imageId)) {
        selectedImages.splice(selectedImages.indexOf(imageId), 1);
      } else {
        selectedImages.push(imageId);
      }
    },
    loadImages({ commit }, newImages) {
      try {
        commit('setItem', {
          item: 'images',
          value: newImages,
        });
      } catch (err) {
        console.error(err);
      }
    },
    clearImages({ commit }) {
      try {
        commit('setItem', {
          item: 'images',
          value: [],
        });
      } catch (err) {
        console.error(err);
      }
    },
    humanFileSize(size: number): string {
      const i = Math.floor(Math.log(size) / Math.log(1024));
      const pow = 1024 ** i;
      return `${(size / pow).toFixed(2) * 1} ${
        ['B', 'kB', 'MB', 'GB', 'TB'][i]
      }`;
    },
    getImages({ state,commit, dispatch }, imagesPath) {
      const imageTypes = ['gif', 'jpg', 'jpeg', 'png', 'webp'];

      dispatch('clearImages');

      commit('setItem', {
        item: 'total',
        value: 0,
      });

      // TODO: Remove console.log
      console.log('Start search...');

      // Empty path check
      if (!imagesPath) {
        alert('Error message:\nThe path is empty!');
        return;
      }

      fs.readdir(imagesPath, (err, dir) => {
        // Wrong path check
        if (err) {
          alert(`Error message:\n${err}`);
          return;
        }

        const tempImagesArray = [];

        for (let i = 0; i < dir.length; i += 1) {
          const fileName = dir[i];
          const fileExt = fileName
            .split('.')
            .pop()
            .toLowerCase();

          if (imageTypes.includes(fileExt)) {
            const isWindows = os.platform() === 'win32';

            const fileStats = isWindows
              ? fs.statSync(`${imagesPath}\\${fileName}`)
              : fs.statSync(`${imagesPath}/${fileName}`);

            const image = {
              id: i,
              src: isWindows ? `${imagesPath}\\${fileName}` : `${imagesPath}/${fileName}`,
              name: fileName,
              ext: fileExt,
              size: dispatch('humanFileSize', fileStats.size),
              modifiedTime: format(fileStats.mtimeMs, 'DD MMM YYYY, HH:mm:ss'),
              selected: false,
              active: false,
            };

            tempImagesArray.push(image);
          }
        }

        dispatch('loadImages', tempImagesArray);
        commit('setItem', {
          item: 'total',
          value: tempImagesArray.length,
        });

        if (state.images.length !== 0) {
          commit('setItem', {
            item: 'activeImage',
            value: state.images[0],
          });
        }
      });
    },
  },
});
