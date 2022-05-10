import React from 'react';
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart, Line } from 'react-chartjs-2';
import moment from 'moment';

import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
ChartJS.register(...registerables);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 287; i >= 0; i--) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }

    for (let i = 287; i >= 0; i--) {
        // coinTimestamp.push(coinHistory?.data?.history[i]?.timestamp);
        coinTimestamp.push(moment(coinHistory?.data?.history[i]?.timestamp * 1000).format("MMM Do, h:mm:ss a"));
    }

    console.log(moment(1651276800 * 1000).format('MMM Do YYYY'))

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#22707d',
                borderColor: '#22707d',  
            },
        ],
    };

    const options = {
        scales: {
            x: {
                ticks: {
                    beginAtZero: true,
                    //max: 100
                },
            },
            y: {
                ticks: {
                    beginAtZero: true,
                    //max: 100
                },
            },
        },
    };


    return (

        <div className='chart'>
            <div className="price-container row">
                <h6 className="current">Current {coinName} Price: {currentPrice}</h6>
                {coinHistory?.data?.change > 0 ? (
                    <h6 className="changes green">{coinHistory?.data?.change}% <CaretUpOutlined /></h6>
                ) : (
                    <h6 className="changes red">{coinHistory?.data?.change}% <CaretDownOutlined /></h6>
                )}

            </div>
            <Line data={data} options={options} />
        </div>
    )
}

export default LineChart