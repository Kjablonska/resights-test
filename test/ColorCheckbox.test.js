import Vue from 'vue'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import ColorCheckbox from '@/components/ColorCheckbox'
import Vuetify from 'vuetify'


Vue.use(Vuex)
const localVue = createLocalVue()
Vue.use(Vuetify)

const actions = {
  setShowColors: jest.fn()
}
const getters = {
  'showColor': () => false
}
const $store = new Vuex.Store({
  actions,
  getters,
  disptach: jest.fn(),
})

describe('ColorCheckbox', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ColorCheckbox, {
      localVue,
      vuetify: new Vuetify(),
      mocks: {
        $store,
      }
    })
  })
  test('should trigger setShowColors action on click', async () => {
    const checkbox = wrapper.find('[data-testid="color-checkbox"]')
    await checkbox.setChecked()
    await wrapper.vm.$nextTick()
    expect(actions.setShowColors).toHaveBeenCalledTimes(1)
  })
})