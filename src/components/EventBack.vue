<script>
import { onMounted, ref } from 'vue';
export default {
    setup() {
        const handleClick = (num, e) => {
            console.log(num);
            console.log(e.target);
        }

        const textInput = ref(null);
        const num = ref(0);

        onMounted(()=> {
            console.log(textInput);
            textInput.value.focus();
        });
        return {handleClick, textInput, num};
    }
}
</script>

<template>
    <a href="javascript:;" @click="handleClick(100, $event)">點我回傳DOM元素！</a>
    <input 
        v-focus 
        v-model="num"
        ref="textInput" 
        id="textBar" 
        type="text" 
        placeholder="input text">
    <h1 v-price="num"></h1>
</template>

<style lang="scss" scoped>
    a {
        font-size: 40px;
        color: aliceblue;
    }
    input {
        display: block;
        width: 100%;
        height: 30px;
        background-color: rgb(200, 219, 219);
        padding-left: 10px;
    }
</style>