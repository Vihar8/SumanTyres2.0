import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import JWTContext from '../contexts/JWTContext';

const AuthGuard = ({ children, allowedRoles }) => {
    const { isLoggedIn, user, isInitializing, logout } = useContext(JWTContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(user)

    useEffect(() => {
        if (isInitializing) return; 

        if (!isLoggedIn) {
            navigate('/', {
                state: { from: location.pathname },
                replace: true
            });
        } else if (allowedRoles && !allowedRoles.includes(user?.role)) {
            if (allowedRoles && !allowedRoles.includes(user?.role)) {
                navigate('/dashboard', { replace: true });
            } else {
                // Logout or redirect to home for other role violations
                logout();
                navigate('/', { replace: true });
            }
        }
    }, [isLoggedIn, allowedRoles, user?.role, navigate, location.pathname, isInitializing]);

    return !isInitializing && (allowedRoles.includes(user?.role) ? children : null);
};

AuthGuard.propTypes = {
    children: PropTypes.node.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default AuthGuard;
