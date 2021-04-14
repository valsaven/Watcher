<template>
  <div class="remove">
    <button
      class="button remove__btn"
      :class="{ 'remove__btn_danger': !deleteToRecycleBin }"
      @click="$emit('delete-images')"
    >
      Delete
    </button>

    <label for="delete-to-recycle-bin">Delete files to recycle bin</label>
    <input
      id="delete-to-recycle-bin"
      v-model="deleteToRecycleBin"
      type="checkbox"
      @click="toggleDeleteMode"
    >
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';

@Component
export default class DeleteBlock extends Vue {
  @Emit('toggle-delete-mode')
  toggleDeleteMode(): boolean {
    return this.deleteToRecycleBin;
  }

  deleteToRecycleBin = true;
}
</script>

<style scoped>
.remove__btn_danger {
  background-color: #ff003b;
  color: #fff;
}
</style>
