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
		const openModal = () => {
			// console.log("打開菜單")
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
			goTop, goSearch, openModal,
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
		<div class="phone-menu" @click="openModal" data-bs-toggle="modal" data-bs-target="#exampleModal">
			<i class="bi bi-grid-3x3-gap"></i>
		</div>
		<div>
			<a href="https://line.me/ti/p/~@ymapp" target="_blank">
				<img src="~@/assets/images/line.png" alt="line logo">
			</a>
		</div>
	</div>
	<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="title">
						<span>切換語系：</span>
						<select v-model="locale">
							<option>中文</option>
							<option>English</option>
							<option>日語</option>
						</select>
					</div>
					<div >
						<span>調整文字大小：</span>
						<span class="hover-tip" @click="$emit('enlarge-text')">A+</span>
						<span class="hover-tip" @click="$emit('smaller-text')">A-</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 導覽列下面的畫面 -->
  	<router-view />

	<!-- 頁尾 -->
	<Footer />
</template>

<style lang="scss">
	select {
		outline: none;
	}

	.goTop {
		height: 140px;
		position: fixed;
		right: 20px;
		bottom: 90px;
		z-index: 102;

		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		> div {
			width: 40px;
			height: 40px;
			background-color: black;
			border-radius: 10px;
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
	
	.phone-menu {
		// PC版
		@media screen and (min-width: 490px) {
			display: none;
		}
		// 手機版
		@media screen and (min-width: 0px) and (max-width: 490px) {
			display: block;
		}
	}
	.modal-body {
		div {
			margin: 10px 0;

			span {
				font-weight: 300;
    			font-size: large;
			}
		}
	}
	.hover-tip {
		margin-right: 10px;
		padding: 2px 10px;
		background-color: black;
		color: white;
		border-radius: 13px;
		user-select: none;
	}
</style>
