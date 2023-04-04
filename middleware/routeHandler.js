import * as TYPES from '../store/mutationTypes'

export default function ({ store, route }) {
    const queryParams = route.query
    // TODO: remove magic numbers
    const page = parseInt(queryParams.page ?? '1')
    const itemsPerPage = parseInt(queryParams.itemsPerPage ?? '10')
    store.commit(TYPES.SET_PAGE_NUMER, page)
    store.commit(TYPES.SET_ITEMS_PER_PAGE, itemsPerPage)
    store.commit(TYPES.SET_SEARCH_QUERY, queryParams.search)
    setFilters(store, queryParams)
    setSortData(store, queryParams)
}

function setFilters(store, queryParams) {
    const filters = {}
    if (queryParams.gender)
        filters['gender'] = Array.isArray(queryParams.gender) ? queryParams.gender : [queryParams.gender]
    if (queryParams.year)
        filters['year'] = Array.isArray(queryParams.year) ? queryParams.year.map(Number) : [queryParams.year]
    if (queryParams.country)
        filters['year'] = Array.isArray(queryParams.country) ? queryParams.country : [queryParams.country]
    if (queryParams.color)
        filters['color'] = Array.isArray(queryParams.color) ? queryParams.color : [queryParams.color]
    if (queryParams.sales)
        filters['sales'] = Array.isArray(queryParams.sales) ? queryParams.sales : [queryParams.sales]

    store.commit(TYPES.SET_FILTERS, filters)
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
