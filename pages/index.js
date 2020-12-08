import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import firebase from '../firebase/clientApp';
import RadarGraph from './radar';

export default function Home() {
    const [inputData, setInputData] = useState(Array(7).fill(null));

    const createUser = async () => {
        const db = firebase.firestore();
        await db
            .collection('data')
            .doc('data')
            .update({ dataArray: inputData });
    };

    const labels = [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running'
    ];

    return (
        <div className="container">
            <Head>
                <title>Radar Chart</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="title">Radar Chart</h1>
                <div className="inputDiv">
                    {[...Array(7)].map((_, i) => (
                        <div className="inputUnit" key={`inputUnit_${i}`}>
                            <p key={`inputLabel_${i}`}>{labels[i]}</p>
                            <input
                                key={`inputData_${i}`}
                                className="inputArea"
                                onChange={(event) => {
                                    const newInputData = inputData.slice();
                                    newInputData[i] = event.target.value;
                                    setInputData(newInputData);
                                }}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={createUser}>submit</button>
                <RadarGraph />
            </main>

            <style jsx>{`
                .container {
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                main {
                    padding: 5rem 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                footer {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                footer img {
                    margin-left: 0.5rem;
                }

                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                button {
                    font-size: 1.5em;
                    margin: 1em 0;
                }

                a {
                    color: blue;
                    font-size: 1.5em;
                }

                .title a {
                    color: #0070f3;
                    text-decoration: none;
                }

                .title a:hover,
                .title a:focus,
                .title a:active {
                    text-decoration: underline;
                }

                .title {
                    margin: 0;
                    line-height: 1.15;
                }

                .title,
                .description {
                    text-align: center;
                }

                .description {
                    line-height: 1.5;
                    font-size: 1.5rem;
                }

                code {
                    background: #fafafa;
                    border-radius: 5px;
                    padding: 0.75rem;
                    font-size: 1.1rem;
                    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                        DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                        monospace;
                }

                .grid {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    max-width: 800px;
                    margin-top: 3rem;
                }

                .card {
                    margin: 1rem;
                    flex-basis: 45%;
                    padding: 1.5rem;
                    text-align: left;
                    color: inherit;
                    text-decoration: none;
                    border: 1px solid #eaeaea;
                    border-radius: 10px;
                    transition: color 0.15s ease, border-color 0.15s ease;
                }

                .card:hover,
                .card:focus,
                .card:active {
                    color: #0070f3;
                    border-color: #0070f3;
                }

                .card h3 {
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                }

                .card p {
                    margin: 0;
                    font-size: 1.25rem;
                    line-height: 1.5;
                }

                @media (max-width: 600px) {
                    .grid {
                        width: 100%;
                        flex-direction: column;
                    }
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
}
