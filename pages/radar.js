import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import firebase from '../firebase/clientApp';

const RadarDiv = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection('data')
            .doc('data')
            .onSnapshot((snapshot) => {
                const data = snapshot.data().dataArray;
                setChartData(data);
            });
    }, []);

    const data = {
        labels: [
            'Eating',
            'Drinking',
            'Sleeping',
            'Designing',
            'Coding',
            'Cycling',
            'Running'
        ],
        datasets: [
            {
                label: 'Shintaroa',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: chartData
            }
        ]
    };

    const options = {
        scale: {
            ticks: {
                max: 100,
                min: 0,
                stepSize: 10
            }
        }
    };

    return (
        <div>
            <Radar data={data} options={options} width={400} height={400} />
        </div>
    );
};

export default RadarDiv;