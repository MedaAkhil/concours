import React, { useState } from 'react';
import './App.css'
const NewPlayer = () => {
    const [teamName, setTeamName] = useState('');
    const [teamSize, setTeamSize] = useState('');
    const [domain, setDomain] = useState('');
    const [problemStmt, setProblemStmt] = useState('');

    const domainOptions = {
        "Artificial Intelligence": [
            'AI in Healthcare',
            'Natural Language Processing',
            'Computer Vision',
            'AI Ethics and Privacy',
        ],
        "Internet of Things": [
            'Smart Home Automation',
            'Industrial IoT for Manufacturing',
            'IoT in Agriculture',
            'IoT Security Challenges',
        ],
        "Renewable Energy": [
            'Solar Energy Optimization',
            'Wind Energy Forecasting',
            'Battery Storage Solutions',
            'Green Building Technologies',
        ],
        "Education Technology": [
            'Personalized Learning Platforms',
            'E-Learning Engagement Tools',
            'Virtual Classrooms',
            'Adaptive Testing Systems',
        ],
    };

    const insert = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teamName: teamName,
                    teamSize: teamSize,
                    domain: domain,
                    problemStmt: problemStmt,
                }),
            });
            if (response.ok) {
                alert("Team added successfully!");
                setTeamName('');
                setTeamSize('');
                setDomain('');
                setProblemStmt('');
            } else {
                alert("Failed to add team.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className='MainDiv'>
            <form onSubmit={insert}>
                <input 
                    type="text" 
                    placeholder="Enter Team Name" 
                    value={teamName}
                    required
                    onChange={(e) => setTeamName(e.target.value)}
                />
                <input 
                    type="number" 
                    placeholder="Enter Team Size(3-4)" 
                    value={teamSize}
                    required
                    onChange={(e) => setTeamSize(e.target.value)}
                />
                
                {/* Domain Dropdown */}
                <select 
                required
                    value={domain} 
                    onChange={(e) => {
                        setDomain(e.target.value);
                        setProblemStmt(''); // Reset problem statement when domain changes
                    }}
                >
                    <option value="">Select Domain</option>
                    {Object.keys(domainOptions).map((domain, index) => (
                        <option key={index} value={domain}>
                            {domain}
                        </option>
                    ))}
                </select>

                {/* Problem Statement Dropdown */}
                <select 
                required
                    value={problemStmt} 
                    onChange={(e) => setProblemStmt(e.target.value)} 
                    disabled={!domain} // Disable until a domain is selected
                >
                    <option value="">Select Problem Statement</option>
                    {domain && domainOptions[domain].map((problem, index) => (
                        <option key={index} value={problem}>
                            {problem}
                        </option>
                    ))}
                </select>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NewPlayer;
