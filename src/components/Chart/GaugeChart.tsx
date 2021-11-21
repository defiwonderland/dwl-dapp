import React from "react";
import ReactApexChart from "react-apexcharts";
import { GaugeChartProps } from "./types";
import { useWindowWidth } from "../../hooks/useWindowWidth";

const GaugeChart: React.FC<GaugeChartProps> = ({ label, series }) => {
    const windowWidth = useWindowWidth(600)
    const width: number = windowWidth ? 180 : 200

    const chartOption = {
        chart: {
            height: 350,
            offsetY: -10
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                    name: {
                        fontSize: '16px',
                        offsetY: 120
                    },
                    value: {
                        offsetY: 76,
                        fontSize: '22px',
                        formatter: function (val: number) {
                            return val + "%";
                        }
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                shadeIntensity: 0.15,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 65, 91]
            },
        },
        stroke: {
            dashArray: 4
        },

        labels: ['']
    }

    return (
        <>
            <ReactApexChart
                options={chartOption}
                series={series}
                type="radialBar"
                height={185}
                width={width}
            />
        </>
    );
};

export default GaugeChart;