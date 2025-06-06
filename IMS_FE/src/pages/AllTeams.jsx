import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApiServices from '../services/ApiServices';

const AllTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    try {
    //   setLoading(true);
      const response = await ApiServices.getAllTeams() // Replace with your API endpoint
      setTeams(response.data.teams);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }finally{
        setLoading(false)
    }
  }
const printOwnersName = (owners) => {
  return owners
    .map(owner =>
      owner.name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    )
    .join(', ');
};


  useEffect(() => {
      fetchTeams()
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">All Teams</h2>

      {teams.map((team, index) => (
        <div
          key={index}
          className="bg-gray-100 rounded-lg shadow-md p-4 mb-6 flex items-center"
        >
          <img
            src={team.logo}
            alt={team.name}
            className="w-28 h-28 object-contain mr-6"
          />
          <div>
            <h3 className="text-xl font-semibold capitalize">{team.name}</h3>
            <p className="text-gray-700">
              <strong>Tagline:</strong> {team.tag_line}
            </p>
            <p className="text-gray-700">
              <strong>State:</strong> {team.state}
            </p>
            <p className="text-gray-700">
              <strong>Owners:</strong> {printOwnersName(team.owners)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllTeams;
