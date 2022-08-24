import React, { useState } from 'react'
import * as Mock from '@visx/mock-data';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { scaleTime, scaleLinear, scaleBand } from '@vx/scale';
import { extent, max } from 'd3-array';
import { Group } from "@visx/group";
import { LinearGradient } from '@vx/gradient';
import { AreaClosed, Bar } from '@vx/shape';
import plus from '../plus.png'
import minus from '../minus.png'
import { localPoint } from "@visx/event";
import { TooltipWithBounds, useTooltip, defaultStyles } from "@visx/tooltip";
import { timeFormat } from "d3-time-format";



function BarGraph() {

  const browserUsage = Mock.browserUsage;
  const data = browserUsage.slice(0, 50);
  //console.log(data)
  const [height, setheight] = useState(750);
  const [width, setwidth] = useState(400);
  const tooltipStyles = {
    ...defaultStyles,
    borderRadius: 4,
    background: "black",
    color: "white",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  };



  // console.log(dataArray)
  let fireFox: any = []

  Object.entries(data).map(([k, v]) => {
    fireFox.push({
      "name": k,
      "value": v.Firefox,
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
      // console.log(new Date(d.date))
    })

  }
  abc(fireFox)
  const margin = {
    top: 60,
    bottom: 60,
    left: 80,
    right: 80,
  };
  // const width =750;
  // const height = 400;
  const x = d => new Date(d.date);
  const y = d => d.value;
 // console.log(typeof (max(fireFox, y)))
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(fireFox, x),

  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, parseInt(max(fireFox, y)) + 2],
  });
  console.log(typeof fireFox[1].date);
  return (
    <div className='ml-3 border-4 relative'>

      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>

        <Group top={margin.top} left={margin.left}>
          {fireFox.map((d:any) => {
            const xValue = x(d);
            const barWidth = 3;
            const barHeight = yMax - (yScale(y(d)) ?? 0);
            const barX = xScale(xValue);
            const barY = yMax - barHeight;
            return (
              <Bar

                key={`bar-${xValue}`}

                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill="orange"
                onMouseMove={(
                  event:
                    | React.TouchEvent<SVGRectElement>
                    | React.MouseEvent<SVGRectElement>
                ) => {
                  const point = localPoint(event);

                  if (!point) return;

                  showTooltip({
                    tooltipData: d,
                    tooltipTop: point.y,
                    tooltipLeft: point.x,
                  });
                }}
                onMouseLeave={() => hideTooltip()}
              />
            )
          })}
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
            label={'Browser Usage (Firefox)'}
            stroke={'#1b1a1e'}
            // tickTextFill={'#1b1a1e'}
          />
        </Group>
      </svg>
      <button onClick={() => {
        setheight(height + 10)
        setwidth(width + 10)
      }}><img src={plus} /></button>
      <button className='ml-1' onClick={() => {
        setheight(height - 10)
        setwidth(width - 10)
      }}><img src={minus} /></button>

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

export default BarGraph