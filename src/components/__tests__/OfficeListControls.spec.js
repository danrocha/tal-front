import { shallowMount } from '@vue/test-utils';
import OfficeListControl from '../components/OfficeListControls.vue';

describe('OfficeListControls.vue', () => {
  test('component mounts', () => {
    const wrapper = shallowMount(OfficeListControl);
    expect(wrapper.find('div').attributes().id).toBe('office-list-controls');
  });
});
