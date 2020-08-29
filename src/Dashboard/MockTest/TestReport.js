-ewimport React, { Suspense } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	ResponsiveContainer,
	CartesianGrid,
	Tooltip,
	Legend
} from "recharts";



export default function TestReport({testGraphAccuracy, testGraphReport}){
    console.log(testGraphReport, 'Report')
    console.log(testGraphAccuracy, 'Accuracy')
    
	const data = [
		{ name: "Physics", Correct: 70, Attempted: 100 },
		{ name: "Chemistry", Correct: 70, Attempted: 100},
		{ name: "Botany", Correct: 70, Attempted: 100},
		{ name: "Zoology", Correct: 70, Attempted: 100 }
    ];
    // const data = [
    //     testGraphSubject.map((subject,index)=>{ return(
    //         console.log(subject))
    //     })
    // ]
    return(
        <React.Fragment>
        	<div className="sub-title">Your Test Report</div>
					<div className="practise-report">
						<div className="row">
                            <div className="col-md-12  col-lg-12 col-12">
								<div className="title-wrapper text-center">
									<strong>Average Monthly Accuracy Report</strong>
									<br />
									<small>Last 30 Days</small>
								</div>
								<div className="report-wrapper ">
									<ResponsiveContainer width="100%" height={300}>
										<BarChart width={730} height={250} data={testGraphReport}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="name" />
											<YAxis />
											<Tooltip />
											<Legend />
                                        <Bar dataKey="Attempted" fill="#4bb4b6" />  
										<Bar dataKey="Correct" fill="#25cb83" />
										</BarChart>
									</ResponsiveContainer>
								</div>
							</div>
						</div>
					</div>
         </React.Fragment>
    )
}