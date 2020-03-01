import React from "react";
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

const data1 = [
	{
		name: "Sun",
		Math: 20,
		Science: 24,
		English: 28
	},
	{
		name: "Mon",
		Math: 23,
		Science: 12,
		English: 34
	},
	{
		name: "Tue",
		Math: 23,
		Science: 56,
		English: 26
	},
	{
		name: "Wed",
		Math: 15,
		Science: 26,
		English: 14
	},
	{
		name: "Thu",
		Math: 35,
		Science: 39,
		English: 5
	},
	{
		name: "Fri",
		Math: 23,
		Science: 15,
		English: 56
	},
	{
		name: "Sat",
		Math: 37,
		Science: 29,
		English: 68
	}
];
const data2 = [
	{
		name: "Sun",
		Math: 20,
		Science: 24,
		English: 28
	},
	{
		name: "Mon",
		Math: 23,
		Science: 12,
		English: 34
	},
	{
		name: "Tue",
		Math: 23,
		Science: 56,
		English: 26
	},
	{
		name: "Wed",
		Math: 15,
		Science: 26,
		English: 14
	},
	{
		name: "Thu",
		Math: 35,
		Science: 39,
		English: 5
	},
	{
		name: "Fri",
		Math: 23,
		Science: 15,
		English: 56
	},
	{
		name: "Sat",
		Math: 37,
		Science: 29,
		English: 68
	}
];
const data3 = [
	{
		name: "Sun",
		Math: 20,
		Science: 24,
		English: 28
	},
	{
		name: "Mon",
		Math: 23,
		Science: 12,
		English: 34
	},
	{
		name: "Tue",
		Math: 23,
		Science: 56,
		English: 26
	},
	{
		name: "Wed",
		Math: 15,
		Science: 26,
		English: 14
	},
	{
		name: "Thu",
		Math: 35,
		Science: 39,
		English: 5
	},
	{
		name: "Fri",
		Math: 23,
		Science: 15,
		English: 56
	},
	{
		name: "Sat",
		Math: 37,
		Science: 29,
		English: 68
	}
];
export default function PractiseWeeklyReport() {
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
						data={data2}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5
						}}
					>
                        <defs>
    <linearGradient id="colorMath" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorScience" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorEnglish" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#23ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#23ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
						
						<XAxis dataKey="name" />
						<YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
						<Tooltip />
						<Legend />
						<Area
							type="monotone"
							dataKey="Math"
							stroke="#8884d8"
                            activeDot={{ r: 8 }}
                            fillOpacity={1} fill="url(#colorMath)"
						/>
						<Area type="monotone" dataKey="Science" stroke="#82ca9d" fillOpacity={1} fill="url(#colorScience)"/>
						<Area type="monotone" dataKey="English" stroke="#12679d" fillOpacity={1} fill="url(#colorEnglish)" />
					</AreaChart >
				</ResponsiveContainer>
			</div>
		</div>
	);
}
