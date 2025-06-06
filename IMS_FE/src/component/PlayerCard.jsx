// components/PlayerCard.jsx
import React from 'react';

const PlayerCard = ({ player }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center gap-4 mb-5">
      <img
        src={player.player.profile_pic || 'https://via.placeholder.com/100'} // default if no image
        alt={player.player.name}
        className="w-24 h-24 rounded-full object-cover border"
      />
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">{capitalize(player.player.name)}</h2>
        <p><span className="font-semibold">Team:</span> {player.playing_for.name}</p>
        <p><span className="font-semibold">Jersey:</span> {player.jersey_number}</p>
        <p><span className="font-semibold">Role:</span> {capitalize(player.role)}</p>
        <p><span className="font-semibold">Matches:</span> {player.matches_played}</p>
        <p><span className="font-semibold">Runs:</span> {player.runs}, <span className="font-semibold">Wickets:</span> {player.wickets}</p>
        <p><span className="font-semibold">Catches:</span> {player.catches}, <span className="font-semibold">Stumpings:</span> {player.stumpings}</p>
      </div>
    </div>
  );
};

const capitalize = (str) =>
  str
    ?.split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

export default PlayerCard;