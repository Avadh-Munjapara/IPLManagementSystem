import React, { useEffect, useState } from 'react';
import PlayerCard from '../component/PlayerCard';
import ApiServices from '../services/ApiServices';
import Spinner from '../component/Spinner';

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlayers = async () => {
    try {
      const res = await ApiServices.getPlayers(); // adjust based on your API method
      setPlayers(res.data.data);
    } catch (error) {
      console.error("Failed to fetch players", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">All Players</h1>
      {loading ? (
        <Spinner />
      ) : !players  ? (
        <p className="text-gray-600">No players found.</p>
      ) : (
        players.map((player) => <PlayerCard key={player._id} player={player} />)
      )}
    </div>
  );
};

export default AllPlayers;
