export const compare = function(attr, rev) {
	//第二个参数没有传递 默认升序排列
	if(rev == undefined) {
		rev = 1;
	} else {
		rev = (rev) ? 1 : -1;
	}

	return function(a, b) {
		a = a[attr];
		b = b[attr];
		if(a < b) {
			return rev * -1;
		}
		if(a > b) {
			return rev * 1;
		}
		return 0;
	}
}

import moment from 'moment';

// 获取昨天的开始结束时间
export const getYesterday = function() {
	let date = []
	date.push(moment().subtract(1,'days').format('YYYY-MM-DD'))
	date.push(moment().subtract(1,'days').format('YYYY-MM-DD'))
	return date[0]
}
// 获取最近七天的开始结束时间
export const getLast7Days = function() {
	let date = []
	date.push(moment().subtract('days', 7).format('YYYY-MM-DD'))
	date.push(moment().subtract('days', 1).format('YYYY-MM-DD'))
	return date
}
// 获取最近30天的开始结束时间
export const getLast30Days = function() {
	let date = []
	date.push(moment().subtract('days', 30).format('YYYY-MM-DD'))
	date.push(moment().subtract('days', 1).format('YYYY-MM-DD'))
	return date
}
// 获取上一周的开始结束时间
export const getLastWeekDays = function() {
	//debugger
	let date = []
	let weekOfday = parseInt(moment().format('d')) // 计算今天是这周第几天  周日为一周中的第一天
	let start = moment().subtract(weekOfday + 7, 'days').format('YYYY-MM-DD') // 周一日期
	let end = moment().subtract(weekOfday + 1, 'days').format('YYYY-MM-DD') // 周日日期
	date.push(start)
	date.push(end)
	//return date
	return date[0]+' TO '+date[1]
}
// 获取上一个月的开始结束时间
export const getLastMonthDays = function() {
	let date = []
	let start = moment().subtract('month', 1).format('YYYY-MM') + '-01'
	let end = moment(start).subtract('month', -1).add('days', -1).format('YYYY-MM-DD')
	date.push(start)
	date.push(end)
	//return date
	return date[0]+' TO '+date[1]
}
// 获取当前周的开始结束时间
export const getCurrWeekDays = function() {
	let date = []
	let weekOfday = parseInt(moment().format('d')) // 计算今天是这周第几天 周日为一周中的第一天
	let start = moment().subtract(weekOfday, 'days').format('YYYY-MM-DD') // 周一日期
	let end = moment().add(7 - weekOfday - 1, 'days').format('YYYY-MM-DD') // 周日日期
	date.push(start)
	date.push(end)
	return date
}
// 获取当前月的开始结束时间
export const getCurrMonthDays = function() {
	let date = []
	let start = moment().add('month', 0).format('YYYY-MM') + '-01'
	let end = moment(start).add('month', 1).add('days', -1).format('YYYY-MM-DD')
	date.push(start)
	date.push(end)
	return date
}



export const   DateMinus = (date1,date2)=>{//date1:小日期   date2:大日期
  　　var sdate = new Date(date1); 
  　　var now = new Date(date2); 
  　　var days = now.getTime() - sdate.getTime(); 
  　　var day = parseInt(days / (1000 * 60 * 60 * 24)); 
  　　return day; 
  }
