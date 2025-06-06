import React, { useContext, useEffect, useState } from 'react';
import ApiServices from '../services/ApiServices';
import loadingContext from '../contexts/LoadingContext';

const ManageTeamTo = () => {
    const [team, setTeam] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        tag_line: '',
        short_name: '',
        logo: null,
        squad: [],
        captain: ''
    });
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const {loading,setLoading}=useContext(loadingContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await ApiServices.getTemaByOwner(localStorage.getItem('id'));
                setLoading(false);
                setTeam(response.data.team);
                setFormData({
                    name: response.data.team.name,
                    tag_line: response.data.team.tag_line,
                    short_name: response.data.team.short_name || '',
                    squad: response.data.team.squad || [],
                    captain: response.data.team.captain || ''
                });
                setPreview(response.data.team.logo);
            } catch (error) {
                console.error("Error fetching teams:", error);
                setMessage('Error fetching team details');
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            logo: file
        }));
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null) {
                    formDataToSend.append(key, formData[key]);
                }
            });
            formDataToSend.append('id', team._id);

            const response = await ApiServices.editTeamForTo(formDataToSend);
            if (response.data.success) {
                setMessage('Team updated successfully');
                setIsEditing(false);
                // Refresh team data
                const updatedTeam = await ApiServices.getTemaByOwner(localStorage.getItem('id'));
                setTeam(updatedTeam.data.team);
            }
        } catch (error) {
            setMessage('Error updating team');
            console.error("Error updating team:", error);
        }
    };

    if (!team) {
        return <div className="text-center p-4">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Team</h2>
            {message && (
                <div className="mb-4 p-3 bg-blue-100 text-blue-900 rounded">
                    {message}
                </div>
            )}

            {!isEditing ? (
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Team Details</h3>
                            <p><span className="font-medium">Name:</span> {team.name}</p>
                            <p><span className="font-medium">Tag Line:</span> {team.tag_line}</p>
                            <p><span className="font-medium">Short Name:</span> {team.short_name || 'N/A'}</p>
                            <p><span className="font-medium">State:</span> {team.state}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Team Logo</h3>
                            {team.logo && (
                                <img 
                                    src={team.logo} 
                                    alt="Team logo" 
                                    className="w-32 h-32 object-contain"
                                />
                            )}
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Edit Team
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Team Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Tag Line</label>
                                <input
                                    type="text"
                                    name="tag_line"
                                    value={formData.tag_line}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Short Name</label>
                                <input
                                    type="text"
                                    name="short_name"
                                    value={formData.short_name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Team Logo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border rounded"
                                />
                                {preview && (
                                    <img 
                                        src={preview} 
                                        alt="Team logo preview" 
                                        className="mt-2 w-32 h-32 object-contain"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                        <button 
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ManageTeamTo;