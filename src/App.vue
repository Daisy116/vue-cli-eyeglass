<script>
import { ref, watch } from 'vue';
import { useI18n } from "vue-i18n";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import $ from 'jquery';


export default {
	components: {
		Header,
		Footer
	},
  setup() {
		// 使用useI18n實作語系切換
		const { t, locale } = useI18n();
		// isSearch控制PC的放大鏡搜尋畫面
		const isSearch = ref(true);

		const goTop = () => {
			// 使用jQuery的scrollTop實作置頂功能，並用animate方法慢慢往上移
			$("html, body").animate({scrollTop: 0}, 400);
		};
		const goSearch = () => {
			isSearch.value = !isSearch.value;
		};		

		// 用watch監控是否切換了語系
		watch(locale, (newlocale) => {
			localStorage.setItem("locale", newlocale);
		});
		

		return {
			t, locale,
			isSearch,
			goTop, goSearch
		};
	}
};
</script>

<template>
	<!-- 導覽列 -->
	<Header />

	<!-- 固定在右下角的置頂按鈕和line連結 -->
	<div class="goTop">
		<div @click="goTop">↑</div>
		<div>
			<a href="https://line.me/ti/p/~@ymapp" target="_blank">
				<img src="~@/assets/images/line.png" alt="line logo">
			</a>
		</div>
	</div>

	<!-- 導覽列下面的畫面 -->
  	<router-view/>

	<!-- 頁尾 -->
	<Footer />
</template>

<style lang="scss">
	.goTop {
		position: fixed;
		right: 20px;
		bottom: 90px;

		z-index: 99;

		> div {
			width: 40px;
			height: 40px;
			margin-bottom: 10px;
		}
		> div:first-child {
			background-color: black;
			border-radius: 8px;
			color: #fff;
			line-height: 40px;
			text-align: center;
			font-size: 20px;
			font-weight: 700;
			cursor: pointer;
		}
		img {
			width: 100%;
			height: 100%;
			vertical-align: bottom;
		}
	}
</style>
