import React, { useEffect, useState } from 'react';
import ApiServices from '../services/ApiServices';
import toast from 'react-hot-toast';

const ManagePlayer = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [editingPlayerId, setEditingPlayerId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    jersy_number: '',
    mathces_played: 0,
    runs: 0,
    fours: 0,
    sixes: 0,
    wickets: 0,
    catches: 0,
    stumpings: 0,
    role: '',
  });

  const fetchPlayers = async () => {
    try {
      const res = await ApiServices.getPlayers();
      setPlayers(res.data.players || []);
    } catch (err) {
      toast.error('Failed to fetch players');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'mathces_played' || name === 'runs' || name === 'fours' || name === 'sixes' || name === 'wickets' || name === 'catches' || name === 'stumpings'
        ? parseInt(value)
        : value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (image) formData.append('image', image);

    try {
      const res = editingPlayerId
        ? await ApiServices.updatePlayer(editingPlayerId, formData)
        : await ApiServices.createPlayer(formData);

      if (res.data.success) {
        toast.success(`Player ${editingPlayerId ? 'updated' : 'added'} successfully`);
        setForm({
          name: '',
          jersy_number: '',
          mathces_played: 0,
          runs: 0,
          fours: 0,
          sixes: 0,
          wickets: 0,
          catches: 0,
          stumpings: 0,
          role: '',
        });
        setImage(null);
        setEditingPlayerId(null);
        setFormVisible(false);
        fetchPlayers();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const handleEdit = (player) => {
    setForm({
      name: player.name,
      jersy_number: player.jersy_number,
      mathces_played: player.mathces_played,
      runs: player.runs,
      fours: player.fours,
      sixes: player.sixes,
      wickets: player.wickets,
      catches: player.catches,
      stumpings: player.stumpings,
      role: player.role,
    });
    setEditingPlayerId(player._id);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      try {
        await ApiServices.deletePlayer({ id });
        toast.success('Player deleted');
        fetchPlayers();
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div className="p-5 w-full min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-4 text-center">Manage Players</h2>

      <div className="text-center mb-4">
        <button
          onClick={() => {
            setFormVisible(!formVisible);
            setEditingPlayerId(null);
            setForm({
              name: '',
              jersy_number: '',
              mathces_played: 0,
              runs: 0,
              fours: 0,
              sixes: 0,
              wickets: 0,
              catches: 0,
              stumpings: 0,
              role: '',
            });
            setImage(null);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {formVisible ? 'Close Form' : 'Add New Player'}
        </button>
      </div>

      <div className={`transition-all duration-500 overflow-hidden ${formVisible ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded-lg shadow mb-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label className="block font-medium">Player Name</label>
      <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
    </div>

    <div>
      <label className="block font-medium">Jersey Number</label>
      <input type="text" name="jersy_number" value={form.jersy_number} onChange={handleChange} className="w-full border p-2 rounded" />
    </div>

    <div>
      <label className="block font-medium">Matches Played</label>
      <input type="number" name="mathces_played" value={form.mathces_played} onChange={handleChange} className="w-full border p-2 rounded" />
    </div>

    <div>
      <label className="block font-medium">Runs</label>
      <input type="number" name="runs" value={form.runs} onChange={handleChange} className="w-full border p-2 rounded" />
    </div>

    <div>
      <label className="block font-medium">Fours</label>
      <input type="number" name="fours" value={form.fours} onChange={handleChange} className="w-full border p-2 rounded" />
    </div>

    <div>
      <label className="block font-medium">Sixes</label>
      <input type="number" name="sixes" value={form.sixes} onChange={handleChange} className="w-full border p-2 rounded" />
    </div>

    <div>
      <label className="block font-medium">Wickets</label>
      <input type="number" name="wickets" value={form.wickets} onChange={handleChange} className="w-full border p-2 rounded" />
    </div>

    <div>
      <label className="block font-medium">Catches</label>
      <input type="number" name="catches" value={form.catches} onChange={handleChange} className="w-full border p-2 rounded" />
    </div>

    <div>
      <label className="block font-medium">Stumpings</label>
      <input type="number" name="stumpings" value={form.stumpings} onChange={handleChange} className="w-full border p-2 rounded" />
    </div>

    <div>
      <label className="block font-medium">Role</label>
      <input type="text" name="role" value={form.role} onChange={handleChange} placeholder="Batsman/Bowler/All-rounder" className="w-full border p-2 rounded" />
    </div>

    <div>
      <label className="block font-medium">Player Image</label>
      <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="w-full border p-2 rounded" />
    </div>
  </div>

  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
    {editingPlayerId ? 'Update Player' : 'Add Player'}
  </button>
</form>

      </div>

      <div className="bg-white p-5 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">All Players</h3>
        {loading ? (
          <p>Loading players...</p>
        ) : !Array.isArray(players) || players.length === 0 ? (
          <p className="text-gray-500 text-center">No players found.</p>
        ) : (
          <div className="space-y-6">
            {players.map((player) => (
              <div key={player._id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-4">
                {player.image && (
                  <img src={player.image} alt="Player" className="w-24 h-24 object-contain rounded-full" />
                )}
                <div className="flex-1">
                  <h4 className="text-xl font-bold">{player.name}</h4>
                  <p className="text-sm text-gray-600">Role: {player.role}</p>
                  <p className="text-sm text-gray-600">Jersey No: {player.jersy_number}</p>
                  <p className="text-sm text-gray-600">Matches: {player.mathces_played}</p>
                  <p className="text-sm text-gray-600">Runs: {player.runs} | 4s: {player.fours} | 6s: {player.sixes}</p>
                  <p className="text-sm text-gray-600">Wickets: {player.wickets} | Catches: {player.catches} | Stumpings: {player.stumpings}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(player)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(player._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePlayer;
