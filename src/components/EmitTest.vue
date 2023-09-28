<script>
import { onMounted, ref } from 'vue';
export default {
    emits: {
        TimeOut: (num)=> {
            // if (num.value === 0) {
            //     return true;
            // }else {
            //     return false;
            // }

            return num.value === 0;
        },        
    },
    setup(props, {emit}) {
        const num = ref(5);
        let timer = null;

        onMounted(()=> {
            timer = setInterval(()=> {
                num.value--;
                if (num.value === 0) {
                    clearInterval(timer);

                    // 當計時器歸零，要回傳emit給父層!
                    emit('TimeOut', num);
                }
            }, 500);
            // context.emit('CallBack', num);
        })

        return {num};
    }
}
</script>

<template>
    <h1>{{num}}</h1>
</template>

<style scoped>
    h1 {
        color: brown;
        font-size: 50px;

        margin: 50px;
    }
</style>