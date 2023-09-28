<script>
export default {

}
</script>

<template>
    <h1>
        <img src="../assets/logo.png" alt="">
        
        <slot></slot>
    </h1>
</template>

<style lang="scss" scoped>
    h1 {
        color: cadetblue;
        font-size: 50px;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
    }
    img {
        display: block;
        width: 40px;
        margin-right: 10px;
    }
</style>