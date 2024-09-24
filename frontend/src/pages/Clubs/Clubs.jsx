import React, { useState, useEffect } from "react";
import "./Clubs.css";

const ClubSection = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clubs');
      const data = await response.json();
      setClubs(data);
      if (data.length > 0) {
        setSelectedClub(data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clubs:', error);
      setLoading(false);
    }
  };

  const handleClubChange = async (e) => {
    const clubName = e.target.value;
    try {
      const response = await fetch(`http://localhost:5000/api/clubs/${clubName}`);
      const data = await response.json();
      setSelectedClub(data);
    } catch (error) {
      console.error('Error fetching club details:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!selectedClub) {
    return <div className="no-data">No club data available</div>;
  }

  const {
    name = '',
    slogan = '',
    logo = '',
    facultyIncharge = [],
    events = [],
    teams = [],
    objectives = [],
    socialLinks = {}
  } = selectedClub;

  return (
    <div className="club-section">
     

      <header className="hero">
        <div className="hero-content">
          <img src={logo} alt={`${name} Logo`} className="club-logo" />
          <h1>{name}</h1>
          <div className="faculty-incharge">
            <h3>Faculty In-charge:</h3>
            {facultyIncharge.map((faculty, index) => (
              <p key={index}>{faculty}</p>
            ))}
          </div>
          <p className="hero-slogan">{slogan}</p>
          <select className="club-select" onChange={handleClubChange}>
            {clubs.map((club) => (
              <option key={club.name} value={club.name}>
                {club.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <section className="featured-events">
        <h2>Featured Events</h2>
        <div className="featured-event-cards">
          {events.map((event, index) => (
            <div className="featured-event" key={index}>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-member-cards">
          {teams.map((member, index) => (
            <div className="team-member" key={index}>
              <h3>{member.name}</h3>
              <p>{member.position}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="objectives">
        <h2>Club Objectives</h2>
        <ul>
          {objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      </section>

     
    </div>
  );
};

export default ClubSection;
