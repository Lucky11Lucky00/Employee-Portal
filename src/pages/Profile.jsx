import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaSave, FaPlus, FaTimes, FaLinkedin, FaGithub, FaCertificate, FaEye, FaDownload } from 'react-icons/fa';
import Modal from 'react-modal';
import './Profile.css';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [showCertForm, setShowCertForm] = useState(false);
  const [certModal, setCertModal] = useState({ isOpen: false, cert: '' });

  const [profile, setProfile] = useState({
    name: 'Ruthu',
    position: 'Senior Software Engineer',
    department: 'Product Development',
    skills: ['React', 'Node.js', 'AWS', 'Python', 'Docker'],
    joiningDate: '2020-03-15',
    contact: '+91 9876543210',
    email: 'ruthu@company.com',
    certifications: ['AWS Certified Developer', 'React Professional'],
    socialLinks: {
      linkedin: '',
      github: ''
    },
    projects: ['E-commerce Platform', 'Internal Tools Dashboard']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value }
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      toast.success('Skill added!');
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
    toast.info('Skill removed');
  };

  const handleAddCertification = () => {
    if (newCertification.trim() && !profile.certifications.includes(newCertification.trim())) {
      setProfile(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      toast.success('Certification added!');
      setNewCertification('');
      setShowCertForm(false);
    }
  };

  const handleRemoveCertification = (certToRemove) => {
    setProfile(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert !== certToRemove)
    }));
    toast.info('Certification removed');
  };

  const handleViewCertification = (certification) => {
    setCertModal({ isOpen: true, cert: certification });
  };

  const handleDownloadCertification = (certification) => {
    toast("Downloading: " + certification);
  };

  const handleSave = () => {
    toast.success('Profile saved successfully!');
    setEditMode(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="profile-portal">
      <ToastContainer position="top-right" autoClose={3000} />
      <Modal 
        isOpen={certModal.isOpen}
        onRequestClose={() => setCertModal({ isOpen: false, cert: '' })}
        className="cert-modal"
        overlayClassName="cert-modal-overlay"
      >
        <h3>Certification Detail</h3>
        <p>{certModal.cert}</p>
        <button onClick={() => setCertModal({ isOpen: false, cert: '' })}>Close</button>
      </Modal>

      <div className="profile-header">
        <h2><FaEdit /> Employee Profile</h2>
        <button className={`edit-btn ${editMode ? 'save' : ''}`} onClick={editMode ? handleSave : () => setEditMode(true)}>
          {editMode ? <><FaSave /> Save Profile</> : <><FaEdit /> Edit Profile</>}
        </button>
      </div>

      <div className="profile-grid">
        {/* Basic Information */}
        <div className="profile-card">
          <h3>Basic Information</h3>
          {editMode ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={profile.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input type="tel" name="contact" value={profile.contact} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={profile.email} onChange={handleChange} disabled />
              </div>
            </div>
          ) : (
            <div className="profile-details">
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Position:</strong> {profile.position}</p>
              <p><strong>Department:</strong> {profile.department}</p>
              <p><strong>Contact:</strong> {profile.contact}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Joining Date:</strong> {formatDate(profile.joiningDate)}</p>
            </div>
          )}
        </div>

        {/* Technical Skills */}
        <div className="profile-card">
          <h3>Technical Skills</h3>
          <div className="skills-container">
            {profile.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
                {editMode && <button className="remove-skill" onClick={() => handleRemoveSkill(skill)}><FaTimes /></button>}
              </span>
            ))}
          </div>
          {editMode && (
            <div className="add-skill">
              <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add new skill" onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()} />
              <button onClick={handleAddSkill}><FaPlus /></button>
            </div>
          )}
        </div>

        {/* Certifications */}
        <div className="profile-card">
          <h3><FaCertificate /> Certifications</h3>
          <ul className="certifications-list">
            {profile.certifications.map((cert, index) => (
              <li key={index}>
                <div className="certification-item">
                  <span>{cert}</span>
                  <div className="certification-actions">
                    <button className="view-cert-btn" onClick={() => handleViewCertification(cert)}><FaEye /> View</button>
                    <button className="download-cert-btn" onClick={() => handleDownloadCertification(cert)}><FaDownload /> Download</button>
                    {editMode && <button className="remove-cert-btn" onClick={() => handleRemoveCertification(cert)}><FaTimes /></button>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {editMode && (
            <div className="add-certification-section">
              {showCertForm ? (
                <div className="certification-form">
                  <input type="text" value={newCertification} onChange={(e) => setNewCertification(e.target.value)} placeholder="Enter certification name" onKeyPress={(e) => e.key === 'Enter' && handleAddCertification()} />
                  <button onClick={handleAddCertification}><FaSave /> Save</button>
                  <button onClick={() => setShowCertForm(false)}><FaTimes /> Cancel</button>
                </div>
              ) : (
                <button className="add-certification-btn" onClick={() => setShowCertForm(true)}><FaPlus /> Add Certification</button>
              )}
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="profile-card">
          <h3>Social Profiles</h3>
          {editMode ? (
            <div className="social-links-edit">
              <div className="form-group">
                <FaLinkedin className="social-icon" />
                <input type="url" placeholder="LinkedIn URL" value={profile.socialLinks.linkedin} onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)} />
              </div>
              <div className="form-group">
                <FaGithub className="social-icon" />
                <input type="url" placeholder="GitHub URL" value={profile.socialLinks.github} onChange={(e) => handleSocialLinkChange('github', e.target.value)} />
              </div>
            </div>
          ) : (
            <div className="social-links-view">
              {profile.socialLinks.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn Profile</a>}
              {profile.socialLinks.github && <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub Profile</a>}
              {!profile.socialLinks.linkedin && !profile.socialLinks.github && <p>No social profiles added</p>}
            </div>
          )}
        </div>

        {/* Recent Projects */}
        <div className="profile-card">
          <h3>Recent Projects</h3>
          <ul className="projects-list">
            {profile.projects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
