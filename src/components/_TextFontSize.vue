<script setup>
	import { watch } from "vue";
	import { useI18n } from "vue-i18n";

    defineEmits(['enlarge-text', 'smaller-text']);

	// 使用useI18n實作語系切換
	const { t, locale } = useI18n();
	// 用watch監控是否切換了語系
	watch(locale, (newlocale) => {
		localStorage.setItem("locale", newlocale);
	});
</script>

<template>
    <!-- 調整文字大小(只有某些頁面才出現) -->
	<div class="changeFont">
		<div class="hover-tip" @click="$emit('enlarge-text')">
			A+
			<span class="tooltiptext">{{ t("enlarge-text") }}</span>
		</div>
		<div class="hover-tip" @click="$emit('smaller-text')">
			A-
			<span class="tooltiptext">{{ t("smaller-text") }}</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
    .changeFont {
		width: 110px;
		display: flex;
		justify-content: space-between;

		position: fixed;
        top: 94px;
        right: 20px;
		
		font-size: 22px;

		.hover-tip {
			padding: 2px 10px;
			background-color: black;
			border-radius: 8px;
			color: white;
			cursor: pointer;
			user-select: none;  // 點擊時不會反白文字！
			position: relative;
			
			&:hover {
				box-shadow: 0px 0px 10px black;
				.tooltiptext {
					visibility: visible;
				}
			}
			.tooltiptext {
				visibility: hidden;
				width: 120px;
				background-color: gray;
				opacity: .5;
				color: #fff;
				font-size: 18px;
				text-align: center;
				border-radius: 6px;
				padding: 5px 0;
				position: absolute;
				z-index: 1;
				top: 140%;
				right: 10%;

				&::before {
					content: '';
					border-width: 15px;
					border-style: solid;
					border-color: rgba(0,0,0,0) rgba(0,0,0,0) gray rgba(0,0,0,0); /* 上下、左右 */

					position: absolute;
					bottom: 63px;
					right: 2px;
				}
			}
		}
	}
	// 手機版
	@media screen and (min-width: 0px) and (max-width: 490px) {
		.changeFont {
			// display: none;
		}
	}
</style>