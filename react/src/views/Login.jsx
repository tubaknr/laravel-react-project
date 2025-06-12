import { Link } from 'react-router-dom';

export default function Login() {
    const onSubmit = (ev) => {
        ev.preventDefault();
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <h1 className="title">Login to your account</h1>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="btn btn-block">Login</button>
                <p className="message">
                    Not registered? <Link to="/signup">Create an account</Link>
                </p>
            </form>
        </>
    );
}
