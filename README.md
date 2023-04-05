# resights-test

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Features
### Filters
There are available filters:
- Gender
- Year
- Sales
- Country
- Color

By clicking on a filter, the user is presented with a dropdown menu with all available options.

Filters are implemented as "OR" data - meaning that the user is always displayed all possible options for the whole dataset, not for the currently filtered/searched dataset.

Filters can be removed by clicking "X" button that appears once the filter is selected or clicking "Clear All" button.

### Search
From the user perspective - data search is done by typing the search query in and clicking "Search" button.

Search is performed by all data keys available in the dataset.

Search can be removed by clicking "X" button that appears once the user types search key or clicking "Clear All" button.

### Sort
There are two two sorting data:
- sortBy
- sortDesc
Sort is performed by clicking on the column header - first click triggers sorting by the given key (column header) in ascending order, second click triggers sorting in descending order, third click removes sorting and table is back to the state before sorting.

Headers excluded from sort:
- Title
- First name
- Last name

### Clear All button
Clear All button clears all page settings to default:
- no filters, 
- no search, 
- no sort, 
- page number set to 1
- rows per page set to 10 

### Show colors
Colors are not included into the table. Although, checking the "Show colors" checkboks toggles coloring rows based on the color value. Moreover, table can be filtered by the color.

## Data flow
Route parameters are used to control page settings. On settings change, route params are upated and consequently - router middleware `routeHandler` is called. Route middleware sets store values based on the query parameters.

In case of data table this is useful functionality as reloading the page, saving or sending the page to the other user will keep the settings.

## Future work
First of all, the solution works under the assumption that provided data is correct. This could be improved by adding more data verification and error handling. Moreover, the test coverage should be improved.

Possible behaviour improvements
- Search: right now, the table does not display all data headers (for instance ip_address) but the search is performed by all data keys. This might be confusing to the user. Possible solution could be to add all missing headers or search only by the dispayed keys.


## Instructions

```
At Resights we do not only collect a lot of data - we also spend a lot of time structuring and visualizing data.
For that reason, we often spend a lot of time figuring out how to communicate data in the best way.
A very important task for the front-end.

This task will therefore contain a heavily used component at Resights: A DataTable.

You task is therefore, to make the default Vuetify DataTable as usable as possible for the user.

We have only few requirements:
 - It must be possible to filter columns in the table, e.g. Gender-column
 - It must be possible to search records from the table
 - It must be possible to paginate the table. Unfortunatelty, the dataset is 1.000 entries, so we can not load all at once, so you must do server-side pagination.
 - Styling the datatable to communicate data to the user with as little friction as possible.


Besides the mentioned requirements, we appreciate any efforts and suggestions on improvements.


Less is more... Never do something just to do something...
```