<template>
	<div style="height: 100%;overflow: scroll;" ref="yesterdayWrap">

		<div class="box-0-wrap">
			<div class="box-0">
				<div class="label-0">

					<span class="date-0" @click="isShowDateSelect=!isShowDateSelect">
						<img src="../../../static/images/app/date.svg" alt="" class="time-svg" />
						<span v-for="(item,index) in dateRang2" :key="index">{{item}} </span>
					</span>
				</div>

				<div class="box-2-wrap">
					<div class="p-3">
						<!--<div class="p-4" style="padding: 10px 0;">
							<span class="p-5">就诊人次</p></span>
							<p class="p-2">
								<countup :start-val="0" :end-val="total" :duration="0.3"></countup>
							</p>
						</div>
						-->
						
						<div   v-show="this.$route.params.id == 'sh'">
							<!--<span class="p-5">就诊人次</p></span>
							<p class="p-2">
								<countup :start-val="0" :end-val="total" :duration="0.3"></countup>
							</p>-->						
							<flexbox :gutter="0" wrap="wrap" class="box-1">
								<flexbox-item :span="1/3" class="box-00">
									<div class="p-4" style="padding: 10px 0;">
										<span class="p-5">就诊人次</p></span>
										<p class="p-2">
											<countup :start-val="0" :end-val="total" :duration="0.3"></countup>
										</p>
									</div>
								</flexbox-item>
								<flexbox-item :span="1/3" class="box-00">
									<div class="p-4" style="padding: 10px 0;">
										<span class="p-5">收入</p></span>
										<p class="p-2">
											<countup :start-val="0" :end-val="billTotal" :duration="0.3" :decimals="2"></countup>
										</p>
									</div>
								</flexbox-item>
								<flexbox-item :span="1/3" class="box-00">
									<div class="p-4" style="padding: 10px 0;">
										<span class="p-5">退费</p></span>
										<p class="p-2">
											<countup :start-val="0" :end-val="refund" :duration="0.3" :decimals="2"></countup>
										</p>
									</div>
								</flexbox-item>
							</flexbox>						
						</div>
						
						
						
						
						
						<div v-show="this.$route.params.id !== 'sh'">
							<flexbox :gutter="0" wrap="wrap" class="box-1">
								<flexbox-item :span="1/4" class="box-00">
									<div class="p-4" style="padding: 10px 0;">
										<span class="p-5">就诊人次</p></span>
										<p class="p-2">
											<countup :start-val="0" :end-val="total" :duration="0.3"></countup>
										</p>
									</div>
								</flexbox-item>
								<flexbox-item :span="1/4" class="box-00">
									<div class="p-4" style="padding: 10px 0;">
										<span class="p-5">床天数</p></span>
										<p class="p-2" v-show="this.$route.params.id == 'dt'">
											<countup :start-val="0" :end-val="totalDays" :duration="0.3" :decimals="0"></countup>
										</p>
										<p class="p-2" v-show="this.$route.params.id == 'xjp'">
											<countup :start-val="0" :end-val="totalDays" :duration="0.3" :decimals="1"></countup>
										</p>
									</div>
								</flexbox-item>
								<flexbox-item :span="1/4" class="box-00">
									<div class="p-4" style="padding: 10px 0;">
										<span class="p-5">收入</p></span>
										<p class="p-2">
											<countup :start-val="0" :end-val="billTotal" :duration="0.3" :decimals="2"></countup>
										</p>
									</div>
								</flexbox-item>
								<flexbox-item :span="1/4" class="box-00">
									<div class="p-4" style="padding: 10px 0;">
										<span class="p-5">退费</p></span>
										<p class="p-2">
											<countup :start-val="0" :end-val="refund" :duration="0.3" :decimals="2"></countup>
										</p>
									</div>
								</flexbox-item>
							</flexbox>
						</div>
						
						
						<flexbox :gutter="0" wrap="wrap" class="box-1">
							<flexbox-item :span="1/3" class="box-00" v-for="(item,index) in this.tipData" :key="index">
								<p class="p-1">{{item.code}}</p>
								<p class="p-2">
									<countup :start-val="0" :end-val="item.count" :duration="0.5"></countup>
								</p>
							</flexbox-item>
						</flexbox>
					</div>
					
					
					
					
				</div>
			</div>
		</div>

		<div class="box-0-wrap">
			<div class="box-3 " style="background: #fff;position: relative;" ref="lcs_box">
				<p style="line-height: 30px;font-size: .8em;color: #414141;padding: 0 10px;border-bottom: 1px solid rgba(0,0,0,.1);">就诊类型统计</p>
				<canvas id="mountNode" style="height: 240px;width: 100%;"></canvas>
				<div style="position: absolute;left: 50%;top: 154px;transform: translateX(-50%);">
					<p ref='mountNodeTitle' style="text-align: center;font-size: 1em;">&nbsp;</p>
					<p ref='mountNodeText' style="text-align: center;font-size: 1em;font-family: impact;padding: 5px;">&nbsp;</p>
				</div>
			</div>
		</div>


		<div class="box-0-wrap" v-show="this.$route.params.id == 'dt'">
			<div class="box-3 " style="background: #fff;position: relative;">
				<p style="line-height: 30px;font-size: .8em;color: #414141;padding: 0 10px;border-bottom: 1px solid rgba(0,0,0,.1);">科室统计</p>
				<canvas id="mountNode2" style="height: 240px;width: 100%;" ref="mountNode2"></canvas>
				<div style="position: absolute;left: 50%;top: 166px;transform: translateX(-50%);">
					<p ref='mountNode2Title' style="text-align: center;font-size: 1em;">&nbsp;</p>
					<p ref='mountNode2Text' style="text-align: center;font-size: 1em;font-family: impact;padding: 5px;">&nbsp;</p>
				</div>
			</div>
		</div>

		<div class="box-0-wrap">
			<div class="box-3">
				<div ref="myChart3" :style="{width: '100%', height: '400px'}"></div>
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
	import echarts from 'echarts'
	import F2 from '@antv/f2/lib/index-all'
	import Footer from '@/components/Footer'
	import {
		Countup,
		Flexbox,
		FlexboxItem,
		Datetime,
		Group,
		InlineCalendar,
		Calendar
	} from 'vux'
// 	import {
// 		PIE
// 	} from '@/assets/lcs1.js'
	import {
		BAR_DAILY,
		
	} from '@/charts/echarts'
	import req from '@/http/axios'
	import {
		getYesterday,
		compare
	} from '@/tools'
	import config from '@/config'
// 	import {
// 		dtdata
// 	} from '@/lcstest/data.js'
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
				searchStartTime: '2018-01-01',
				searchEndTime: '2018-01-07',
				isDateClicked: false,
				pie: null,
				pie2: null,
				tipData: {
					data: {
						total: 0,
						data: []
					}
				},
				totalPatient: 0,
				totalVisit: 0,
				hospitalName: '',
				dateTypeName: '',
				dateRang: '',
				fetch: false,
				total: 0,
				totalDays:0,
				tipData: [],
				billTotal:0,
				refund:0,
			}
		},
		methods: {
			DRAWPIE(name, id, data) {
				//console.log(data)
				
				var _this = this;
				//var data = ;
				if (this[name] != null) {
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
				this[name].legend('code', {
					position: 'top',
					align: 'center',
					clickable:false
				});
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
						//console.log(data)
						let lcs1 = ""
						if (data.lcs1) {
							lcs1 = " 新增:" + data.lcs1
						}
						let lcs2 = ""
						if (data.lcs2) {
							lcs2 = " 治疗:" + data.lcs2
						}
						let lcs3 = ""
						if (data.lcs3) {
							lcs3 = " 门诊:" + data.lcs3
						}
						let lcs4 = ""
						if (data.lcs4) {
							lcs4 = " 住院:" + data.lcs4
						}
						let treatmentNum = "";
						if(data.treatmentNum){
							treatmentNum = " 在治" + data.treatmentNum
						}
						let firstNum = "";
						if(data.firstNum){
							firstNum = " 新增" + data.firstNum
						}
						
						return {
							text: data.code + lcs1 + lcs2 + lcs3 + lcs4 + treatmentNum + firstNum,
							fill: '#999',
							fontWeight: 'bold',
						};
					},
					onClick: function onClick(ev) {
						//console.log(ev.data)
						var data = ev.data;
						if (data) {
							console.log(data)
							_this.$refs[id + 'Title'].childNodes[0].nodeValue = data.code;
							_this.$refs[id + 'Text'].childNodes[0].nodeValue = data.count;
						}
					}
				});
				this[name].render();
			},
			lcs_draw(el, option) {
				var _this = this;
				let Chart = echarts.init(this.$refs[el])
				Chart.setOption(option, true);
				//Chart.on('click', function(params) {
				//console.log(params)
				//});
			},
			getData(url, params) {
								this.$vux.loading.show({
									text: 'Loading'
								});
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
			initToolTip() {
				this.$refs['mountNodeTitle'].childNodes[0].nodeValue = '';
				this.$refs['mountNodeText'].childNodes[0].nodeValue = '';
								this.$refs['mountNode2Title'].childNodes[0].nodeValue = '';
								this.$refs['mountNode2Text'].childNodes[0].nodeValue = '';
			},



			handleDaily(attr, storeGetName, data) {
				let p0 = new Promise((resolve, reject) => {
					let obj1 = data;
					let obj2 = {};
					obj2.type = 'bar';
					obj2.boundaryGap = 'false';
					obj2.overlay = 'true';
					//if (attr == 'year') {
//						obj2 = {
//							labelShow: 'no'
//						};
						//obj2.labelShow = 'no'
					//}
					let lcs2 = new BAR_DAILY({ ...obj1,
						...obj2
					});
					resolve(lcs2);
				});
				p0.then((data) => {
					this.lcs_draw('myChart3', data.option)
				});
				this.dateRang2=[]
 				this.dateRang2.push(getYesterday());	
				this.$vux.loading.hide();	
			},
			handlePie1(attr, data) {
				this.DRAWPIE('pie1', 'mountNode', data);
			},
			handlePie2(attr, data) {
				this.DRAWPIE('pie2', 'mountNode2', data);
			},
			handleTotal(attr, storeGetName) {
				this.total = this.$store.getters[storeGetName][attr].total;
				if(this.$store.getters[storeGetName][attr].totalDays != undefined){
					this.totalDays = this.$store.getters[storeGetName][attr].totalDays;
				}
			},
			
			handleBill(attr, storeGetName){
				this.billTotal = this.$store.getters[storeGetName][attr].pie1Data.total;
				this.refund = this.$store.getters[storeGetName][attr].pie1Data.refund;
			},
			contactObj(obj1, obj2) {
				return { ...obj1,
					...obj2
				}
			},
			lcs1(attr) {
				var _this = this;

			
				let reqParams = {
					hospitalCode: config.hospitalCode.filter((item) => {
						return item.name == _this.$route.params.id
					})[0].label,
					dateType: attr,
					startTime: _this.dateRang[0] || '',
					endTime: _this.dateRang[1] || _this.dateRang[0] || ''
				};

				if (this.$route.params.id == 'dt' && this.$route.name == 'yesterday') {

					if (this.$store.getters.getVisitDtData[attr].chart1.dailyData != '' && !this.fetch) { //this.fetch是为了 确保点击日期查询时都会重新获取数据，点击时间->确定时，this.fetch为false，就不取已保存的数据而重新请求数据了
						this.handleDaily(attr, 'getVisitDtData', this.$store.getters.getVisitDtData[attr].chart1);
						this.handlePie1(attr, this.$store.getters.getVisitDtData[attr].pie1Data);
						this.handleTotal(attr, 'getVisitDtData')
						this.tipData = this.$store.getters.getVisitDtData[attr].pie1Data;
						this.handlePie2(attr, this.$store.getters.getVisitDtData[attr].pie2Data);
						this.handleBill(attr,'getIncomeDtData');
					} else {

						this.getData('api/visits/daily', reqParams).then((res) => {
							this.$store.dispatch('setVistDtDaily', this.contactObj(res, {
								'dateType': attr
							}));
							this.handleDaily(attr, 'getVisitDtData', this.$store.getters.getVisitDtData[attr].chart1);
							
							this.fetch = false;
						})

						this.getData('api/visits/patientTypes', reqParams).then((res) => {
							this.$store.dispatch('setVistDtPie1', this.contactObj(res, {
								'dateType': attr
							}));
							this.tipData = this.$store.getters.getVisitDtData[attr].pie1Data;
							this.handlePie1(attr, this.$store.getters.getVisitDtData[attr].pie1Data);
							this.fetch = false;
						})

						this.getData('api/visits/count', reqParams).then((res) => {
							this.$store.dispatch('setVistDtTotal', this.contactObj(res, {
								'dateType': attr
							}));
							this.handleTotal(attr, 'getVisitDtData')
						})

						this.getData('api/visits/departments', reqParams).then((res) => {
							this.$store.dispatch('setVistDtPie2', this.contactObj(res, {
								'dateType': attr
							}));
							this.handlePie2(attr, this.$store.getters.getVisitDtData[attr].pie2Data);
						})
						
						
						this.getData('api/bills', {
							hospitalCode: config.hospitalCode.filter((item) => {
								return item.name == this.$route.params.id
							})[0].label,
							dateType: attr,
						}).then((res) => {
							
							let obj1 = res;
							let obj2 = {
								'dateType': attr
							}
							this.$store.dispatch('setIncomeDt', { ...obj1,
								...obj2
							})
							
							this.handleBill(attr,'getIncomeDtData')							
						})
			
					}

				} else if (this.$route.params.id == 'sh' && this.$route.name == 'yesterday') {

					if (this.$store.getters.getVisitShData[attr].chart1.dailyData != '' && !this.fetch) {
						this.handleDaily(attr, 'getVisitShData', this.$store.getters.getVisitShData[attr].chart1);
						this.handlePie1(attr, this.$store.getters.getVisitShData[attr].pie1Data);
						this.handleTotal(attr, 'getVisitShData');
						this.tipData = this.$store.getters.getVisitShData[attr].pie1Data;
						this.handleBill(attr,'getIncomeShData');
					} else {

						this.getData('api/visits/daily', reqParams).then((res) => {
							this.$store.dispatch('setVistShDaily', this.contactObj(res, {
								'dateType': attr
							}));
							this.handleDaily(attr, 'getVisitShData', this.$store.getters.getVisitShData[attr].chart1);
								
							this.fetch = false;
						})

						this.getData('api/visits/departments', reqParams).then((res) => {

							this.$store.dispatch('setVistShPie2', this.contactObj(res, {
								'dateType': attr
							}));

							this.tipData = this.$store.getters.getVisitShData[attr].pie1Data;

							this.handlePie1(attr, this.$store.getters.getVisitShData[attr].pie1Data);
							this.fetch = false;
						})


						this.getData('api/visits/count', reqParams).then((res) => {

							this.$store.dispatch('setVistShTotal', this.contactObj(res, {
								'dateType': attr
							}));
							this.handleTotal(attr, 'getVisitShData')
						})
						
						
						this.getData('api/bills', {
							hospitalCode: config.hospitalCode.filter((item) => {
								return item.name == this.$route.params.id
							})[0].label,
							dateType: attr,
						}).then((res) => {
							
							let obj1 = res;
							let obj2 = {
								'dateType': attr
							}
							this.$store.dispatch('setIncomeSh', { ...obj1,
								...obj2
							})	
							this.handleBill(attr,'getIncomeShData');							
						})
						
					}
				} else if (this.$route.params.id == 'xjp' && this.$route.name == 'yesterday') {
					if (this.$store.getters.getVisitXjpData[attr].chart1.dailyData != '' && !this.fetch) {
						this.handleDaily(attr, 'getVisitXjpData', this.$store.getters.getVisitXjpData[attr].chart1);
						this.handlePie1(attr, this.$store.getters.getVisitXjpData[attr].pie1Data);
						this.handleTotal(attr, 'getVisitXjpData');
						this.tipData = this.$store.getters.getVisitXjpData[attr].pie1Data;
						this.handleBill(attr,'getIncomeXjpData');	
					} else {
						this.getData('api/visits/daily', reqParams).then((res) => {
							this.$store.dispatch('setVistXjpDaily', this.contactObj(res, {
								'dateType': attr
							}));
							this.handleDaily(attr, 'getVisitXjpData', this.$store.getters.getVisitXjpData[attr].chart1);
							this.$vux.loading.hide();	
							this.fetch = false;
						})

						this.getData('api/visits/patientTypes', reqParams).then((res) => {
							this.$store.dispatch('setVistXjpPie1', this.contactObj(res, {
								'dateType': attr
							}));
							this.tipData = this.$store.getters.getVisitXjpData[attr].pie1Data;
							this.handlePie1(attr, this.$store.getters.getVisitXjpData[attr].pie1Data);
							this.fetch = false;
						})


						this.getData('api/visits/count', reqParams).then((res) => {

							this.$store.dispatch('setVistXjpTotal', this.contactObj(res, {
								'dateType': attr
							}));
							this.handleTotal(attr, 'getVisitXjpData')
						})
						
						
						this.getData('api/bills', {
							hospitalCode: config.hospitalCode.filter((item) => {
								return item.name == this.$route.params.id
							})[0].label,
							dateType: attr,
						}).then((res) => {
							
							let obj1 = res;
							let obj2 = {
								'dateType': attr
							}
							this.$store.dispatch('setIncomeXjp', { ...obj1,
								...obj2
							})	
							this.handleBill(attr,'getIncomeXjpData');							
						})
						
					}

				}
			},
			handleData() {
				this.initToolTip();
				//console.log("handle")
				this.lcs1('day')
			},
		},
		created() {
			this.$bus.on('LayOutTabEventListen', this.handleData);
		},
		mounted() {
			//使f2 pie canvas 的宽度正常
			this.$nextTick(() => {
					this.$refs['mountNode2'].style.width = this.$refs['lcs_box'].clientWidth + 'px';
			})
		},
		activated() {
			//console.log("activated vv")

			this.handleData()
			//设置滚动距离
			this.$refs.yesterdayWrap.scrollTop = this.$store.getters.getYesterdayScrollTop;
		},
		watch: {
			'$route'(to, from) {
				if (to.name == 'yesterday' && from.name == 'yesterday') {
					this.handleData()
					//console.log("watch v")

				}

			}
		},
		beforeRouteLeave(to, from, next) {
			//记录滚动距离
			this.$store.dispatch('changeYesterdayScrollTop', this.$refs.yesterdayWrap.scrollTop)
			next();
		}

	}
</script>

<!-- <style>
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
</style>
 -->