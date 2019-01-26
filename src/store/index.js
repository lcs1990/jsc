import Vue from 'vue'
import Vuex from 'vuex'

import { compare } from '@/tools'
Vue.use(Vuex)

const state = {
	dateType: {
		label: '周报',
		val: 'week'
	},
	visitScrollTop: 0,
	yesterdayScrollTop: 0,
	incomeScrollTop: 0,
	visitShData: {
		day: {
			chart1: {
				"title": '就诊量 波动图',
				"subtext": '单位:人次',
				"dailyData": '',
			},
			pie1Data: [],
			total: 0,
			pie2Data: [],
			dateRang: []
		},
		week: {
			chart1: {
				"title": '就诊量 波动图',
				"subtext": '单位:人次',
				"dailyData": '',
			},
			pie1Data: [],
			total: 0,
			pie2Data: [],
			dateRang: []
		},
		month: {
			chart1: {
				"title": '就诊量 波动图',
				"subtext": '单位:人次',
				"dailyData": ''
			},
			pie1Data: [],
			total: 0,
			pie2Data: [],
			dateRang: []
		},
		year: {
			chart1: {
				"title": '就诊量 波动图',
				"subtext": '单位:人次',
				"dailyData": ""
			},
			pie1Data: [],
			total: 0,
			pie2Data: [],
			dateRang: []
		}
	},
	visitDtData: {
		day: {
			chart1: {
				"title": '就诊量 波动图',
				"subtext": '单位:人次',
				"dailyData": ''
			},
			pie1Data: [],
			pie2Data: [],
			total: 0,
			totalDays:0,
			tipData: [],
			dateRang: []
		},
		week: {
			chart1: {
				"title": '就诊量 波动图',
				"subtext": '单位:人次',
				"dailyData": ''
			},
			pie1Data: [],
			pie2Data: [],
			total: 0,
			totalDays:0,
			tipData: [],
			dateRang: []
		},
		month: {
			chart1: {
				"title": '就诊量 波动图',
				"subtext": '单位:人次',
				"dailyData": ""
			},
			pie1Data: [],
			pie2Data: [],
			total: 0,
			totalDays:0,
			tipData: [],
			dateRang: []
		},
		year: {
			chart1: {
				"title": '就诊量 波动图',
				"subtext": '单位:人次',
				"dailyData": ""
			},
			pie1Data: [],
			pie2Data: [],
			total: 0,
			totalDays:0,
			tipData: [],
			dateRang: []
		}
	},
	visitXjpData: {
		day: {
			pie1Data: [],
			total: 0,
			totalDays:0,
			chart1: {
				"title": '就诊量 波动图',
				"subtext": '单位:人次',
				"dailyData": ""
			},
			dateRang: []
		},
		week: {
			pie1Data: [],
			total: 0,
			totalDays:0,
			chart1: {
				"title": '就诊量 波动图',
				"subtext": '单位:人次',
				"dailyData": ""
			},
			dateRang: []
		},
		month: {
			chart1: {
				"title": '就诊量 波动图',
				"subtext": '单位:人次',
				"dailyData": ""
			},
			pie1Data: [],
			total: 0,
			totalDays:0,
			dateRang: []
		},
		year: {
			chart1: {
				"title": '就诊量 波动图',
				"subtext": '单位:人次',
				"dailyData": ""
			},
			pie1Data: [],
			total: 0,
			totalDays:0,
			dateRang: []
		}
	},
	incomeDtData: {
		day: {
			chart1: {
				"title": '收入波动图',
				"subtext": '单位:元',
				"dailyData": ""
			},
			pie1Data: '',
			dateRang: []
		},
		week: {
			chart1: {
				"title": '收入波动图',
				"subtext": '单位:元',
				"dailyData": ""
			},
			pie1Data: "",
			dateRang: []
		},
		month: {
			chart1: {
				"title": '收入波动图',
				"subtext": '单位:元',
				"dailyData": ""
			},
			pie1Data: "",
			dateRang: []
		},
		year: {
			chart1: {
				"title": '收入波动图',
				"subtext": '单位:元',
				"dailyData": ""
			},
			pie1Data: "",
			dateRang: []
		}
	},
	incomeShData: {
		day: {
			chart1: {
				"title": '收入波动图',
				"subtext": '单位:元',
				"dailyData": ""
			},
			pie1Data: '',
			dateRang: []
		},
		week: {
			chart1: {
				"title": '收入波动图',
				"subtext": '单位:元',
				"dailyData": ""
			},
			pie1Data: "",
			dateRang: []
		},
		month: {
			chart1: {
				"title": '收入波动图',
				"subtext": '单位:元',
				"dailyData": ""
			},
			pie1Data: "",
			dateRang: []
		},
		year: {
			chart1: {
				"title": '收入波动图',
				"subtext": '单位:元',
				"dailyData": ""
			},
			pie1Data: "",
			dateRang: []
		}
	},
	incomeXjpData: {
		day: {
			chart1: {
				"title": '收入波动图',
				"subtext": '单位:新加坡元',
				"dailyData": ""
			},
			pie1Data: '',
			dateRang: []
		},
		week: {
			chart1: {
				"title": '收入波动图',
				"subtext": '单位:新加坡元',
				"dailyData": ""
			},
			pie1Data: "",
			dateRang: []
		},
		month: {
			chart1: {
				"title": '收入波动图',
				"subtext": '单位:新加坡元',
				"dailyData": ""
			},
			pie1Data: "",
			dateRang: []
		},
		year: {
			chart1: {
				"title": '收入波动图',
				"subtext": '单位:新加坡元',
				"dailyData": ""
			},
			pie1Data: "",
			dateRang: []
		}
	}
}

const getters = {
	getDateType: state => {
		return state.dateType
	},
	getVisitScrollTop: state => {
		return state.visitScrollTop
	},
	getYesterdayScrollTop: state => {
		return state.yesterdayScrollTop
	},
	getIncomeScrollTop: state => {
		return state.incomeScrollTop
	},
//	getYesterdayShData: state => {
//		return state.yesterdayShData
//	},
//	getYesterdayDtData: state => {
//		return state.yesterdayDtData
//	},
//	getYesterdayXjpData: state => {
//		return state.yesterdayXjpData
//	},

	getVisitShData: state => {
		return state.visitShData
	},
	getVisitDtData: state => {
		return state.visitDtData
	},
	getVisitXjpData: state => {
		return state.visitXjpData
	},
	//income
	getIncomeDtData: state => {
		return state.incomeDtData
	},
	getIncomeShData: state => {
		return state.incomeShData
	},
	getIncomeXjpData: state => {
		return state.incomeXjpData
	}
};

const mutations = {
	changeDateType(state, params) {
		state.dateType.label = params.label;
		state.dateType.val = params.val;
	},
	changeVisitScrollTop(state, params) {
		state.visitScrollTop = params;
	},
	changeYesterdayScrollTop(state, params) {
		state.yesterdayScrollTop = params;
	},
	changeIncomeScrollTop(state, params) {
		state.incomeScrollTop = params;
	},
	setVistDtDaily(state, params) {
		let timeType = params.dateType; // day/week/month/year
		state.visitDtData[timeType].chart1.dailyData = params.dailyData;

		state.visitDtData[timeType].dateRang = [];

		let arr = params.dailyData[0].data.sort(compare('synchronizedDate'))
		let firstDate = arr[0].synchronizedDate;
		let lastIndex = arr.length - 1;
		let endDate = arr[lastIndex].synchronizedDate;
		state.visitDtData[timeType].dateRang.push(firstDate, endDate);

	},

	setVistDtPie1(state, params) {

		let timeType = params.dateType; // day/week/month/year
		state.visitDtData[timeType].pie1Data = [];
		params.byPatientType.map((item) => {
			let aobj = {};
			aobj.code = item.code;
			aobj.count = item.count;
			aobj.type = 't1';
			state.visitDtData[timeType].pie1Data.push(aobj)
		})
	},

	setVistDtPie2(state, params) {

		let timeType = params.dateType; // day/week/month/year
		state.visitDtData[timeType].pie2Data = [];
		params.byDepartmentCode.map((item) => {
			let aobj = {};
			aobj.code = item.name;
			aobj.count = item.count;
			aobj.type = 't1';

			let arr1 = item.patientTypeMap.filter((item) => {
				return item.patient_type == '住院患者'
			});
			let arr2 = item.patientTypeMap.filter((item) => {
				return item.patient_type == '门诊患者'
			});
			if(arr1.length > 0) {
				aobj.lcs4 = arr1[0].amount;
			}
			if(arr2.length > 0) {
				aobj.lcs3 = arr2[0].amount;
			}

			state.visitDtData[timeType].pie2Data.push(aobj)
		})

	},

	setVistDtTotal(state, params) {
		let timeType = params.dateType; // day/week/month/year

		state.visitDtData[timeType].total = params.totalVisit;
		state.visitDtData[timeType].totalDays = params.totalDays;
	},

	setVistShDaily(state, params) {
		let timeType = params.dateType; // day/week/month/year
		state.visitShData[timeType].chart1.dailyData = params.dailyData;

		state.visitShData[timeType].dateRang = [];

		let arr = params.dailyData[0].data.sort(compare('synchronizedDate'))
		let firstDate = arr[0].synchronizedDate;
		let lastIndex = arr.length - 1;
		let endDate = arr[lastIndex].synchronizedDate;
		state.visitShData[timeType].dateRang.push(firstDate, endDate);

	},

	setVistShPie1(state, params) {
		let timeType = params.dateType; // day/week/month/year
		state.visitShData[timeType].pie1Data = [];
		params.byPatientType.map((item) => {
			let aobj = {};
			aobj.code = item.code;
			aobj.count = item.count;
			aobj.type = 't1';
			state.visitShData[timeType].pie1Data.push(aobj)
		})
	},

	setVistShPie2(state, params) {

		let timeType = params.dateType; // day/week/month/year
		state.visitShData[timeType].pie1Data = [];
		params.byDepartmentCode.map((item) => {
			let aobj = {};
			aobj.code = item.name;
			aobj.count = item.count;
			aobj.type = 't1';
			console.log(item)
			
			
			//影像科不显示初复诊了
			if(item.name != '影像科'){
//				let arr1 = item.visitTypeMap.filter((item) => {
//					return item.visit_type == '初诊'
//				});
//				if(arr1.length > 0) {
//					aobj.lcs1 = arr1[0].amount;
//				}
//	
//				let arr2 = item.visitTypeMap.filter((item) => {
//					return item.visit_type == '复诊'
//				});
//				if(arr1.length > 0) {
//					aobj.lcs1 = arr1[0].amount;
//				}
//				if(arr2.length > 0) {
//					aobj.lcs2 = arr2[0].amount;
//				}
				
				if(item.firstNum != 0 && item.firstNum != null){
					aobj.firstNum = item.firstNum;
				}
				if(item.treatmentNum != 0 && item.treatmentNum != null){
					aobj.treatmentNum = item.treatmentNum;
				}


			}
			
			

			state.visitShData[timeType].pie1Data.push(aobj)
			
			console.log(aobj)
		})

	},

	setVistShTotal(state, params) {
		let timeType = params.dateType; // day/week/month/year

		state.visitShData[timeType].total = params.totalVisit;
	},

	setVistXjpDaily(state, params) {
		let timeType = params.dateType; // day/week/month/year
		state.visitXjpData[timeType].chart1.dailyData = params.dailyData;

		state.visitXjpData[timeType].dateRang = [];
		let arr = params.dailyData[0].data.sort(compare('synchronizedDate'))
		let firstDate = arr[0].synchronizedDate;
		let lastIndex = arr.length - 1;
		let endDate = arr[lastIndex].synchronizedDate;
		state.visitXjpData[timeType].dateRang.push(firstDate, endDate);

	},

	setVistXjpPie1(state, params) {
		let timeType = params.dateType; // day/week/month/year
		state.visitXjpData[timeType].pie1Data = [];
		params.byPatientType.map((item) => {
			let aobj = {};
			aobj.code = item.code;
			aobj.count = item.count;
			aobj.type = 't1';
			state.visitXjpData[timeType].pie1Data.push(aobj)
		})
	},
	setVistXjpTotal(state, params) {
		let timeType = params.dateType; // day/week/month/year
		state.visitXjpData[timeType].total = params.totalVisit;
		state.visitXjpData[timeType].totalDays = params.totalDays;
	},
	setIncomeDt(state, params) {

		let timeType = params.dateType; // day/week/month/year
		state.incomeDtData[timeType].chart1.dailyData = params.dailyData;

		let pie1Data = {};
		pie1Data.data = [];
		params.byPatientType.map((item) => {
			let aobj = {};
			aobj.code = item[0];
			aobj.count = item[1];
			aobj.type = 't1';
			pie1Data.data.push(aobj)
		})
		pie1Data.total = params.totalCount;
		pie1Data.refund = params.refund;
		state.incomeDtData[timeType].pie1Data = pie1Data;

		state.incomeDtData[timeType].dateRang = [];
		let firstDate = params.dailyData[0].data[0].synchronizedDate;
		let endDate = params.dailyData[0].data[params.dailyData[0].data.length - 1].synchronizedDate;
		state.incomeDtData[timeType].dateRang.push(firstDate, endDate);

	},
	setIncomeSh(state, params) {

		let timeType = params.dateType; // day/week/month/year

		state.incomeShData[timeType].chart1.dailyData = params.dailyData;

		let pie1Data = {};
		pie1Data.data = [];
		params.byPatientType.map((item) => {
			let aobj = {};
			aobj.code = item[0];
			aobj.count = item[1];
			aobj.type = 't1';
			pie1Data.data.push(aobj)
		})
		pie1Data.total = params.totalCount;
		pie1Data.refund = params.refund;
		state.incomeShData[timeType].pie1Data = pie1Data;

		state.incomeShData[timeType].dateRang = [];
		let firstDate = params.dailyData[0].data[0].synchronizedDate;
		let endDate = params.dailyData[0].data[params.dailyData[0].data.length - 1].synchronizedDate;
		state.incomeShData[timeType].dateRang.push(firstDate, endDate);

	},
	setIncomeXjp(state, params) {

		let timeType = params.dateType; // day/week/month/year
		state.incomeXjpData[timeType].chart1.dailyData = params.dailyData;

		let pie1Data = {};
		pie1Data.data = [];
		params.byPatientType.map((item) => {
			let aobj = {};
			aobj.code = item[0];
			aobj.count = item[1];
			aobj.type = 't1';
			pie1Data.data.push(aobj)
		})
		pie1Data.total = params.totalCount;
		pie1Data.refund = params.refund;
		state.incomeXjpData[timeType].pie1Data = pie1Data;

		state.incomeXjpData[timeType].dateRang = [];
		let firstDate = params.dailyData[0].data[0].synchronizedDate;
		let endDate = params.dailyData[0].data[params.dailyData[0].data.length - 1].synchronizedDate;
		state.incomeXjpData[timeType].dateRang.push(firstDate, endDate);

	}
}

const actions = {
	changeDateType(context, params) { //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
		context.commit('changeDateType', params);
	},
	changeVisitScrollTop(context, params) {
		context.commit('changeVisitScrollTop', params);
	},
	changeYesterdayScrollTop(context, params) {
		context.commit('changeYesterdayScrollTop', params);
	},
	changeIncomeScrollTop(context, params) {
		context.commit('changeIncomeScrollTop', params);
	},

	//income
	setIncomeDt(context, params) {
		context.commit('setIncomeDt', params);
	},
	setIncomeSh(context, params) {
		context.commit('setIncomeSh', params);
	},
	setIncomeXjp(context, params) {
		context.commit('setIncomeXjp', params);
	},

	//v2
	setVistDtDaily(context, params) {
		context.commit('setVistDtDaily', params);
	},
	setVistDtPie1(context, params) { //dt类型
		context.commit('setVistDtPie1', params);
	},
	setVistDtPie2(context, params) { //dt科室
		context.commit('setVistDtPie2', params);
	},
	setVistDtTotal(context, params) {
		context.commit('setVistDtTotal', params);
	},

	setVistShDaily(context, params) {
		context.commit('setVistShDaily', params);
	},
	setVistShPie2(context, params) {
		context.commit('setVistShPie2', params);
	},
	setVistShTotal(context, params) {
		context.commit('setVistShTotal', params);
	},

	setVistXjpDaily(context, params) {
		context.commit('setVistXjpDaily', params);
	},
	setVistXjpPie1(context, params) {
		context.commit('setVistXjpPie1', params);
	},
	setVistXjpTotal(context, params) {
		context.commit('setVistXjpTotal', params);
	},
};

const store = new Vuex.Store({
	state,
	actions,
	mutations,
	getters,
})

export default store