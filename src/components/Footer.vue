<template>

	<div style="margin: 20px 0px 170px;">
		<div  style="width: 100%;overflow: hidden;padding: 0 20px;box-sizing: border-box;">

			<flexbox :gutter="0">
				<flexbox-item :span="1/4" class="img-box">
					<x-img default-src="./static/images/app/thc.png" width="100%"></x-img>
				</flexbox-item>
				<flexbox-item :span="1/4" class="img-box">
					<x-img default-src="./static/images/app/mz.png" width="100%"></x-img>
				</flexbox-item>
				<flexbox-item :span="1/4" class="img-box">
					<x-img default-src="./static/images/app/xjp.png" width="100%"></x-img>
				</flexbox-item>
				<flexbox-item :span="1/4" class="img-box">
					<x-img default-src="./static/images/app/md.png" width="100%"></x-img>
				</flexbox-item>
			</flexbox>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>
<style scoped>
	.img-box {
		text-align: center;
	}
	
	.img-box img {
		vertical-align: middle;
	}
</style>