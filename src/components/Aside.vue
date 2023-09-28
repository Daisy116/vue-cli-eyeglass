<script>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import $ from 'jquery';

export default {
  setup() {
	let timer = null;

	onMounted(()=> {
		// let img = document.getElementsByClassName("banner")[0].children;
		let img = document.getElementsByClassName("pc");
		
		// 若當前螢幕大小為手機版
		if (screen.width < 490) {
			img = document.getElementsByClassName("phone");
		}
		img[0].classList.add("banner-active");		


		let i = 0;
		timer = setInterval(()=> {
			resetBannerActive();
			i++;
			if (i >= img.length) {
				i = 0;
			}
			img[i].classList.add("banner-active");
		}, 1500);
		
		function resetBannerActive() {
			for (let i = 0; i < img.length; i++) {
				img[i].classList.remove("banner-active");
			}
		}
    });

	// 當使用者離開這個頁面時，執行clearInterval
	onUnmounted(()=> {
	  clearInterval(timer);
    });

    return {};
  }
}
</script>
<template>
  	<div class="banner">
        <img src="~@/assets/images/eyeglass1.png" class="pc">
        <img src="~@/assets/images/eyeglass2.png" class="pc">
		<img src="~@/assets/images/eyeglass-H51.png" class="phone">
		<img src="~@/assets/images/eyeglass-H52.png" class="phone">
    </div>
</template>

<style lang="scss" scoped>
	.banner {
		display: flex;
		margin-top: 84px;

		img {
			width: 100%;
			display: none;
		}
		img.banner-active {
			display: block;

			animation: fadeInFromNone 1.5s ease-out;
		}
		.phone {
			display: none;
			opacity: 0;
		}
	}
	// 用animate的keyframes製造淡入淡出
	@keyframes fadeInFromNone {
		0% {
			display: block;
			opacity: 0;
		}
		10% {
			display: block;
			opacity: .3;
		}
		100% {
			display: block;
			opacity: 1;
		}
	}

	// 手機版
	@media screen and (min-width: 0px) and (max-width: 490px) {
		.banner {
			margin: 0;

			.phone.banner-active {
				display: block;
			}
			.pc {
				display: none;
			}
		}
	}
</style>