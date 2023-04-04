import Vuex from 'vuex'
import * as TYPES from './mutationTypes'

const createStore = () => {
  return new Vuex.Store({
    state: {
      pagesCount: 0,
      items: [],
      searchQuery: undefined,
      filters: {},
      page: 1,
      sortDesc: false,
      sortBy: [],
      itemsPerPage: 10,
    },
    getters: {
      items(state) {
        return state.items
      },
      itemsPerPage(state) {
        return state.itemsPerPage
      },
      currentPageNumber(state) {
        return state.page
      },
      pagesCount(state) {
        return state.pagesCount
      },
      sortBy(state) {
        return state.sortBy
      },
      sortDesc(state) {
        return state.sortDesc
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
      SET_SORT_DESC(state, sortDesc) {
        state.sortDesc = sortDesc
      },
      SET_SORT_BY(state, sortBy) {
        state.sortBy = sortBy
      },
      // Change to ITEMS_COUNT
      SET_PAGES_COUNT(state, pagesCount) {
        state.pagesCount = pagesCount
      },
      SET_PAGE_NUMER(state, pageNumber) {
        state.page = pageNumber
      },
      SET_ITEMS_PER_PAGE(state, itemsPerPage) {
        state.itemsPerPage = itemsPerPage
      },
      SET_SEARCH_QUERY(state, newQuery) {
        state.searchQuery = newQuery
      },
      SET_FILTERS(state, filters) {
        state.filters = filters
      },
      CLEAR_SEARCH_QUERY(state) {
        state.searchQuery = undefined
      },
      CLEAR_FILTERS(state) {
        state.filters.clear()
      },
    },
    actions: {
      updateItemsCount({ commit, state }, newPagesCount) {
        if (newPagesCount < 0 || newPagesCount === state.pagesCount)
          return
        commit(TYPES.SET_PAGES_COUNT, newPagesCount)
      },
      updateItems({ commit, state }, newItems) {
        if (!newItems || newItems === state.items)
          return
        commit(TYPES.SET_ITEMS, newItems)
      },
      clearSearchQuery({ commit }) {
        commit(TYPES.CLEAR_SEARCH_QUERY)
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
        allFilters[filterName] = filter
        commit(TYPES.SET_FILTERS, allFilters)
      },
      clearFilter({ commit, state }, filterName) {
        const filters = state.filters
        delete filters[filterName]
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
