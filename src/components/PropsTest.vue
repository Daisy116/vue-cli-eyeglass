<script>
export default {
    props: {
        str: {
            type: String,
            default: "123",
        },
        bool: {
            type: Boolean,
            default: false,
        },
        num: {
            type: Number,
            default: 0,
        },
        arr: {
            type: Array,
            default: () => [],
        },
        obj: {
            type: Object,
            default: () => ({})
        },
        handleFn: {
            type: Function,
            default: () => {}
        }
    },
    setup(props) {
        return {props};
    }
}
</script>

<template>
  <h1>2023金魚</h1>
  <h1 v-if="props.bool">{{props.str}}</h1>
  <h1>{{props.num + 10}}</h1>
  <ul>
    <li v-for="item in props.arr" :key="item">{{item}}</li>
  </ul>
  <h1>{{props.obj}}</h1>
  <button @click="props.handleFn">按我</button>
</template>

<style>
h1 {
    color: chocolate;
}
ul {
    font-size: 30px;
}
</style>