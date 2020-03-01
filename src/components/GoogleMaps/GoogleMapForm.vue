<template>
  <div>
    <div class="form-group" v-if="selectedMarker !== null">
      <input
        type="text"
        class="form-control col"
        placeholder="Title (optional)"
        :value="selectedMarkerTitle"
        @input="$emit('titleInput', $event.target.value)"
      />
    </div>

    <div class="form-group" v-if="selectedMarker !== null">
      <textarea
        class="form-control col"
        placeholder="Description (optional)"
        :value="selectedMarkerDesc"
        @input="$emit('descInput', $event.target.value)"
      ></textarea>
    </div>

    <div class="form-group" v-if="selectedMarker !== null">
      <button
        @click="$emit('onStoreMarker')"
        class="btn btn-primary"
        name="google-maps-submit"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["selectedMarker", "selectedMarkerTitle", "selectedMarkerDesc"]
};
</script>
