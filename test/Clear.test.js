import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Clear from '@/components/Clear'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
const localVue = createLocalVue()
const routerMock = {
  push: jest.fn()
}
describe('Clear', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Clear, {
      localVue,
      Vuetify,
      mocks: {
        $router: routerMock
      } 
    })
  })
  test('should remove route params on Clear all button press', async () => {
    const button = wrapper.find('[data-testid="clear-btn"]')
    expect(button.exists()).toBe(true)
    button.vm.$emit('click')
    await wrapper.vm.$nextTick()
    expect(routerMock.push).toHaveBeenCalledTimes(1)
    expect(routerMock.push).toHaveBeenCalledWith({ query: {} })
  })
})
