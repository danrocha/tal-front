export const namespaced = true;

const FIRST_STEP = 1;
const distance = (lat1, lon1, lat2, lon2) => {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

export const state = {
  city: null,
  officeDetails: null,
  step: FIRST_STEP,
  manual: false,
  hasWebsite: false,
};

export const mutations = {
  /* eslint-disable no-param-reassign */
  SET_CITY(state, city) {
    state.city = city;
  },
  SET_OFFICE_DETAILS(state, officeDetails) {
    state.officeDetails = officeDetails;
  },
  NEXT_STEP(state) {
    state.step++;
  },
  PREV_STEP(state) {
    if (state.step > FIRST_STEP) {
      state.step--;
    }
  },
  SET_STEP(state, step) {
    state.step = step;
  },
  TOGGLE_MANUAL(state) {
    state.manual = !state.manual;
  },
  SET_HAS_WEBSITE(state, hasWebsite) {
    state.hasWebsite = hasWebsite;
  },
  RESET(state) {
    state.city = null;
    state.officeDetails = null;
    state.step = FIRST_STEP;
    state.manual = false;
    state.hasWebsite = false;
  },
  RESET_OFFICE_DETAILS(state) {
    state.officeDetails = null;
  },
};

export const actions = {
  setCity({ commit }, city) {
    commit('SET_CITY', city);
  },
  setOfficeDetails({ commit }, officeDetails) {
    commit('SET_OFFICE_DETAILS', officeDetails);
    if (officeDetails.hasOwnProperty('website')) {
      commit('SET_HAS_WEBSITE', true);
    }
  },
  nextStep({ commit }) {
    commit('NEXT_STEP');
  },
  prevStep({ commit }) {
    commit('PREV_STEP');
  },
  reset({ commit }) {
    commit('RESET');
  },
  resetOfficeDetails({ commit }) {
    commit('RESET_OFFICE_DETAILS');
    commit('SET_STEP', 2);
  },
  toggleManual({ commit }) {
    commit('TOGGLE_MANUAL');
  },
};

export const getters = {
  getAddressObject: state => object => {
    const ShouldBeComponent = {
      street_number: ['street_number'],
      postal_code: ['postal_code'],
      route: ['street_address', 'route'],
      region: [
        'administrative_area_level_1',
        'administrative_area_level_2',
        'administrative_area_level_3',
        'administrative_area_level_4',
        'administrative_area_level_5',
      ],
      city: [
        'locality',
        'sublocality',
        'sublocality_level_1',
        'sublocality_level_2',
        'sublocality_level_3',
        'sublocality_level_4',
        'postal_town',
      ],
      country: ['country'],
    };

    let address = {
      street_number: '',
      postal_code: '',
      route: '',
      region: '',
      city: '',
      country: '',
    };
    state[object].address_components.forEach(component => {
      for (let shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
          if (shouldBe === 'country') {
            address[shouldBe] = component.short_name;
          } else {
            address[shouldBe] = component.long_name;
          }
        }
      }
    });
    return address;
  },
  sameCities: state => {
    if (state.officeDetails && state.city) {
      if (
        distance(
          state.officeDetails.geometry.location.lat(),
          state.officeDetails.geometry.location.lng(),
          state.city.geometry.location.lat(),
          state.city.geometry.location.lng()
        ) < 20
      ) {
        return true;
      }
    }
    return false;
  },
};
