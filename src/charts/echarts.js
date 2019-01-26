const compare = function(attr, rev) {
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
//去重
const duplicateCheckArr = (arr) => {
	return arr.filter(function(item, index, self) {
		return self.indexOf(item) === index
	})

};
export const BAR_DAILY = function(obj) {
	this.option = {
		title: {
			text: obj.title,
			left: 'center',
			top: 10,
			textStyle: {
				color: '#000'
			},
			subtext: obj.subtext
		},
		color: ['#409EFF', '#67C23A', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
		backgroundColor: '#fff',
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			type: 'plain',
			orient: 'horizontal',
			top: 60,
			data: this.getTypeArr(obj),
			formatter: function(name) {
				return name
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '50',
			top: '120',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			//boundaryGap: true,//line的
			boundaryGap:obj.boundaryGap == 'false'?true:false,
			data: this.getXLabel(obj),
			axisLabel: {
				color: '#808080'
			},

			axisLine: {
				lineStyle: {
					color: '#e8e8e8'
				}
			},

			axisTick: {

				lineStyle: {
					color: '#e8e8e8'
				}
			}

		},
		yAxis: {
			type: 'value',
			axisLabel: {
				color: '#808080'
			},

			splitArea: {
				show: false
			},

			splitLine: {
				lineStyle: {
					color: '#b7b7b7',
					type: 'dotted'
				}
			},

			axisLine: {
				show: false,
				lineStyle: {
					color: 'rgb(150,150,150)'
				}
			},

			axisTick: {
				show: false,
				lineStyle: {
					color: '#808080'
				}
			}

		},
		dataZoom:this.getZoom(obj),
		series: this.getSeriesData(obj)
	}
}

BAR_DAILY.prototype.getTypeArr = (obj) => {
	if(obj.dailyData.length > 0) {
		let TypeArr = [];
		obj.dailyData.map((item) => {
			let flag1 = true;
			let flag = item.data.map((item2)=>{
				if(item2.amount != 0){
					flag1 =  false;
				}
			});
			if(!flag1){
				let newobj = {}
				newobj.name = item.name;
				newobj.icon = 'circle'
				TypeArr.push(newobj)
			}
			
			
//			let newobj = {}
//			newobj.name = item.name;
//			newobj.icon = 'circle'
//			TypeArr.push(newobj)
		})
		return TypeArr;
	}
}

BAR_DAILY.prototype.getXLabel = (obj) => {
	if(obj.dailyData.length > 0) {
		let datearr = [];
		obj.dailyData[0].data.sort(compare('synchronizedDate')).map((item) => {
			datearr.push(item.synchronizedDate)
		})
		return datearr;
	}
}

BAR_DAILY.prototype.getZoom = function(obj){
	let zoom = []
	if(obj.dailyData[0].data.length>7){
		zoom = [{
				type: 'slider',
				show: true,
				realtime: false,
				start: 0,
				end: 60,
				bottom: 10,
				showDetail:false
		}]
	};
	return zoom;
}

BAR_DAILY.prototype.getSeriesData = function(obj) {
	let typearr = []
	if(obj.dailyData.length > 0) {
		obj.dailyData.map((item) => {
			typearr.push(item.name)
		})
	}
	let seriesArr = []
	//按照类别获取本段时间（时间升序排序）的数据
	typearr.map((item,index) => {
		let newobj = {}
		newobj.data = [];
		obj.dailyData.filter((item2) => {
			return item2.name == item
		})[0].data.sort(compare('synchronizedDate')).map((item3) => {
			//let num = null;  //本来是bar用的，现在需要line形式，所以就改为原来的0了
//			if(item3.amount != 0) {
//				num =  parseInt(item3.amount);
//			}
//			newobj.data.push(num)
			newobj.data.push(parseInt(item3.amount))
		});
		newobj.name = item;
		
		newobj.type = obj.type || 'line';
		//原为line，时yesterday周一是一个点，不好看，yesterday改为bar形
		let overlay = obj.overlay == 'true'?'':index;
		newobj.stack = '总量'+ overlay;
		newobj.symbolSize= 1;//line的
		newobj.smooth = true;//line的
		newobj.lineStyle ={width:1};
		newobj.animation = false;
		
		if(newobj.type == "bar"){
			newobj.label = {
				normal: {
					show:true,
					position: 'inside',
					formatter: function(params) {
						
						if(params.value >0){
						
							return  params.value
						}else{
							
							return ""
						}
					}
				}
			}
		}else{
			newobj.label = {
				normal: {
					show:false,
				}
			}		
		}
		seriesArr.push(newobj)
	})

	return seriesArr
}

export const BAR_EPARTMENT = function(obj) {
	obj.byDepartmentCode.sort(compare('name'));
	this.option = {
		title: {
			text: obj.title || '科室-就诊 统计',
			left: 'center',
			top: 10,
			textStyle: {
				color: '#000'
			},
			subtext: obj.subtext || '单位: 人次'
		},
		color: ['#409EFF', '#67C23A', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
		backgroundColor: '#fff',
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			type: 'scroll',
			orient: 'horizontal',
			top: 60,
			data: this.getPatient_types(obj),
			formatter: function(name) {
				return name
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '50',
			top: '100',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: this.getXLabel(obj),
			axisLabel: {
				color: '#808080'
			},

			axisLine: {
				lineStyle: {
					color: '#e8e8e8'
				}
			},

			axisTick: {

				lineStyle: {
					color: '#e8e8e8'
				}
			}

		},
		yAxis: {
			type: 'value',
			axisLabel: {
				color: '#808080'
			},

			splitArea: {
				show: false
			},

			splitLine: {
				lineStyle: {
					color: '#b7b7b7',
					type: 'dotted'
				}
			},

			axisLine: {
				show: false,
				lineStyle: {
					color: 'rgb(150,150,150)'
				}
			},

			axisTick: {
				show: false,
				lineStyle: {
					color: '#808080'
				}
			}

		},
		dataZoom:this.getZoom(obj),
		series: this.getSeriesData(obj)
	}
}

BAR_EPARTMENT.prototype.getXLabel = (obj) => {
	let xLableArr = []
	if(obj.byDepartmentCode.length > 0) {
		obj.byDepartmentCode.map((item) => {
			xLableArr.push(item.name)
		})
	}
	return xLableArr;
}

BAR_EPARTMENT.prototype.getPatient_types = (obj) => {
	let allPatient_types = []
	obj.byDepartmentCode.map((item) => {
		item.patientTypeMap.map((item2) => {
			allPatient_types.push(item2.patient_type)
		})
	})
	let res = duplicateCheckArr(allPatient_types);
	return res;
}

BAR_EPARTMENT.prototype.getZoom = function(obj){
	let zoom = []
	if(obj.byDepartmentCode.length>7){
		zoom = [{
				type: 'slider',
				show: true,
				realtime: true,
				start: 0,
				end: 60,
				bottom: 10,
		}]
	};
	return zoom;
}

BAR_EPARTMENT.prototype.getSeriesData = function(obj){
	var serArr = []
	this.getPatient_types(obj).map((item)=>{
				let newobj = {};
				newobj.data = [];
				obj.byDepartmentCode.map((item2)=>{
					let num = null;
					let val = item2.patientTypeMap.filter((item3)=>{
						return item3.patient_type == item
					})[0].amount;
					if(val != 0){
						num = val
					}
					newobj.data.push(num)
				})
				newobj.name = item;
				newobj.type = 'bar',
				newobj.stack = '总量',
				newobj.label = {
					normal: {
						show: true,
						position: 'inside',
						//formatter: function(params) {
						//	return params.seriesName + params.value
						//}
					}
				},
				serArr.push(newobj)
			})
	
	return serArr;
}





export const INCOME = function(obj) {
	this.option = {
		title: {
			text: obj.title,
			left: 'center',
			top: 10,
			textStyle: {
				color: '#000'
			},
			subtext: obj.subtext
		},
		color: ['#409EFF', '#67C23A', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
		backgroundColor: '#fff',
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			type: 'plain',
			orient: 'horizontal',
			top: 60,
			data: this.getTypeArr(obj),
			formatter: function(name) {
				return name
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '50',
			top: '120',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			//boundaryGap: true,//line的
			boundaryGap:obj.boundaryGap == 'false'?true:false,
			data: this.getXLabel(obj),
			axisLabel: {
				color: '#808080'
			},

			axisLine: {
				lineStyle: {
					color: '#e8e8e8'
				}
			},

			axisTick: {

				lineStyle: {
					color: '#e8e8e8'
				}
			}

		},
		yAxis: {
			type: 'value',
			axisLabel: {
				color: '#808080'
			},

			splitArea: {
				show: false
			},

			splitLine: {
				lineStyle: {
					color: '#b7b7b7',
					type: 'dotted'
				}
			},

			axisLine: {
				show: false,
				lineStyle: {
					color: 'rgb(150,150,150)'
				}
			},

			axisTick: {
				show: false,
				lineStyle: {
					color: '#808080'
				}
			}

		},
		dataZoom:this.getZoom(obj),
		series: this.getSeriesData(obj)
	}
}

INCOME.prototype.getTypeArr = (obj) => {
	if(obj.dailyData.length > 0) {
		let TypeArr = [];
		obj.dailyData.map((item) => {
			let flag1 = true;
			let flag = item.data.map((item2)=>{
				if(item2.amount != 0){
					flag1 =  false;
				}
			});
			if(!flag1){
				let newobj = {}
				newobj.name = item.name;
				newobj.icon = 'circle'
				TypeArr.push(newobj)
			}
			
			
//			let newobj = {}
//			newobj.name = item.name;
//			newobj.icon = 'circle'
//			TypeArr.push(newobj)
		})
		return TypeArr;
	}
}

INCOME.prototype.getXLabel = (obj) => {
	if(obj.dailyData.length > 0) {
		let datearr = [];
		obj.dailyData[0].data.sort(compare('synchronizedDate')).map((item) => {
			datearr.push(item.synchronizedDate)
		})
		return datearr;
	}
}

INCOME.prototype.getZoom = function(obj){
	let zoom = []
	if(obj.dailyData[0].data.length>7){
		zoom = [{
				type: 'slider',
				show: true,
				realtime: false,
				start: 0,
				end: 60,
				bottom: 10,
				showDetail:false
		}]
	};
	return zoom;
}

INCOME.prototype.getSeriesData = function(obj) {
	let typearr = []
	if(obj.dailyData.length > 0) {
		obj.dailyData.map((item) => {
			typearr.push(item.name)
		})
	}
	let seriesArr = [];
	//按照类别获取本段时间（时间升序排序）的数据
	typearr.map((item,index) => {
		console.log(item)
		let newobj = {}
		newobj.data = [];
		obj.dailyData.filter((item2) => {
			return item2.name == item
		})[0].data.sort(compare('synchronizedDate')).map((item3) => {
			newobj.data.push(parseInt(item3.amount))
		});
		newobj.name = item;
		
		newobj.type = obj.type || 'line';
		//原为line，时yesterday周一是一个点，不好看，yesterday改为bar形
		let overlay = obj.overlay == 'true'?'':index;
		newobj.stack = '总量'+ overlay;
		newobj.symbolSize= 1;//line的
		newobj.smooth = true;//line的
		newobj.lineStyle ={width:1};
		newobj.animation = false;
		
		if(newobj.type == "bar"){
			newobj.label = {
				normal: {
					show:true,
					position: 'inside',
					formatter: function(params) {
						if(params.value >0){
							return  params.value
						}else{
							return ""
						}
					}
				}
			}
		}else{
			newobj.label = {
				normal: {
					show:false,
				}
			}		
		}
		seriesArr.push(newobj)
	})

	return seriesArr
}
