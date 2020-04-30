import React, {useState} from "react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	ResponsiveContainer,
	CartesianGrid,
	Tooltip,
	Legend
} from "recharts";



export default function PractiseWeeklyReport({practiseReport}) {
	console.log(practiseReport)
	const [color, setColor] = useState(["#8884d8", "#82ca9d", "#23ca9d", "red", "blue"  ])

	const subjectLength = practiseReport.length
	const linears = [];

	for(let i = 0; i <= subjectLength ; i++){
		linears.push(
		<linearGradient id={"subject"+''+i} x1="0" y1="0" x2="0" y2="1">
      		<stop offset="5%" stopColor={color[i]} stopOpacity={0.8}/>
      		<stop offset="95%" stopColor={color[i]} stopOpacity={0}/>
   		 </linearGradient>
		);
	}
	// let Area=[]
	// for (let j=1; j<=((practiseReport[0].size)); j++){
	// 	Area.push(<Area
	// 						type="monotone"
	// 						dataKey="Math"
	// 						stroke="#8884d8"
    //                         activeDot={{ r: 8 }}
    //                         fillOpacity={1} fill="url(#subject1)"
	// 	/>)
	// }
	const apple = practiseReport[0]
	// console.log(apple)
	const MeroArea = []
	if(apple){
		var keys = Object.keys(apple)
		// console.log('s', keys)
		console.log('s', keys)
		
	for(let j=1; j<=(keys.length); j++){
		MeroArea.push(
		<Area
							type="monotone"
							dataKey={keys[j]}
							stroke={color[j-1]}
                            activeDot={{ r: 8 }}
                            fillOpacity={1} fill={"url(#subject" + (j-1) +")"}
	/>

		)}
	}

	const [myKey, setMykey] = useState(keys)
	console.log('s', myKey)
	// let Area = []
	// for(let j=1; j<=(myKey.length); j++){
	// 	Area.push(
	// <Area
	// 						type="monotone"
	// 						dataKey={keys[j]}
	// 						stroke="#8884d8"
    //                         activeDot={{ r: 8 }}
    //                         fillOpacity={1} fill="url(#colorMath)"
	// />

	// 	)}

	// console.log(keys)

	// const values = [Object.keys(apple)]
	// console.log(keys)
	// console.log(practiseReport[0])
	// const nepal = Object.keys(practiseReport[0]).map((key) => practiseReport[0][key])
	// console.log('nepal', nepal);


	return (
		<div className="report-wrapper ">
			<div className="title d-flex justify-content-between">
				<span className="prev">
					<i className="fa fa-caret-left"></i>
				</span>
				<div className="title-wrapper">
					<strong>Weekly Report</strong>
					<small>Jan 1 - Jan 7</small>
				</div>

				<span className="next">
					<i className="fa fa-caret-right"></i>
				</span>
			</div>
			<div className="content-wrapper">
				<ResponsiveContainer width="100%" height={300}>
					<AreaChart 
						data={practiseReport}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5 
						}}
					>
                        <defs>
   {linears}
  </defs>
						
						<XAxis dataKey="date" />
						<YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
						<Tooltip />
						<Legend />
						{MeroArea}
					</AreaChart >
				</ResponsiveContainer>
			</div>
		</div>
	);
}
