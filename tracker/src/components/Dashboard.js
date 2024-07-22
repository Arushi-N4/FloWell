import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import logo from '../img/p3.jpeg';

const Dashboard = () => {
    const [startDate, setStartDate] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/api/period', { startDate });
            setData(response.data);
        } catch (error) {
            setError('Error retrieving the data.');
            console.error('Error!', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard">
            <h1>FloWell - Track Your Menstrual Health</h1>
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="FloWell Logo" className="logo" />
                <div className="form-row">
                    <label>
                        Start Date:
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Tracking...' : 'Track'}
                    </button>

                </div>

            </form>


            {error && <p className="error">{error}</p>}

            {data && !loading && (


                <div className="results">
                    <div className="next-cycle">
                        <h3>Next Cycle Start Date</h3>
                        <p>{data.nextCycleStartDate}</p>
                    </div>


                    <div className="phase">

                        <h3>Menstrual Phase</h3>
                        <p>Menstrual start date: <span>{data.menstrualPhase.join(', ')}</span></p>
                        <p>Foods to Eat:</p>
                        <ul>
                            {data.recommendations.menstrual.foodsToEat.map(food => (
                                <li key={food}>{food}</li>
                            ))}
                        </ul>
                        <p>Foods to Avoid:</p>
                        <ul>
                            {data.recommendations.menstrual.foodsToAvoid.map(food => (
                                <li key={food}>{food}</li>
                            ))}
                        </ul>
                        <p>Exercises:</p>
                        <ul>
                            {data.recommendations.menstrual.exercises.map(exercise => (
                                <li key={exercise}>{exercise}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="phase">
                        <h3>Ovulation Phase</h3>
                        <p>Expected date of ovulation phase:<span> {data.ovulationPhase.join(', ')}</span></p>
                        <p>Foods to Eat:</p>
                        <ul>
                            {data.recommendations.ovulation.foodsToEat.map(food => (
                                <li key={food}>{food}</li>
                            ))}
                        </ul>
                        <p>Foods to Avoid:</p>
                        <ul>
                            {data.recommendations.ovulation.foodsToAvoid.map(food => (
                                <li key={food}>{food}</li>
                            ))}
                        </ul>
                        <p>Exercises:</p>
                        <ul>
                            {data.recommendations.ovulation.exercises.map(exercise => (
                                <li key={exercise}>{exercise}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="phase">
                        <h3>Luteal Phase</h3>
                        <p>Expected date of luteal phase:<span>{data.lutealPhase.join(', ')}</span></p>
                        <p>Foods to Eat:</p>
                        <ul>
                            {data.recommendations.luteal.foodsToEat.map(food => (
                                <li key={food}>{food}</li>
                            ))}
                        </ul>
                        <p>Foods to Avoid:</p>
                        <ul>
                            {data.recommendations.luteal.foodsToAvoid.map(food => (
                                <li key={food}>{food}</li>
                            ))}
                        </ul>
                        <p>Exercises:</p>
                        <ul>
                            {data.recommendations.luteal.exercises.map(exercise => (
                                <li key={exercise}>{exercise}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
