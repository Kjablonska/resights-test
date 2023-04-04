import * as TYPES from '../store/mutationTypes'

export default function ({ store, route }) {
    const queryParams = route.query
    const queryParamsPage = parseInt(queryParams.page)
    const page = isNaN(queryParamsPage) ? store.getters['page'] : queryParamsPage
    store.commit(TYPES.SET_PAGE_NUMER, page)

    const queryParamsItemsPerPage = parseInt(queryParams.itemsPerPage)
    const itemsPerPage = isNaN(queryParamsItemsPerPage) ? store.getters['itemsPerPage'] : queryParamsItemsPerPage
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

    store.commit(TYPES.SET_SORT_BY, sortBy)
    store.commit(TYPES.SET_SORT_DESC, sortDesc)
}
