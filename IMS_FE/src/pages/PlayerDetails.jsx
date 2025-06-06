import React, { useEffect, useState } from 'react';
import ApiServices from '../services/ApiServices';
import Spinner from '../component/Spinner';

const PlayerDetails = () => {
  const id = localStorage.getItem('id')
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPlayer = async () => {
    try {
      const res = await ApiServices.getPlayerById(id); // API should return player details
      const data  = res.data;
      console.log(data);
      
      setPlayer(res.data.player);
    } catch (error) {
      console.error("Error fetching player details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayer();
  }, [id]);

  if (loading) return <Spinner />;
  if (!player) return <p className="p-6 text-red-500">Player not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={player.player.profile_pic || 'https://via.placeholder.com/150'}
          alt={player.name}
          className="w-40 h-40 mt-5 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{capitalize(player.player.name)}</h2>
          <p><span className="font-semibold">Jersey Number:</span> {player.jersey_number}</p>
          <p><span className="font-semibold">Role:</span> {capitalize(player.role)}</p>
          <p><span className="font-semibold">Matches Played:</span> {player.matches_played}</p>
          <p><span className="font-semibold">Runs:</span> {player.runs}</p>
          <p><span className="font-semibold">Wickets:</span> {player.wickets}</p>
          <p><span className="font-semibold">Catches:</span> {player.catches}</p>
          <p><span className="font-semibold">Stumpings:</span> {player.stumpings}</p>
        </div>
      </div>
    </div>
  );
};

const capitalize = (str) =>
  str?.split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' ');

export default PlayerDetails;
