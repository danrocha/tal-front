import { shallowMount } from '@vue/test-utils';
import CityListItem from '../CityListItem.vue';
import kebabCase from '../../mixins/kebabCase';

describe('CityListItem.vue', () => {
  const city = {
    name: 'Berlin',
    id: 1,
    countryByCountryIsocode: {
      name: 'Germany',
      iso: 'DE',
    },
    locations: {
      totalCount: 1,
    },
  };
  const wrapper = shallowMount(CityListItem, {
    propsData: {
      city,
    },
    mixins: [kebabCase],
  });
  test('renders city.name in H3 component', () => {
    expect(wrapper.find('h3').text()).toContain(city.name);
  });
  test('renders city.name as a link with the correct url as href', () => {
    const a = wrapper.find('a');
    expect(a.text()).toContain(city.name);
    //expect(a.attributes().href).toBe(`/${wrapper.kebabCase(city.countryByCountryIsocode.iso)}/${wrapper.kebabCase(city.name)}`);
  });
  test('renders city.countryByCountryIsocode.iso', () => {
    expect(wrapper.text()).toContain(city.countryByCountryIsocode.iso);
  });
  test('renders city.locations.totalCount', () => {
    expect(wrapper.text()).toContain(city.locations.totalCount);
  });
  test('renders singular "office" if only one location', () => {
    city.locations.totalCount = 1;
    const wrapper = shallowMount(CityListItem, {
      propsData: {
        city,
      },
    });
    expect(wrapper.text()).not.toContain('offices');
  });
  test('renders plural "offices" if more than one location', () => {
    city.locations.totalCount = 2;
    const wrapper = shallowMount(CityListItem, {
      propsData: {
        city,
      },
    });
    expect(wrapper.text()).toContain('offices');
  });
});
