import React from 'react'
import { useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import * as Mock from '@visx/mock-data';
import plus from '../plus.png'
import minus from '../minus.png'
function PieChart() {
    
    const getGreenToRed = (percent) => {
        const r = 255 * percent / 100;
        const g = 255 - (255 * percent / 100);
        return 'rgb(' + r + ',' + g + ',0)';
    }
    const browserUsage = Mock.browserUsage;
    const data = browserUsage[0];
    delete data["date"];
    
    let dataArray: any = []
    let i=0
    Object.entries(data).map(([k, v]) => {
        dataArray.push({
            "name": k,
            "value": v,
            "color": getGreenToRed(i++*40)
        })
    })
    
    const [active, setActive] = useState(null);
    const [height, setheight] = useState(200);
    const [width, setwidth] = useState(200);
    const [fontSize, setfontSize] = useState(10);
    
    const half = width / 2;
    return (
        <div className='mt-3 p-2 border-2 border-black rounded-md'>
            <svg width={width} height={height}>
                <Group top={half} left={half}>
                    <Pie 
                        data={dataArray}
                        pieValue={(data:any) => data.value}
                        outerRadius={half}
                        innerRadius={({ data }) => {
                            const size = active && active.value == data.value ? 30 : 25;
                            return half - size;
                          }}
                        padAngle={0.01}
                    >
                         {(pie) => {
                            return pie.arcs.map((arc) => {
                                console.log(arc);
                                return (
                                    <g
                                        key={arc.data.name}
                                        onMouseEnter={() => setActive(arc.data)}
                                       onMouseLeave={() => setActive(null)}
                                    >
                                        <path d={pie.path(arc)} fill={arc.data.color}></path>
                                    </g>
                                );
                            });
                        }} 
                    </Pie>
                            
                    {active && (
                        <>
                            

                            <Text
                                textAnchor="middle"
                                fill={active.color}
                                fontSize={fontSize}
                                dy={20}
                            >
                                {`${active.value} ${active.name}`}
                            </Text>
                        </>
                    )
                }
                   

                </Group>
                
                
            </svg>
            <button onClick={()=> {setheight(height+10)
            setwidth(width+10)
            setfontSize(fontSize+2)}  }><img src={plus}  /></button>
            <button className='ml-1'  onClick={()=> {setheight(height-10)
            setwidth(width-10)
            setfontSize(fontSize-2)}}><img src = {minus}/></button>
        </div>
    )
}

export default PieChart