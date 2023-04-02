import Vuex from 'vuex'
import * as TYPES from './mutationTypes'

const createStore = () => {
  return new Vuex.Store({
    state: {
      pagesCount: 0,
      items: [],
      searchQuery: null,
      searchQuery: null,
      filters: new Map(),
      // Default page settings

      // TODO - is all of those needed?
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
      },
      filters(state) {
        return state.filters
      }
    },
    mutations: {
      SET_ITEMS(state, items) {
        state.items = items
      },
      SET_PAGES_COUNT(state, pagesCount) {
        state.pagesCount = pagesCount
      },
      SET_PAGE_NUMER(state, pageNumber) {
        state.options.page = pageNumber
      },
      SET_OPTIONS(state, options) {
        state.options = options
      },
      SET_SEARCH_QUERY(state, newQuery) {
        console.log(newQuery)
        state.searchQuery = newQuery
      },
      SET_FILTERS(state, filters) {
        state.filters = filters
      },
      CLEAR_SEARCH_QUERY(state) {
        state.searchQuery = null
      },
      CLEAR_FILTERS(state) {
        state.filters.clear()
      },
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
      updateSearchQuery({ commit, getters }, newSearchQuery) {
        commit(TYPES.SET_PAGE_NUMER, 1)
        if (getters.searchQuery === newSearchQuery)
          return
        commit(TYPES.SET_SEARCH_QUERY, newSearchQuery)
      },
      updateFilters({ commit, state }, { filterName, filter }) {
        commit(TYPES.SET_PAGE_NUMER, 1)
        const allFilters = state.filters
        allFilters.set(filterName, filter)
        commit(TYPES.SET_FILTERS, allFilters)
      },
      clearFilter({ commit, state }, filterName) {
        const filters = state.filters
        filters.delete(filterName)
        commit(TYPES.SET_FILTERS, filters)
      },
      clearAllFilters({ commit }) {
        commit(TYPES.CLEAR_FILTERS)
      },
      clearAll({ commit }) {
        commit(TYPES.SET_SEARCH_QUERY)
        commit(TYPES.CLEAR_FILTERS)
      }
    }
  })
}

export default createStore
