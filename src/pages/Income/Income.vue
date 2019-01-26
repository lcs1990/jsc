<template>
	<div style="height: 100%;overflow: scroll;" ref="incomeWrap">

		<div class="lcs-date-select-wrap" :class="{showDateSelect : isShowDateSelect}">
			<div class="lcs-popup-header">
				<div class="lcs-popup-header-left" @click="isShowDateSelect=false">取消</div>
				<div class="lcs-popup-header-title">请选择日期</div>
				<div class="lcs-popup-header-right" @click="handelDate">确定</div>
			</div>
			<inline-calendar v-model='datevalue' @on-change="changeDate" :disable-future='true' start-date="2017-01-01"></inline-calendar>

		</div>

		<div class="box-0-wrap">
			<div class="box-0">
				<div class="label-0">
				
					<span class="date-0"  @click="isShowDateSelect=!isShowDateSelect">
						<img src="../../../static/images/app/date.svg" alt="" class="time-svg"/>
					
					<span v-for="(item,index) in dateRang2" :key="index">{{item}} </span>

					</span>
				</div>
			
				<div class="box-2-wrap">
					<div class="p-3">
						<div class="p-4" style="padding: 10px 0;position: relative;">
							<div style="" class="unit-box-1">
								单位:<span v-if="this.$route.params.id != 'xjp'"> 元</span><span v-if="this.$route.params.id == 'xjp'"> 新加坡元</span>
							</div>
							<div>
								<flexbox :gutter="0" wrap="wrap" style="margin: 20px 0 0 0 ;">
									<flexbox-item :span="1/2" class="box-00">
										<span class="p-5" style="position: relative;">收入数据</span>
										<p class="p-2">
											<countup :start-val="0" :end-val="tipData.data.total" :duration="0.5" :decimals="2"></countup>
										</p>
									</flexbox-item>
									<flexbox-item :span="1/2" class="box-00">
										<span class="p-5" style="position: relative;">退费</span>
										<p class="p-2">
											<countup :start-val="0" :end-val="tipData.data.refund" :duration="0.5" :decimals="2"></countup>
										</p>
									</flexbox-item>
								</flexbox>
							</div>
						</div>
						<flexbox :gutter="0" wrap="wrap" class="box-1">
							<flexbox-item :span="1/3" class="box-00" v-for="(item,index) in this.tipData.data.data" :key="index">
								<p class="p-1">{{item.code}}</p>
								<p class="p-2">
									<countup :start-val="0" :end-val="item.count" :duration="0.3" :decimals="2"></countup>
								</p>
							</flexbox-item>
						</flexbox>
					</div>
				</div>
			</div>
		</div>

		<div class="box-0-wrap">
			<div class="box-3">
				<div ref="myChart3" :style="{width: '100%', height: '400px'}"></div>
			</div>
		</div>
		<Footer/>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import F2 from '@antv/f2/lib/index-all'
	import Footer from '@/components/Footer'
	import {Countup,Flexbox,FlexboxItem,Datetime,Group,InlineCalendar,Calendar} from 'vux'
	//import {PIE} from '@/assets/lcs1.js'
	import { BAR_DAILY, INCOME } from '@/charts/echarts'
	import req from '@/http/axios'
	import {compare,DateMinus} from '@/tools'
	import config from '@/config'
	//import {dtdata} from '@/lcstest/data.js'
	export default {
		components: {
			Countup,
			Flexbox,
			FlexboxItem,
			Datetime,
			Group,
			InlineCalendar,
			Calendar,
			Footer
		},
		data() {
			return {
				isShowDateSelect: false,
				datevalue: [],
				dateRang: [],
				dateRang2: [],
				isDateClicked: false,
				pie: null,
				pie2: null,
				tipData: {
					data: {
						total: 0,
						refund:0,
						data: [],
						
					}
				},
				totalPatient: 0,
				totalVisit: 0,
				hospitalName: '',
				dateTypeName: '',
				dateRang: '',
				fetch: false,
			}
		},
		methods: {
			DRAWPIE(name, id, data) {
				var _this = this;
				//var data = ;
				if(this[name] != null) {
					this[name].clear()
				}

				this[name] = new F2.Chart({
					id: id,
					pixelRatio: window.devicePixelRatio
				});
				this[name].source(data);
				this[name].coord('polar', {
					transposed: true,
					radius: 0.6,
					innerRadius: 0.45
				});
				this[name].axis(false);
				this[name].legend(false);
				this[name].tooltip(false);
				this[name].interval().position('type*count').adjust('stack').color('code', ['#5980e6', '#46c7e0', '#f3865d',
					'#edb23a', '#f04864', '#facc14', '#97e0ad', '#13c2c2', '#8543e0', '#808080', '#ff7200'
				]);
				this[name].pieLabel({
					sidePadding: 20,
					activeShape: true,
					label1: function label1(data) {
						return {
							text: data.count + ' 人次',
							fill: '#343434',
							fontWeight: 'bold',
							padding: 5
						};
					},
					label2: function label2(data) {
						let lcs1 = ""
						if(data.lcs1) {
							lcs1 = " 治疗:" + data.lcs1
						}
						let lcs2 = ""
						if(data.lcs2) {
							lcs2 = " 新增:" + data.lcs2
						}
						return {
							text: data.code + lcs1 + lcs2,
							fill: '#999',
							fontWeight: 'bold',
						};
					},
					onClick: function onClick(ev) {
						var data = ev.data;
//						if(data) {
//							console.log(data)
//							_this.$refs[id + 'Title'].childNodes[0].nodeValue = data.code;
//							_this.$refs[id + 'Text'].childNodes[0].nodeValue = data.count;
//						}
					}
				});
				this[name].render();
			},
			lcs_draw(el, option) {
				var _this = this;
				let Chart = echarts.init(this.$refs[el]);
				Chart.clear();
				Chart.setOption(option, true);
				//Chart.on('click', function(params) {
				//console.log(params)
				//});
			},
			getData(url, params) {
				this.$vux.loading.show({
					text: 'Loading'
				})
				return req.get(url, params).then((res) => {
					if(res.data.code == 200) {
						return res.data.data
					} else {
						this.$vux.toast.show({
							text: '获取数据失败',
							type: 'warn'
						})
					}
				})
			},
			initToolTip() {
				this.$refs['mountNodeTitle'].childNodes[0].nodeValue = '';
				this.$refs['mountNodeText'].childNodes[0].nodeValue = '';
				this.$refs['mountNode2Title'].childNodes[0].nodeValue = '';
				this.$refs['mountNode2Text'].childNodes[0].nodeValue = '';
			},

			handleDt(attr) {
				//设置时间
				this.dateRang2 = this.$store.getters.getIncomeDtData[attr].dateRang;
				console.log(this.$store.getters.getIncomeDtData[attr].pie1Data)
				this.$set(this.tipData, 'data', this.$store.getters.getIncomeDtData[attr].pie1Data)

				let p0 = new Promise((resolve, reject) => {
					let obj1 = this.$store.getters.getIncomeDtData[attr].chart1;
					let obj2 = {};
//					if(attr != 'week' || (DateMinus(this.dateRang2[0],this.dateRang2[1])>30) ) { //当不是周，或者指定时间差30天时，不显示收入的label了，因为显示label会密密麻麻
//						obj2 = {
//							labelShow: 'no'
//						};
//					}
					let lcs2 = new BAR_DAILY({ ...obj1,
						...obj2
					});
					resolve(lcs2);
				});
				p0.then((data) => {
					this.lcs_draw('myChart3', data.option)
				});
				
				
				let p1 = new Promise((resolve, reject) => {
					let obj1 = this.$store.getters.getIncomeDtData[attr].chart1;
					let obj2 = {};
					let lcs2 = new INCOME({ ...obj1,
						...obj2
					});
					resolve(lcs2);
				});
				p1.then((data) => {
					//console.log(data)
					//this.lcs_draw('myChart3', data.option)
				});
				
			},
			handleSh(attr) {
				//设置时间
				this.dateRang2 = this.$store.getters.getIncomeShData[attr].dateRang;
				this.$set(this.tipData, 'data', this.$store.getters.getIncomeShData[attr].pie1Data);
				
				let p0 = new Promise((resolve, reject) => {
					let obj1 = this.$store.getters.getIncomeShData[attr].chart1;
					let obj2 = {};
//					if(attr != 'week' || (DateMinus(this.dateRang2[0],this.dateRang2[1])>30) ) { //当不是周，或者指定时间差30天时，不显示收入的label了，因为显示label会密密麻麻
//						obj2 = {
//							labelShow: 'no'
//						};
//					}
					let lcs2 = new BAR_DAILY({ ...obj1,
						...obj2
					});
					resolve(lcs2);
				});
				p0.then((data) => {
					this.lcs_draw('myChart3', data.option)
				})
			},
			handleXjp(attr) {
				//设置时间
				this.dateRang2 = this.$store.getters.getIncomeXjpData[attr].dateRang;
			
				this.$set(this.tipData, 'data', this.$store.getters.getIncomeXjpData[attr].pie1Data)

				let p0 = new Promise((resolve, reject) => {
					let obj1 = this.$store.getters.getIncomeXjpData[attr].chart1;
					let obj2 = {};
//					if(attr != 'week' || (DateMinus(this.dateRang2[0],this.dateRang2[1])>30) ) { //当不是周，或者指定时间差30天时，不显示收入的label了，因为显示label会密密麻麻
//						obj2 = {
//							labelShow: 'no'
//						};
//					}
					let lcs2 = new BAR_DAILY({ ...obj1,
						...obj2
					});
					resolve(lcs2);
				});
				p0.then((data) => {
					this.lcs_draw('myChart3', data.option)
				})

			},
			lcs1(attr) {
				var _this = this;
				if(this.$route.params.id == 'dt' && this.$route.name == 'income') {

					if(this.$store.getters.getIncomeDtData[attr].chart1.dailyData != '' && !this.fetch) {
						this.handleDt(attr);
						
					} else {
					
						this.getData('api/bills', {
							hospitalCode: config.hospitalCode.filter((item) => {
								return item.name == _this.$route.params.id
							})[0].label,
							dateType: attr,
							startTime: _this.dateRang[0] || '',
							endTime: _this.dateRang[1] || _this.dateRang[0] || ''
						}).then((res) => {
							let obj1 = res;
							let obj2 = {
								'dateType': attr
							}
							this.$store.dispatch('setIncomeDt', { ...obj1,
								...obj2
							})
							this.handleDt(attr);
							this.$vux.loading.hide();
							this.dateRang = []
							this.fetch = false;
						})
					}

				} else if(this.$route.params.id == 'sh' && this.$route.name == 'income') {

					if(this.$store.getters.getIncomeShData[attr].chart1.dailyData != '' && !this.fetch) {
						
						this.handleSh(attr);
					} else {
						
						this.getData('api/bills', {
							hospitalCode: config.hospitalCode.filter((item) => {
								return item.name == _this.$route.params.id
							})[0].label,
							dateType: attr,
							startTime: _this.dateRang[0] || '',
							endTime: _this.dateRang[1] || _this.dateRang[0] || ''
						}).then((res) => {
							let obj1 = res;
							let obj2 = {
								'dateType': attr
							}
							this.$store.dispatch('setIncomeSh', { ...obj1,
								...obj2
							})
							this.handleSh(attr);
							this.$vux.loading.hide()
							this.fetch = false;
							this.dateRang = []
						})
					}
				} else if(this.$route.params.id == 'xjp' && this.$route.name == 'income') {
					if(this.$store.getters.getIncomeXjpData[attr].chart1.dailyData != '' && !this.fetch) {
						this.handleXjp(attr);
						
					} else {
						
						this.getData('api/bills', {
							hospitalCode: config.hospitalCode.filter((item) => {
								return item.name == _this.$route.params.id
							})[0].label,
							dateType: attr,
							startTime: _this.dateRang[0] || '',
							endTime: _this.dateRang[1] || _this.dateRang[0] || ''
						}).then((res) => {
							let obj1 = res;
							let obj2 = {
								'dateType': attr
							}
							this.$store.dispatch('setIncomeXjp', { ...obj1,
								...obj2
							})
							this.handleXjp(attr);
							this.$vux.loading.hide();
							this.fetch = false;
							this.dateRang = []
						})
					}

				}
			},
			handleData() {
				//this.initToolTip();
				

				switch(this.$store.getters.getDateType.val) {
					case 'week':
						this.lcs1('week')
						break;
					case 'month':
						this.lcs1('month')
						break;
					case 'year':
						this.lcs1('year')
						break;
				}

			},
		
			
			
			changeDate(val) {
				this.dateRang = [];
				if(val.length > 2) {
					val.shift();
				}
				this.dateRang = val;
			},
			handelDate() {
				this.fetch = true;
				this.isShowDateSelect = false;
				this.dateRang.sort()
				
				this.handleData()
			}
		},
		created() {
			this.$bus.on('LayOutTabEventListen', this.handleData);
		},
		activated() {
			//console.log("activated ii")
			this.handleData()
			//设置滚动距离
			this.$refs.incomeWrap.scrollTop = this.$store.getters.getIncomeScrollTop;
		},
		watch: {
			'$route' (to, from) {
				if(to.name == 'income' && from.name == 'income') {
					this.handleData()
					//console.log("watch i")

				}
			}
		},
		beforeRouteLeave(to, from, next) {
			//记录滚动距离
			this.$store.dispatch('changeIncomeScrollTop', this.$refs.incomeWrap.scrollTop)
			next();
		}

	}
</script>

<style>
	.search-btn {
		position: absolute;
		right: 0;
		top: -4px;
		fill: #999;
	}
	
	.search-btn:hover {
		fill: #04BE02;
		cursor: pointer;
	}
	
	.lcs-popup-header-left {
		padding-left: 15px;
		color: #828282;
	}
	
	.lcs-popup-header-title {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		text-align: center;
		color: #222;
	}
	
	.lcs-popup-header {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		height: 44px;
		line-height: 44px;
		font-size: 16px;
		background-color: #fbf9fe;
	}
	
	.lcs-popup-header-right {
		padding-right: 15px;
		color: #FF9900;
	}
	
	.lcs-date-select-wrap {
		transition: .2s all;
		position: fixed;
		z-index: 999;
		bottom: 0px;
		width: 100%;
		transform: translateY(100%);
	}
	
	.showDateSelect {
		transform: translateY(0);
	}
	.unit-box-1{position: absolute;;top: 13px;left: 50%;transform: translateX(-50%);font-size: 12px;color: #999;}
</style>