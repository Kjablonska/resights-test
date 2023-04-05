import * as TYPES from '../store/mutationTypes'
import {DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE} from '../store'

export default function ({ store, route }) {
    const queryParams = route.query
    const queryParamsPage = parseInt(queryParams.page)
    const page = isNaN(queryParamsPage) ? DEFAULT_PAGE : queryParamsPage
    store.commit(TYPES.SET_PAGE_NUMER, page)

    const queryParamsItemsPerPage = parseInt(queryParams.itemsPerPage)
    const itemsPerPage = isNaN(queryParamsItemsPerPage) ? DEFAULT_ITEMS_PER_PAGE : queryParamsItemsPerPage
    store.commit(TYPES.SET_ITEMS_PER_PAGE, itemsPerPage)

    store.commit(TYPES.SET_SEARCH_QUERY, queryParams.search)
    setFilters(store, queryParams)
    setSortData(store, queryParams)
}

function setFilters(store, queryParams) {
    const filters = {}
    if (queryParams.gender)
        filters['gender'] = parseFilterData(queryParams.gender)
    if (queryParams.year)
        filters['year'] = parseFilterDataToNumber(queryParams.year)
    if (queryParams.country)
        filters['country'] = parseFilterData(queryParams.country)
    if (queryParams.color)
        filters['color'] = parseFilterData(queryParams.color)
    if (queryParams.sales)
        filters['sales'] = parseFilterData(queryParams.sales)

    store.commit(TYPES.SET_FILTERS, filters)
}

function parseFilterData(queryParamFilter) {
    return Array.isArray(queryParamFilter) ? queryParamFilter : [queryParamFilter]
}

function parseFilterDataToNumber(queryParamFilter) {
    return Array.isArray(queryParamFilter) ? queryParamFilter.map(Number) : [parseInt(queryParamFilter)]
}

function setSortData(store, queryParams) {
    let sortBy = []
    let sortDesc = false
    if (queryParams.sortBy) {
        sortBy = queryParams.sortBy
        sortBy = Array.isArray(sortBy) ? sortBy : [sortBy]
    }
    if (queryParams.sortDesc) {
        sortDesc = queryParams.sortDesc === "true"
    }

    store.dispatch('updateSortData', {sortBy, sortDesc})
}
