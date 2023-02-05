import React from 'react'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';


function SemiCircleProgressBar({ value }) {

    let value_int = (value / 5) * 100
    return (
        <CircularProgressbarWithChildren
            value={value_int}
            circleRatio={0.6}
            strokeWidth={12}
            styles={{
                root: {
                    transform: "rotate(-108deg)",
                },
                path: { stroke: "#7D52E9", strokeLinecap: "round", strokeWidth: 12 },
                trail: { stroke: "rgba(128,128,200, 0.4)", strokeLinecap: "round",},
            }}
        >
            <div style={{ fontSize: 24, marginTop: -30, textAlign:'center' }}>
                <strong style={{display: 'block'}}>{value}</strong>
                <small style={{fontSize: 12}}>Cumulative CGPA</small>
            </div>
        </CircularProgressbarWithChildren>
    )
}

export default SemiCircleProgressBar