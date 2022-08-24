import React from 'react'
import * as Mock from '@visx/mock-data';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import { Group } from "@visx/group";
import { LinearGradient } from '@vx/gradient';
import { AreaClosed, LinePath } from '@vx/shape';
import { curveMonotoneX } from "@visx/curve";
import { TooltipWithBounds, useTooltip, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { timeFormat } from "d3-time-format";
function GradientGraph() {
    // const getGreenToRed = (percent: any) => {
    //     const r = 255 * percent / 100;
    //     const g = 255 - (255 * percent / 100);
    //     return 'rgb(' + r + ',' + g + ',0)';
    // }
    const browserUsage = Mock.browserUsage;
    const data = browserUsage;
    console.log(data)
    const tooltipStyles = {
        ...defaultStyles,
        borderRadius: 4,
        background: "#161434",
        color: "#ADADD3",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      };

    let fireFox: any = []

    Object.entries(data).map(([k, v]) => {
        fireFox.push({
            "name": k,
            "value": v.Firefox,
            "date": v.date,

        })
    })
    let Mozilla: any = []

    Object.entries(data).map(([k, v]) => {
        Mozilla.push({
            "name": k,
            "value": v.Mozilla,
            "date": v.date,

        })
    })

    let GoogleChrome: any = []

    Object.entries(data).map(([k, v]) => {
        GoogleChrome.push({
            "name": k,
            "value": v['Google Chrome'],
            "date": v.date,

        })
    })
    let Safari: any = []

    Object.entries(data).map(([k, v]) => {
        Safari.push({
            "name": k,
            "value": v.Safari,
            "date": v.date,

        })
    })
    let MicrosoftEdge: any = []

    Object.entries(data).map(([k, v]) => {
        MicrosoftEdge.push({
            "name": k,
            "value": v['Microsoft Edge'],
            "date": v.date,

        })
    })
    const {
        showTooltip,
        hideTooltip,
        tooltipData,
        tooltipLeft = 0,
        tooltipTop = 0,
      } = useTooltip<typeof fireFox>();
    function abc(a) {

        a.map((d) => {
            // console.log(typeof new Date(d.date))
        })

    }
    abc(fireFox)
    const margin = {
        top: 60,
        bottom: 60,
        left: 80,
        right: 80,
    };
    const width = 750;
    const height = 400;



    const x = d => new Date(d.date);
    const y = d => d.value;



    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const xScale = scaleTime({
        range: [0, xMax],
        domain: extent(GoogleChrome, x)
    });
    console.log(xScale)
    const yScale = scaleLinear({
        range: [yMax, 0],
        domain: [0, parseInt(max(GoogleChrome, y)) + 2],
    });
    console.log(fireFox);
    return (
        <div className='ml-3 border-4'>

            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>

                <Group top={margin.top} left={margin.left}>
                    <AreaClosed<typeof fireFox>
                        data={fireFox}
                        x={(d) => xScale(x(d)) ?? 0}
                        y={(d) => yScale(y(d)) ?? 0}
                        yScale={yScale}
                        strokeWidth={1}
                        stroke="url(#area-gradient)"
                        fill="#E2006A"
                        fillOpacity= {0.4}
                        curve={curveMonotoneX}
                    />

                </Group>
                <Group top={margin.top} left={margin.left}>
                    <AreaClosed<typeof Mozilla>
                        data={Mozilla}
                        x={(d) => xScale(x(d)) ?? 0}
                        y={(d) => yScale(y(d)) ?? 0}
                        yScale={yScale}
                        strokeWidth={1}
                        stroke="url(#area-gradient)"
                        fill="#16A64D"
                        fillOpacity= {0.4}
                        curve={curveMonotoneX}
                    />
                </Group>
                <Group top={margin.top} left={margin.left}>
                    <AreaClosed<typeof GoogleChrome>
                                data={GoogleChrome}
                        x={(d) => xScale(x(d)) ?? 0}
                        y={(d) => yScale(y(d)) ?? 0}
                        yScale={yScale}
                        strokeWidth={1}
                        stroke="url(#area-gradient)"
                        fill="#004FB4"
                        fillOpacity={0.4}
                        curve={curveMonotoneX}
                    />
                </Group>
                <Group top={margin.top} left={margin.left}>
                    <AreaClosed<typeof Safari>
                        data={Safari}
                        x={(d) => xScale(x(d)) ?? 0}
                        y={(d) => yScale(y(d)) ?? 0}
                        yScale={yScale}
                        stroke="url(#area-gradient)"
                        strokeWidth={1}
                        fill="#0000FF"
                        fillOpacity= {0.4}
                        curve={curveMonotoneX}

                    />
                </Group>
                <Group top={margin.top} left={margin.left}>
                    <AreaClosed<typeof MicrosoftEdge>
                        data={MicrosoftEdge}
                        x={(d) => xScale(x(d)) ?? 0}
                        y={(d) => yScale(y(d)) ?? 0}
                        yScale={yScale}
                        stroke="url(#area-gradient)"
                        strokeWidth={2}
                        fill= "#A52A2"
                        fillOpacity= {0.4}
                        curve={curveMonotoneX}

                    />
                </Group>
                <Group top={margin.top} left={margin.left}>
                    <AreaClosed<typeof Mozilla>
                        data={Mozilla}
                        x={(d) => xScale(x(d)) ?? 0}
                        y={(d) => yScale(y(d)) ?? 0}
                        yScale={yScale}
                        stroke="url(#area-gradient)"
                        strokeWidth={2}
                        fill="#A9A9A9"
                        fillOpacity={0.4}
                        curve={curveMonotoneX}

                    />
                </Group>

                <Group >

                    <AxisBottom
                        scale={xScale}
                        top={yMax + margin.top}
                        left={margin.left}
                        label={''}
                        stroke={'#1b1a1e'}
                        // tickTextFill={'#1b1a1e'}
                    />
                </Group>
                <Group >
                    <AxisLeft
                        scale={yScale}
                        top={margin.top}
                        left={margin.left}
                        label={'Browser Usage'}
                        stroke={'#1b1a1e'}
                        // tickTextFill={'#1b1a1e'}
                    />
                </Group>
                



            </svg>
            {tooltipData ? (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <b>{`${timeFormat("%b %d, %Y")(
            new Date(x(tooltipData))
          )}`}</b>
          : {y(tooltipData)} percent
        </TooltipWithBounds>
      ) : null}
        </div>
    )
}

export default GradientGraph




// let InternetExplorer: any = []
//
// Object.entries(data).map(([k, v]) => {
//     InternetExplorer.push({
//         "name": k,
//         "value": v['Internet Explorer'],
//         "date": v.date,
//
//     })
// })
// let other: any = []
//
// Object.entries(data).map(([k, v]) => {
//     other.push({
//         "name": k,
//         "value": v['Other/Unknown'],
//         "date": v.date,
//
//     })
// })
// let Opera: any = []
//
// Object.entries(data).map(([k, v]) => {
//     Opera.push({
//         "name": k,
//         "value": v.Opera,
//         "date": v.date,
//
//     })
// })