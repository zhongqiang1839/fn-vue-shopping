<template>
    <li :sort-type="sortType" :sort-order="sortOrder" :sort-name="sortName">
        <a href="javascript:;">{{sortName}}</a>
    </li>
</template>
<style>
</style>
<script>
    export default{
        props: {
            sortType: [String, Number],
            sortOrder: [String, Number],
            sortName: String
        }

    }
</script>
