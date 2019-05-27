<template>
  <div id="office-map" class="w-full h-full" ref="container"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
//import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { mapState, mapActions } from 'vuex';
import formatUrl from '@/mixins/formatUrl';

export default {
  name: 'OfficeMap',
  mixins: [formatUrl],
  props: {
    geojson: {
      type: Object,
      required: false,
      default: null,
    },
  },
  created() {
    this.map = null;
  },
  data() {
    return {
      mapSourceName: 'locations',
      mapUnclusteredLayerName: 'locations-unclustered',
      mapClusteredLayerName: 'clusters',
      mapClusterCountLayerName: 'cluster-count',
      mapTextFont: ['Ubuntu Mono Bold', 'Arial Unicode MS Bold'],
      mapTextSize: 12,
      mapClickedLocationId: null,
    };
  },
  mounted() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZGFucm9jIiwiYSI6ImNqcmRwYWtqdjBkcHAzeXJrNHVkZDA1MjYifQ.CZo5a_sjRCEbm3eJDekPXg';
    this.map = new mapboxgl.Map({
      container: document.getElementById('office-map'),
      style: 'mapbox://styles/danroc/cjrgcw84j2ehx2spc57sz7axo',
      center: [5.81, 34.95],
      zoom: 1,
    });

    this.map.on('load', () => {
      console.log('Map loaded, loading layers...');
      this.map.addSource(this.mapSourceName, {
        type: 'geojson',
        data: this.geojson.data,
        cluster: true,
        clusterMaxZoom: 22,
        clusterRadius: 25,
      });
      this.map.addLayer({
        id: this.mapUnclusteredLayerName,
        type: 'symbol',
        source: this.mapSourceName,
        layout: {
          'icon-image': 'marker-15',
          'icon-allow-overlap': true,
          'text-field': '{name}',
          'text-size': this.mapTextSize,
          'text-font': this.mapTextFont,
          'text-offset': [0, 1],
          'text-anchor': 'top',
          'text-optional': true,
        },
        paint: {
          'text-halo-color': 'white',
          'text-halo-width': 1,
        },
      });
      this.map.addLayer({
        id: this.mapClusteredLayerName,
        type: 'circle',
        source: this.mapSourceName,
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': ['step', ['get', 'point_count'], '#ffed4a', 10, '#f2d024', 75, '#684f1d'],
          'circle-radius': ['step', ['get', 'point_count'], 20, 10, 30, 75, 40],
        },
      });
      this.map.addLayer({
        id: this.mapClusterCountLayerName,
        type: 'symbol',
        source: this.mapSourceName,
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': this.mapTextFont,
          'text-size': this.mapTextSize,
          'text-line-height': 1,
        },
      });
      if (this.selectedLocation) {
        this.flyToSelectedLocation(this.selectedLocation);
      } else if (this.filterCity) {
        this.fitBounds();
      } else {
        // geolocate user
        // TODO: if geolocated, search office around area
        this.$getLocation().then(coordinates => {
          console.log(coordinates);
          this.map.flyTo({
            center: [coordinates.lng, coordinates.lat],
            zoom: 9,
          });
        });
      }
    });
    // inspect a cluster on click
    this.map.on('click', this.mapClusteredLayerName, e => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: [this.mapClusteredLayerName],
      });
      const clusterId = features[0].properties.cluster_id;
      this.map.getSource(this.mapSourceName).getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;
        this.map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom,
        });
      });
    });

    this.map.on('mouseenter', 'clusters', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });

    this.map.on('mouseleave', 'clusters', () => {
      this.map.getCanvas().style.cursor = '';
    });

    this.map.on('click', this.mapUnclusteredLayerName, e => {
      const location = e.features[0];
      const coordinates = location.geometry.coordinates.slice();
      this.mapClickedLocationId = location.properties.id;
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      /* while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      } */
      //assemble popup
      let popupHTML = `<h3 class="font-mono">${location.properties.name}</h3>`;
      if (location.properties.website) {
        popupHTML += `<a href="${
          location.properties.website
        }" target="_blank" class="text-gray-500no-underline border-b-2 border-transparent hover:border-yellow-500">${this.formatUrl(
          location.properties.website
        )}</a>`;
      }
      popupHTML += `<p class="mt-2 text-gray">
          ${location.properties.formattedAddress.replace(new RegExp(', ', 'g'), '<br>')}</p>`;
      new mapboxgl.Popup({
        offset: 5,
        closeButton: false,
        id: location.properties.id,
      })
        .setHTML(popupHTML)
        .setLngLat(coordinates)
        .addTo(this.map);
    });

    this.map.on('zoomend', () => {
      //console.log('zoom end:', this.map.getZoom());
      this.setMapZoomLevel(this.map.getZoom());
    });

    this.map.addControl(new mapboxgl.GeolocateControl());
  },
  methods: {
    ...mapActions(['setMapZoomLevel', 'setLocation']),
    loadGeoJson() {
      console.log('loadGeoJson()');
      this.map.getSource(this.mapSourceName).setData(this.geojson.data);
      this.fitBounds();
    },
    fitBounds() {
      let bounds = new mapboxgl.LngLatBounds();
      this.map.getSource(this.mapSourceName)._data.features.forEach(function(feature) {
        bounds.extend(feature.geometry.coordinates);
      });
      this.map.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        maxZoom: 16,
      });
    },
    flyToSelectedLocation(location_id) {
      //console.log(location_id);
      //console.log(this.map.getSource(this.mapSourceName));
      const coords = this.map
        .getSource(this.mapSourceName)
        ._data.features.find(feature => feature.properties.id === location_id).geometry.coordinates;
      //console.log(coords);
      //const zoom = this.map.getZoom();
      this.map.easeTo({ center: coords, zoom: 16 });
    },
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      selectedLocation: state => state.location.selectedLocation,
      largeMap: state => state.largeMap,
      filterCity: state => state.filterCity,
    }),
  },
  watch: {
    geojson() {
      if (this.map.loaded()) {
        this.loadGeoJson();
      }
    },
    largeMap() {
      this.map.resize();
      this.fitBounds(this.bounds);
    },
    selectedLocation() {
      this.flyToSelectedLocation(this.selectedLocation.id);
    },
    mapClickedLocationId(id) {
      if (id) this.setLocation(this.mapClickedLocationId);
    },
  },
};
</script>

<style scoped>
.mapboxgl-canvas {
  width: 100%;
  height: 100vh;
}
.mapboxgl-map {
  @apply w-full;
  @apply h-full;
}
.mapboxgl-popup {
  max-width: 200px;
}
.mapboxgl-popup-content {
  @apply font-mono;
}
</style>
