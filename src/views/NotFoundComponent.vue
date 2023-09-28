<script>
export default {

}
</script>

<template>
    <div class="notFound">
        <img class="pic404" src="https://www.life4d.com.tw/images/working.jpg" alt="網站施工中">
    </div>
</template>

<style lang="scss" scoped>
    .notFound {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        margin-top: 84px;
        .pic404 {
            width: 800px;
            padding: 150px 0;
        }
    }

    // 手機版
	@media screen and (min-width: 0px) and (max-width: 490px) {
        .notFound {
            margin-top: 30px;

            .pic404 {
                max-width: 100%;
                padding: 100px 0;
            }
        }
    }
</style>