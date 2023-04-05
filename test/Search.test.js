import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Search from '@/components/Search'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(Vuex)
const localVue = createLocalVue()
const mockSerachInput = 'searchKey'
const $router = {
  push: jest.fn(),
}

describe('FilterData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('when there are not query params', () => {
    test('should add search query param', async () => {
      const $route = {
        query: {}
      }
      const wrapper = factory($route)

      const searchFiled = wrapper.find('[data-testid="search"]')
      expect(searchFiled.exists()).toBe(true)
      const searchBtn = wrapper.find('[data-testid="search-btn"]')
      searchBtn.vm.$emit('click')
      await wrapper.vm.$nextTick()
      expect($router.push).toHaveBeenCalledTimes(1)
      expect($router.push).toHaveBeenCalledWith({ query: { search: mockSerachInput } })
    })
  })

  describe('when there are query params', () => {
    test('should keep other query params and add search query', async () => {
      const $route = {
        query: { 'year': '1984' }
      }
      const wrapper = factory($route)
      const searchFiled = wrapper.find('[data-testid="search"]')
      expect(searchFiled.exists()).toBe(true)
      const searchBtn = wrapper.find('[data-testid="search-btn"]')
      searchBtn.vm.$emit('click')
      await wrapper.vm.$nextTick()
      expect($router.push).toHaveBeenCalledTimes(1)
      expect($router.push).toHaveBeenCalledWith({ query: { 'year': '1984', search: mockSerachInput } })
    })
  })
})

function factory($route) {
  const actions = {}
  const getters = {
    'searchQuery': () => mockSerachInput
  }
  const store = new Vuex.Store({
    actions,
    getters
  })
  const wrapper = shallowMount(Search, {
    localVue,
    Vuetify,
    store,
    mocks: {
      $router,
      $route
    }
  })

  return wrapper
}