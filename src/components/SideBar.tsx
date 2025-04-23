import { NavLink } from 'react-router-dom';

const SideBar = () => {
    return (
        <aside className="sidebar">
            <div style={{ fontWeight: 'bold', textAlign: 'center', margin: '20px', fontSize: '30px' }}>
                Menu
            </div>

            <nav>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '10px' }}>
                        <NavLink
                            to="/dashboard"
                            style={({ isActive }) => ({
                                fontWeight: 'bold',
                                fontSize: '20px',
                                textDecoration: 'none',
                                color: isActive ? 'blue' : 'inherit',
                            })}
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <NavLink
                            to="/search"
                            style={({ isActive }) => ({
                                fontWeight: 'bold',
                                fontSize: '20px',
                                textDecoration: 'none',
                                color: isActive ? 'blue' : 'inherit',
                            })}
                        >
                            Search Scores
                        </NavLink>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <NavLink
                            to="/reports"
                            style={({ isActive }) => ({
                                fontWeight: 'bold',
                                fontSize: '20px',
                                textDecoration: 'none',
                                color: isActive ? 'blue' : 'inherit',
                            })}
                        >
                            Reports
                        </NavLink>
                    </li>
                    {/* <li style={{ marginBottom: '10px' }}>
                        <NavLink
                            to="/settings"
                            style={({ isActive }) => ({
                                fontWeight: 'bold',
                                fontSize: '25px',
                                textDecoration: 'none',
                                color: isActive ? 'blue' : 'inherit',
                            })}
                        >
                            Settings
                        </NavLink>
                    </li> */}
                </ul>
            </nav>


        </aside>
    );
};

export default SideBar;
