<template>
  <div class="container content">
    <div class="post-body">
      <div class="title-input col-12">Maps</div>

      <div class="button-bar col-12">
        <div class="text-right">
          <button @click.prevent="showSearchBox = !showSearchBox">
            <i class="fas fa-plus-circle"></i>
          </button>
        </div>
      </div>

      <div id="map-search-box" class="col-12" v-if="showSearchBox">
        <div class="form-group row no-gutters">
          <input
            ref="GoogleMapsLocationInput"
            type="text"
            class="form-control title-input col"
            v-model="searchWord"
            placeholder="Search your location"
          />
          <button @click="searchMarker" class="btn btn-primary btn-search">
            Search
          </button>
        </div>

        <google-map-search-list
          :list="resultList"
          @chosen="onSelectedMarker($event)"
        />

        <google-map-form
          :selectedMarker="selectedMarker"
          :selectedMarkerTitle="selectedMarkerTitle"
          @titleInput="selectedMarkerTitle = $event"
          :selectedMarkerDesc="selectedMarkerDesc"
          @descInput="selectedMarkerDesc = $event"
          @onStoreMarker="storeMarker"
        />
      </div>

      <template v-if="markers.length === 0">
        <spinner />
      </template>

      <template v-show="markers.length > 0">
        <GmapMap
          ref="mapRef"
          :center="markers[0] ? markers[0].position : { lat: 10, lng: 10 }"
          :zoom="5"
          style="width:100%; height: 300px"
        >
          <gmap-info-window
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="infoWinOpen"
            @closeclick="infoWinOpen = false"
          >
          </gmap-info-window>

          <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            @click="toggleInfoWindow(m, index)"
          />
        </GmapMap>
      </template>

      <tab-bar></tab-bar>
    </div>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import GoogleMapForm from "../../components/GoogleMaps/GoogleMapForm";
import GoogleMapSearchList from "../../components/GoogleMaps/GoogleMapSearchList";

export default {
  data() {
    return {
      showSearchBox: false,
      selectedMarker: null,
      selectedMarkerTitle: "",
      selectedMarkerDesc: "",
      searchWord: null,
      resultList: [],
      markers: [],
      google: gmapApi,
      mapService: {},

      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,

      infoOptions: {
        content: "",
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  methods: {
    searchMarker() {
      const searchWord = this.searchWord.trim();

      if (searchWord === "") {
        return false;
      }

      var request = {
        query: searchWord,
        fields: ["name", "geometry", "formatted_address"]
      };

      var listItems = [];
      this.mapService.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            const item = {
              name: results[i].name,
              formatted_address: results[i].formatted_address,
              position: {
                lat: results[i].geometry.location.lat(),
                lng: results[i].geometry.location.lng()
              }
            };

            this.resultList.push(item);
          }
        }
      });

      return false;
    },
    onSelectedMarker(index) {
      this.selectedMarker = { ...this.resultList[index] };
    },
    storeMarker() {
      const newMarker = {
        ...this.selectedMarker,
        title: this.selectedMarkerTitle.trim(),
        desc: this.selectedMarkerDesc.trim()
      };

      this.$store.dispatch("map/storeMarker", newMarker);
      this.resultList = [];
    },
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;

      if (marker.title || marker.desc) {
        this.infoOptions.content = `<b>${marker.title}</b><br> ${marker.desc}`;
      } else {
        this.infoOptions.content = `lat: ${marker.position.lat} lng: ${marker.position.lng}`;
      }

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    }
  },
  created() {
    this.$store.dispatch("map/fetchMarkers").then(res => {
      this.markers = this.$store.getters["map/getMarkers"];

      if (this.markers.length > 0 && this.$refs.mapRef) {
        // At this point, the child GmapMap has been mounted, but
        // its map has not been initialized.
        // Therefore we need to write mapRef.$mapPromise.then(() => ...)
        this.$refs.mapRef.$mapPromise.then(map => {
          this.mapService = new google.maps.places.PlacesService(map);
        });
      }
    });
  },
  updated() {},
  components: {
    GoogleMapForm,
    GoogleMapSearchList
  }
};
</script>

<style scoped>
#map-search-box {
  padding: 0;
}
#search-result-list {
  padding: 0;
  list-style-type: none;
}
.btn-search {
  border-radius: 0;
  margin-bottom: 20px;
  line-height: 2.1;
  font-size: 1rem;
}
.budget-item {
  height: 50px;
}
</style>
