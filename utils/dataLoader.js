import sales from '../api/sales'
import * as TYPES from '../store/mutationTypes'

const salesResults = sales.results
const dataSize = salesResults.length

export function fetchData(store) {
    const pageNumber = store.getters['currentPageNumber']
    const itemsPerPage = store.getters['itemsPerPage']
    let pagesCount = dataSize / itemsPerPage
    store.dispatch('updatePagesCount', pagesCount)

    // error?
    if (store.getters['pageNumber'] < 0 || pageNumber > pagesCount) {
        return
    }

    const searchQuery = store.getters['searchQuery']
    const filters = store.getters['filters']
    let newItems = null

    // TODO
    if (searchQuery && searchQuery !== '') {
        newItems = searchBy(searchQuery, itemsPerPage, pageNumber, salesResults)
    }
    if (filters.size > 0) {
        newItems = filterBy(filters, newItems ?? salesResults)
    }
    else if (!newItems) {
        // newItems = fetchItems(pageNumber, itemsPerPage)
        newItems = salesResults
    }

    const allItems = newItems.length
    pagesCount = allItems / itemsPerPage
    store.dispatch('updatePagesCount', pagesCount)
    newItems = sliceItems(pageNumber, itemsPerPage, newItems)

    store.dispatch('updateItems', newItems)
}

function sliceItems(pageNumber, itemsPerPage, items) {
    const { start, end } = findStartAndEnd(pageNumber, itemsPerPage)
    return items.slice(start, end)
}

function findStartAndEnd(pageNumber, itemsPerPage, itemsSize = dataSize) {
    const start = (pageNumber - 1) * itemsPerPage // substracting 1 because page starts from 1 but items array starts from 0
    let end = start + itemsPerPage
    end = end > itemsSize ? itemsSize : end

    return { start, end }
}

export function searchBy(searchPhrase, itemsPerPage, pageNumber, items) {
    // Done to include lower and upper case 
    const searchQuery = searchPhrase.toLowerCase()

    const results = items.filter((item) => {
        for (const [_, value] of Object.entries(item)) {
            // Covers "user" object case
            if (typeof value === 'object') {
                for (const [_, data] of Object.entries(value)) {
                    if (data.toLowerCase() === searchQuery) {
                        return item
                    }
                }
            }
            else if (value.toString().toLowerCase() === searchQuery) {
                return item
            }
        }
    })
    return results
}

export function clearSearch(store) {
    store.commit(TYPES.CLEAR_SEARCH)
    fetchData(store)
}

export function clearSearchQuery(store) {
    store.commit(TYPES.CLEAR_SEARCH_QUERY)
    fetchData(store)
}

export function filterBy(filters, items) {
    const itemsToFilter = items ?? salesResults
    const filteredItems = []
    itemsToFilter.forEach((item) => {
        let keysNumber = 0
        let hasAllKeys = 0
        for (const [key, value] of filters.entries()) {
            keysNumber++
            value.forEach((val) => {
                if (item[key] === val) {
                    hasAllKeys++;
                    return
                }
            })
        }
        if (keysNumber === hasAllKeys) {
            filteredItems.push(item)
        }
    })

    return filteredItems
}

export function getAllUniqueValues(keyword) {
    const keywordValues = salesResults.map((item) => item[keyword])
    return [...new Set(keywordValues)]
}
