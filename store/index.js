import Vuex from 'vuex'
import * as TYPES from './mutationTypes'

const createStore = () => {
  return new Vuex.Store({
    state: {
      pagesCount: 0,
      items: [],
      searchQuery: null,
      search: {
        searchString: null,
        filter: null,
      },
      // Default page settings
      options: {
        page: 1,              // current page number
        itemsPerPage: 10,
        sortBy: [],
        sortDesc: [false],
        groupBy: [],
        groupDesc: [],
        multiSort: false,
        mustSort: false,
      }
    },
    getters: {
      items(state) {
        return state.items
      },
      itemsPerPage(state) {
        return state.options.itemsPerPage
      },
      currentPageNumber(state) {
        return state.options.page
      },
      pagesCount(state) {
        return state.pagesCount
      },
      options(state) {
        return state.options
      },
      searchQuery(state) {
        return state.searchQuery
      }
    },
    mutations: {
      SET_ITEMS(state, items) {
        state.items = items
      },
      SET_PAGES_COUNT(state, pagesCount) {
        state.pagesCount = pagesCount
      },
      SET_OPTIONS(state, options) {
        state.options = options
      },
      SET_SEARCH_QUERY(state, newQuery) {
        state.searchQuery = newQuery
      },
      CLEAR_SEARCH(state) {
        state.searchQuery = null
      }
    },
    actions: {
      updatePagesCount({ commit, state }, newPagesCount) {
        if (newPagesCount < 0 || newPagesCount === state.pagesCount)
          return
        commit(TYPES.SET_PAGES_COUNT, newPagesCount)
      },
      updatePageOptions({ commit, state }, newOptions) {
        if (!newOptions || newOptions === state.options)
          return
        commit(TYPES.SET_OPTIONS, newOptions)
      },
      updateItems({ commit, state }, newItems) {
        if (!newItems || newItems === state.items)
          return
        commit(TYPES.SET_ITEMS, newItems)
      },
    }
  })
}

export default createStore
