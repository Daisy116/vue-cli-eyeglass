<script>
import { ref, watch } from 'vue';
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t, locale } = useI18n();

    watch(locale, (newlocale) => {
      localStorage.setItem("locale", newlocale);
    });

    return {
      t, 
      locale};
  }
}
</script>

<template>
    <div class="banner">
        <div class="message">
            <h3>{{ t("main-h3") }}</h3>
            <p>{{ t("main-p") }}</p>
            <button class="message-btn">{{ t("main-btn") }}</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
	.banner {
		height: 100vh;
		background-size: 100% 100%;
		background-image: url("~@/assets/images/eyeglass3.png");
		
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.banner .message {
		color: azure;
		font-size: 24px;
		text-align: center;
	}
	.message p {
		margin: 25px;
	}
	.message-btn {
		color: black;
		font-size: 20px;
		font-weight: 500;
		border: none;
		border-radius: 16px;
		padding: 15px 75px;
		cursor: pointer;
	}

	// 手機版
	@media screen and (min-width: 0px) and (max-width: 490px) {
		.banner {
			height: 50vh;

			h3 {
				font-size: 25px;
			}
			p {
				font-size: 17px;
			}
		}
		.message-btn {
			padding: 15px 40px;
		}
	}
</style>