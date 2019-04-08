import { shallowMount } from '@vue/test-utils';
import BaseButton from '../BaseButton.vue';

describe('BaseButton.vue', () => {
  test('renders item', () => {
    const wrapper = shallowMount(BaseButton);
    expect(wrapper.contains('button')).toBe(true);
  });
});
