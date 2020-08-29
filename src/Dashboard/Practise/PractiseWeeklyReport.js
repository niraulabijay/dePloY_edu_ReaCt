import React, {useState, useEffect} from "react";
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


export default function PractiseWeeklyReport({practiseReport, loading, practiseSubject}) {
	
	  console.log(practiseReport)

	

	return (
		<div className="report-wrapper ">
			<div className="title d-flex justify-content-between">
				<span className="prev">
					<i className="fa fa-caret-left"></i>
				</span>
				<div className="title-wrapper">
					<strong>Weekly Report</strong>
					<small>Last 7 Days</small>
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
							{
								practiseSubject.map((subject, index)=>{ return(
								<linearGradient id={"color"+subject} x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%"  stopColor="red" stopOpacity={0.9}/>
								<stop offset="95%" stopColor="red" stopOpacity={0}/>
							  </linearGradient>
								)})
							}
   

  </defs>
						
						<XAxis dataKey="date" />
						<YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
						<Tooltip />
						<Legend />
						{console.log(practiseReport)}
						
					{
						practiseSubject.map((subject, index)=>{ return(
						
							<Area
							type="monotone"
							dataKey={subject}
							stroke={"url(#color"+subject+")"}
							fillOpacity={1} fill={"url(#color"+subject+")"}
							
						/>)})
					}
							
							
						
					
											
					
						
					
					</AreaChart >
				</ResponsiveContainer>
			</div>
		</div>
	);
}
