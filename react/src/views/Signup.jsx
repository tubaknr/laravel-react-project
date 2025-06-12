import { useRef } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';

// Kullanıcı bilgisi ve token'ı merkezi context'ten almak ve güncellemek için.
import { useStateContext } from '../contexts/ContextProvider';

export default function Signup() {
    // form inputlarınınn değerlerini DOM üzerinden almak için: Uncontrolled components
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    // setUser: giriş yapan kullanıcının bilgilerini kaydeder
    // setToken: auth tokeni kaydeder
    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        // sayfayı yenileme:
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        // console.log(payload);

        // POST REQUEST:
        axiosClient
            // server a '/signup' endpoint'ine POST iateği göder:
            .post('/signup', payload)
            .then(({ data }) => {
                //AuthController.php'den dönen kısım: $data'nın içine atılır: user, token
                // başarılı olursa:
                // kullanıcı ve auth token, context e kaydedilir
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                console.log("ERR:", err);
                const response = err.response;
                console.log("RESPONSE:" , response);
                if (response && response.status === 422) {
                    //422 Unprocessable Entity
                    console.log(response.data.errors);
                }
            });
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <h1 className="title">Signup for free</h1>
                <input ref={nameRef} placeholder="Full Name" />
                <input ref={emailRef} type="email" placeholder="Email Address" />
                <input ref={passwordRef} type="password" placeholder="Password" />
                <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
                <button className="btn btn-block">Signup</button>
                <p className="message">
                    Already Registered? <Link to="/login">Sign in</Link>
                </p>
            </form>
        </>
    );
}
