import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

export default function GuestLayout() {
    const { token } = useStateContext();

    // user is logged in
    if (token) {
        return <Navigate to="/users" />;
    }

    return (
        <>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
