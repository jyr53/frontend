<template>
  <tr class="grey lighten-3">
    <td>
      Filtre
    </td>
    <td v-for="header in headers" :key="header.value">
      <div v-if="filters.hasOwnProperty(header.value)">
        <v-select
          :items="columnValueList(header.value)"
          flat
          hide-details
          small
          multiple
          validate-on-blur
          clearable
          chips
          @change="changeCurrentFilterValues($event, header.value)"
        >
          <template v-slot:item="data">
            <DatatableOptionsFilter :texte="data.item" />
          </template>
          <template v-slot:selection="{ item, index }">
            <DatatableSelectionsFilter :texte="item" />
          </template>
        </v-select>
      </div>
    </td>
  </tr>
</template>
<script>

export default {
  name: 'FiltersInTable',
  props: {
    headers: {
      type: Array,
      required: true,
    },
    valuesList: {
      type: Array,
      required: true,
    },
    currentSearch: {
      type: String,
      required: true,
    },
    filters: {
      type: Array,
      required: true,
    },
    searches: {
      type: Array,
      required: true,
    },
    hasFilters: {
      type: Boolean,
      required: true,
    },
    hasFiltersValues: {
      type: Boolean,
      required: true,
    },
  },
  data: function() {
    return {
      filterValueTable: [],
    }
  },
  methods: {
    changeCurrentFilterValues(e, val) {
      const currentFiltersValues = []
      this.filterValueTable[val] = e
      Object.keys(this.filterValueTable).forEach(filter => {
        currentFiltersValues[filter] = this.filterValueTable[filter]
      })
      this.$emit('onFilter', currentFiltersValues)
    },
    columnValueList(val) {
      return this.valuesList
        .filter(data => {
          let isInData = false
          if (
            this.currentSearch == null ||
            this.currentSearch === ''
          ) {
            isInData = true
          } else {
            this.searches.forEach(search => {
              if (
                data[search]
                  .toLowerCase()
                  .indexOf(this.currentSearch.toLowerCase()) !== -1
              ) {
                isInData = true
              }
            })
          }
          return isInData
        })
        .filter(data => {
          let isInData = false
          if (!this.hasFilters || !this.hasFiltersValues) {
            isInData = true
          } else {
            Object.keys(this.filterValueTable).forEach(filter => {
              if (val === filter) {
                isInData = true
              }
              this.filterValueTable[filter].forEach(filtervalue => {
                if (data[filter].indexOf(filtervalue) !== -1) {
                  isInData = true
                }
              })
            })
          }
          return isInData
        })
        .map(d => d[val])
    },
  },
}
</script>
