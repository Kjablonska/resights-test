import sales from './sales'

const salesResults = sales.results
const dataSize = salesResults.length

export function fetchData(store) {
  const pageNumber = store.getters['currentPageNumber']
  const itemsPerPage = store.getters['itemsPerPage']
  store.dispatch('updateItemsCount', dataSize)

  if (pageNumber < 0) {
    return
  }

  const searchQuery = store.getters['searchQuery']
  const filters = store.getters['filters']
  const sortBy = store.getters['sortBy']
  const sortDesc = store.getters['sortDesc']
  let newItems = salesResults

  if (searchQuery && searchQuery !== '') {
    newItems = searchBy(searchQuery, salesResults)
  }
  if (Object.keys(filters).length !== 0) {
    newItems = filterBy(filters, newItems)
  }
  if (sortBy.length !== 0) {
    newItems = sortData(sortBy, sortDesc, newItems)
  }

  store.dispatch('updateItemsCount', newItems.length)
  newItems = paginateData(pageNumber, itemsPerPage, newItems)
  store.dispatch('updateItems', newItems)
}

export function sortData(sortBy, sortDesc, items) {
  const sortedItems = [...items].sort((a, b) => {
    if (!sortDesc) {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
    } else {
      if (a[sortBy] > b[sortBy]) {
        return -1;
      }
    }
  });
  return sortedItems
}

export function filterBy(filters, items) {
  const filteredItems = []
  items.forEach((item) => {
    let keysNumber = 0
    let hasAllKeys = 0
    for (const key in filters) {
      keysNumber++
      const value = filters[key]
      if (!value || value.length == 0) {
        return
      }
      value.forEach((val) => {
        if (item[key] === val) {
          hasAllKeys++;
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

function paginateData(pageNumber, itemsPerPage, items) {
  if (!items)
    return []
  const { start, end } = findStartAndEnd(pageNumber, itemsPerPage)
  return items.slice(start, end)
}

function findStartAndEnd(pageNumber, itemsPerPage, itemsSize = dataSize) {
  const start = (pageNumber - 1) * itemsPerPage
  let end = start + itemsPerPage
  end = end > itemsSize ? itemsSize : end

  return { start, end }
}

export function searchBy(searchPhrase, items) {
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

