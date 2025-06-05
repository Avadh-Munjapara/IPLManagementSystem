import React, { useEffect, useState } from 'react';
import ApiServices from '../services/ApiServices'; // ensure this contains necessary team APIs
import toast from 'react-hot-toast';

const ManageTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    owner: '',
    city: '',
  });

  const [editingTeamId, setEditingTeamId] = useState(null);

  // Fetch all teams
  const fetchTeams = async () => {
    try {
      const res = await ApiServices.getAllTeams();
      setTeams(res.data.teams); // assuming the response structure
    } catch (err) {
      toast.error('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update team
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTeamId) {
        await ApiServices.updateTeam(editingTeamId, form);
        toast.success('Team updated successfully');
      } else {
        await ApiServices.addTeam(form);
        toast.success('Team added successfully');
      }
      setForm({ name: '', owner: '', city: '' });
      setEditingTeamId(null);
      fetchTeams();
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  // Edit handler
  const handleEdit = (team) => {
    setForm({
      name: team.name,
      owner: team.owner,
      city: team.city,
    });
    setEditingTeamId(team._id);
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      try {
        await ApiServices.deleteTeam(id);
        toast.success('Team deleted');
        fetchTeams();
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Teams</h2>

      {/* Section 1: Add/Update Form */}
      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-3">{editingTeamId ? 'Update Team' : 'Add New Team'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Team Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="owner"
            value={form.owner}
            onChange={handleChange}
            placeholder="Owner Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full border p-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editingTeamId ? 'Update Team' : 'Add Team'}
          </button>
        </form>
      </div>

      {/* Section 2: List of Teams */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">All Teams</h3>
        {loading ? (
          <p>Loading teams...</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Owner</th>
                <th className="p-2 border">City</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id}>
                  <td className="p-2 border">{team.name}</td>
                  <td className="p-2 border">{team.owner}</td>
                  <td className="p-2 border">{team.city}</td>
                  <td className="p-2 border space-x-2">
                    <button onClick={() => handleEdit(team)} className="text-blue-600 font-semibold">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(team._id)} className="text-red-600 font-semibold">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {teams.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No teams found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageTeams;
