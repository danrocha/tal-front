import { shallowMount } from '@vue/test-utils';
import CityList from '../CityList.vue';
import CityListItem from '../CityListItem.vue';

describe('CityList.vue', () => {
  const cities = [
    {
      name: 'Berlin',
      id: 1,
      countryByCountryIsocode: {
        name: 'Germany',
        iso: 'DE',
      },
      locations: {
        totalCount: 1,
      },
    },
    {
      name: 'Munich',
      id: 2,
      countryByCountryIsocode: {
        name: 'Germany',
        iso: 'DE',
      },
      locations: {
        totalCount: 5,
      },
    },
    {
      name: 'Stuttgart',
      id: 3,
      countryByCountryIsocode: {
        name: 'Germany',
        iso: 'DE',
      },
      locations: {
        totalCount: 3,
      },
    },
  ];
  const wrapper = shallowMount(CityList, {
    propsData: {
      cities,
    },
  });
  test('render a CityListItem for each item in the cities prop', () => {
    const items = wrapper.findAll(CityListItem);
    expect(items).toHaveLength(cities.length);
    items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.props().city).toBe(cities[i]);
    });
  });
});
