<template>
	<div>
		<div style="position: fixed;top: 0;z-index: 999;width: 100%;">
			<x-header :left-options="{showBack: false}">{{this.title}}
				
				 <img src="../../static/images/app/shuaxin.svg" style="position:absolute;top:15px;left:14px;width: 18px;" @click="reload"/>
				<a slot="right" @click="showMenus = true" v-if="this.$route.name!='yesterday'">{{this.$store.getters.getDateType.label}}</a>
			</x-header>
			<tab>
				<tab-item v-for="(item,index) in tabData" :key="index" :selected="index==tabSelectedIndex" @on-item-click="tabClick(item)">{{item.label}}</tab-item>
			</tab>
		</div>
		<div style="margin-top: 90px;height: 100%;width: 100%;">
			<keep-alive>
				<router-view />
			</keep-alive>
		</div>
		

		<tabbar>
			<tabbar-item v-for="(item,index) in tabbarData" :key="index" @on-item-click="tabItemClick(item)" :selected='index == tabbarSelectedIndex'>
				<img slot="icon" :src="item.src">
				<span slot="label">{{item.label}}</span>
			</tabbar-item>
		</tabbar>
		<div>
			<actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="handleChangeDateType"></actionsheet>
		</div>
	</div>
</template>

<script>
	import req from '@/http/axios'
	import {
		Tabbar,
		TabbarItem,
		Group,
		Cell,
		Tab,
		TabItem,
		XHeader,
		Actionsheet,
		TransferDom,
		ButtonTab,
		ButtonTabItem
	} from 'vux'
	export default {
		data() {
			return {
				tabSelectedIndex: 0,
				tabbarSelectedIndex: 0,
				htype: '',
				dtype: '',
				showMenus: false,

				menus: {
					week: '周报',
					month: '月报',
					year: '年报'
				},
				tabbarData: [{
						label: '就诊数据',
						src: './static/images/app/2.png',
						type: 'visit'
					},
					{
						label: '昨日快报',
						src: 'static/images/app/4.png',
						type: 'yesterday'
					},
					{
						label: '收入数据',
						src: 'static/images/app/1.png',
						type: 'income'
					}
				],
				tabData: [{
						label: '大同美中嘉和',
						type: 'dt'
					},
					{
						label: '上海肿瘤门诊部',
						type: 'sh'
					},
					{
						label: '新加坡泰和国际肿瘤医院',
						type: 'xjp'
					}
				],
				title: '',
			}
		},
		components: {
			Tabbar,
			TabbarItem,
			Group,
			Cell,
			Tab,
			TabItem,
			XHeader,
			Actionsheet,
			ButtonTab,
			ButtonTabItem
		},
		methods: {
			tabItemClick(obj) {
				this.title = obj.label;
				this.dtype = obj.type
				this.goto()
			},
		
			tabClick(obj) {
				this.htype = obj.type
				this.goto()
			},
			goto() {
				this.$router.push({
					name: this.dtype,
					params: {
						id: this.htype
					}
				});
			},
			handleChangeDateType(key, menuItem) {
				console.log(key, menuItem)
				if(key != 'cancel') {
					this.$store.dispatch('changeDateType', {
						label: menuItem,
						val: key
					})
					//更改时间类型时，调用别的页面的事件，以更新视图
					this.$bus.emit('LayOutTabEventListen');
				}
			},
			init() {
				//根据路由判断顶部tab的索引，高亮
				switch(this.$route.params.id) {
					case 'dt':
						this.htype = 'dt';
						this.tabSelectedIndex = 0;
						break;
					case 'sh':
						this.htype = 'sh';
						this.tabSelectedIndex = 1;
						break;
					case 'xjp':
						this.htype = 'xjp';
						this.tabSelectedIndex = 2;
						break;
					default:
						return;
				}

				//根据路由判断顶部tabbar的索引，高亮
				switch(this.$route.name) {
					case 'visit':
						this.dtype = 'visit';
						this.tabbarSelectedIndex = 0;
						this.title = '就诊数据';
						break;
					case 'yesterday':
						this.dtype = 'yesterday';
						this.tabbarSelectedIndex = 1;
						this.title = '昨日快报';
						break;
					case 'income':
						this.dtype = 'income';
						this.tabbarSelectedIndex = 2;
						this.title = '收入数据';
						break;
					default:
						return;
				}
			},
			getData(url, params) {
								this.$vux.loading.show({
									text: 'Loading'
								})
				return req.get(url, params).then((res) => {
					if (res.data.code == 200) {
						return res.data.data
					} else {
						this.$vux.toast.show({
							text: '获取数据失败',
							type: 'warn'
						})
					}
				})
			},

			reload(){
				location.reload()
				
			}
		},
		created() {
			this.init()
		}
	}
</script>

<style scoped="scoped">
	.weui-tabbar__item {
		text-decoration: none;
	}
	
	.tabbar-label {
		text-decoration: none;
	}
	
	.active-6-1 {
		color: rgb(252, 55, 140) !important;
		border-color: rgb(252, 55, 140) !important;
	}
</style>