<script>
import Aside from  "@/components/Aside.vue";
import Main from  "@/components/Main.vue";
export default {
  components: {
    Aside,
    Main,
  }
}

</script>

<template>
	<Aside />
	<Main />
</template>

<style>
    * {
          padding: 0;
          margin: 0;
          list-style: none;
          text-decoration: none;
          font-family: sans-serif;
    }
	img {
		vertical-align: middle;
	}
	h3 {
		color: azure;
		font-size: 50px;
	}
	h4 {
		font-size: 22px;
		text-align: center;
	}
</style>