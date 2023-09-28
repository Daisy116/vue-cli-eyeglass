<script>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const course = reactive({data: {}});
    const isError = ref(false);
    let timer = null;

    onMounted(()=> {
        axios.get(`https://api.hiskio.com/v2/courses/${route.params.id}?coupon_code=&p=`)
        .then(res=> {
            course.data = res.data;
            // console.log("course", course.data);
        })
        .catch(error=> {
          isError.value = true;
          course.data["error_message"] = error.response.data.message;
          // console.log(error.response.data);

          // 用setTimeout設定三秒鐘之後，導轉到其他網頁！
          timer = setTimeout(()=> {
            // 指定到「/course」這個path
            // router.push({path: "/course"});

            // 指定回上一頁！！！
            router.go(-1);
          }, 2000);
        })
    });
    // 生命週期的「onUnmounted」代表當使用者離開這個component頁面，會執行onUnmounted
    onUnmounted(()=> {
      clearTimeout(timer);
    });

    return {course, isError};
  },
};
</script>
<template>
  <div>
    <div v-if="!isError">
      <h1>{{course.data.headline}}</h1>
      <h2>NTD:{{course.data.price}}</h2>
      <img :src="course.data.image" alt="" />
      <div v-if="Object.keys(course.data).length !== 0">
        <img :src="course.data.blur" alt="" />
        <p>{{course.data.lecturers[0].description}}</p>
      </div>
    </div>
    <!-- 以下是給error_message使用的！ -->
    <h1 v-if="isError">
      {{course.data.error_message}}
    </h1>
  </div>
</template>

<style lang="scss" scoped>
p {
  color: aliceblue;
}
</style>
