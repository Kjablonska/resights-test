import Vuex from 'vuex'
import * as TYPES from './mutationTypes'
export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 10

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
      showColors: false,
    },
    getters: {
      items(state) {
        return state.items
      },
      page(state) {
        return state.page
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
      },
      showColors(state) {
        return state.showColors
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
      SET_ITEMS_COUNT(state, pagesCount) {
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
      SET_SHOW_COLORS(state, isShowColors) {
        state.showColors = isShowColors
      }
    },
    actions: {
      updateItemsCount({ commit, state }, newPagesCount) {
        if (newPagesCount < 0 || newPagesCount === state.pagesCount)
          return
        commit(TYPES.SET_ITEMS_COUNT, newPagesCount)
      },
      updateItems({ commit, state }, newItems) {
        if (newItems && newItems !== state.items)
          commit(TYPES.SET_ITEMS, newItems)
      },
      clearAll({ commit }) {
        commit(TYPES.SET_SEARCH_QUERY)
        commit(TYPES.CLEAR_FILTERS)
      },
      updateSortData({ commit }, {sortBy, sortDesc}) {
        commit(TYPES.SET_SORT_BY, sortBy)
        commit(TYPES.SET_SORT_DESC, sortDesc)
      },
      setShowColors({commit, getters}, showColors) {
        if (getters.showColors !== showColors) {
          commit(TYPES.SET_SHOW_COLORS, showColors)
        }
      }
    }
  })
}

export default createStore
