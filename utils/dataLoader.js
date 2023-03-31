import sales from '../api/sales'
import * as TYPES from '../store/mutationTypes'

const salesResults = sales.results
const dataSize = salesResults.length

export function fetchData(store) {
    const pageNumber = store.getters['currentPageNumber']
    const itemsPerPage = store.getters['itemsPerPage']
    const pagesCount = dataSize / itemsPerPage
    store.dispatch('updatePagesCount', pagesCount)

    // error?
    if (store.getters['pageNumber'] < 0 || pageNumber > pagesCount) {
        return
    }

    const searchQuery = store.getters['searchQuery']
    let newItems = []
    if (searchQuery && searchQuery !== '') {
        newItems = searchBy(searchQuery, itemsPerPage, pageNumber)
    } else {
        newItems = fetchItems(pageNumber, itemsPerPage)
    }

    store.dispatch('updateItems', newItems)
}

function fetchItems(pageNumber, itemsPerPage) {
    const { start, end } = findStartAndEnd(pageNumber, itemsPerPage)
    return salesResults.slice(start, end)
}

function findStartAndEnd(pageNumber, itemsPerPage, itemsSize = dataSize) {
    const start = (pageNumber - 1) * itemsPerPage // substracting 1 because page starts from 1 but items array starts from 0
    let end = start + itemsPerPage
    end = end > itemsSize ? itemsSize : end

    return { start, end }
}

export function searchBy(searchPhrase, itemsPerPage, pageNumber) {
    // Done to include lower and upper case 
    const searchQuery = searchPhrase.toLowerCase()

    const results = salesResults.filter((item) => {
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
    const { start, end } = findStartAndEnd(pageNumber, itemsPerPage, results.length)
    return results.slice(start, end)
}

function findValue(value, item) {
    const data = []
    for (const [_, value] of Object.entries(item)) {
        if (value === searchPhrase) {
            data.append(item)
        }
    }
    return data
}

export function clearSearch(store) {
    store.commit(TYPES.CLEAR_SEARCH)
    fetchData(store)
}

function filterBy(keyword, filter) {
    return salesResults.filter((item) => item[filter].includes(keyword))
}
