import React, { useEffect, useState } from 'react';
import ApiServices from '../services/ApiServices';
import toast from 'react-hot-toast';

const ManageTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [logo,setlogo] = useState(null)
  const [form, setForm] = useState({
    name: '',
    tag_line: '',
    state: '',
    sort_name: '',
    owners: ''
  });
  const [editingTeamId, setEditingTeamId] = useState(null);

  const fetchTeams = async () => {
    try {
      const res = await ApiServices.getAllTeams();
      setTeams(res.data.teams || []);
      console.log(res)
    } catch (err) {
      console.log(err)
      toast.error('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();    
  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('tag_line', form.tag_line);
  formData.append('state', form.state);
  formData.append('sort_name', form.sort_name);
  formData.append('captain', form.captain);
  formData.append('owners', form.owners);
  if (logo) formData.append('logo',logo);

  try {
    const res = await ApiServices.createTeam(formData);
    const data = res.data;
    
    if (data.success) {
      toast.success('Team added successfully');
      setForm({
        name: '', tag_line: '', state: '',sort_name: '', owners: ''
      });
      setlogo(null)
      setEditingTeamId(null);
      setFormVisible(false);
      fetchTeams();
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    toast.error('Something went wrong');
  }
};

const handleLogoChange = (e) => {
  setlogo(e.target.files[0])
};

  const handleEdit = (team) => {
    setForm({
      name: team.name,
      tag_line: team.tag_line,
      state: team.state,
      logo: team.logo,
      sort_name: team.sort_name,
      owners: team.owners?.join(', ') || ''
    });
    setEditingTeamId(team._id);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      try {
        await ApiServices.deleteTeam({id});
        toast.success('Team deleted');
        fetchTeams();
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  const printOwnersName=(owners)=>{
    let names='';
    for(const owner of owners){
      names+=owner.name+" ";
    }
    return names;

  }

  return (
    <div className="p-5 w-full min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-4 text-center">Manage Teams</h2>

      {/* Toggle Form Button */}
      <div className="text-center mb-4">
        <button
          onClick={() => {
            setFormVisible(!formVisible);
            setEditingTeamId(null);
            setForm({
              name: '', tag_line: '', state: '', logo: '', sort_name: '', owners: ''
            });
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {formVisible ? 'Close Form' : 'Add New Team'}
        </button>
      </div>

      {/* Add/Update Form */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          formVisible ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Team Name" className="w-full border p-2 rounded" required />
            <input type="text" name="sort_name" value={form.sort_name} onChange={handleChange} placeholder="Short Name" className="w-full border p-2 rounded" />
            <input type="text" name="tag_line" value={form.tag_line} onChange={handleChange} placeholder="Tag Line" className="w-full border p-2 rounded" />
            <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State" className="w-full border p-2 rounded" required/>
            <input type="text" name="owners" value={form.owners} onChange={handleChange} placeholder="Owners ( multilple owners allowed )" className="w-full border p-2 rounded" />
            <input type="file"  name="logo"  accept="image/*" onChange={handleLogoChange} className="w-full border p-2 rounded"/>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editingTeamId ? 'Update Team' : 'Add Team'}
          </button>
        </form>
      </div>

      {/* List of Teams */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">All Teams</h3>
        {loading ? (
          <p>Loading teams...</p>
        ) : !Array.isArray(teams) || teams.length === 0 ? (
          <p className="text-gray-500 text-center">No teams found.</p>
        ) : (
          <div className="space-y-6">
            {teams.map((team) => (
              <div key={team._id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-4">
                {team.logo && (
                  <img src={team.logo} alt="Team Logo" className="w-30 h-30 object-contain rounded" />
                )}
                <div className="flex-1">
                  <h4 className="text-xl font-bold">{team.name}</h4>
                  <p className="text-sm text-gray-600">Tagline: {team.tag_line}</p>
                  <p className="text-sm text-gray-600">State: {team.state}</p>
                  {/* <p className="text-sm text-gray-600">Captain: {team.captain.name}</p> */}
                  <p className="text-sm text-gray-600">
                    Owners: {      printOwnersName(team.owners)
}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(team)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(team._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
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

export default ManageTeams;
