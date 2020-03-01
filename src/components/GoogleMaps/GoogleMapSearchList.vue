<template>
  <ul id="search-result-list" v-if="list.length > 0">
    <li v-for="(item, index) in list" :key="index">
      <div class="col-12 post budget-item">
        <div class="col-12 pl-2 pr-0 row">
          <div class="col-10 pl-0">
            <div class="budget-item-title col-12 m-0" v-text="item.name"></div>
            <div
              class="budget-item-date col-12"
              v-text="item.formatted_address"
            ></div>
          </div>
          <div class="col-2 map-marker-checkbox">
            <input
              type="radio"
              name="google_marker_coords"
              :value="index"
              v-on:change="$emit('chosen', index)"
            />
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    }
  }
};
</script>
