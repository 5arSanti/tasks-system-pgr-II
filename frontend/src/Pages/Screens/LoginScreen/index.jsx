import { Link } from "react-router-dom";
import "./styles.css";

const LoginScreen = () => {
    return (
        <div className="form-container">
            <h2>Login</h2>
            <input type="email" placeholder="Correo" />
            <input type="password" placeholder="Contraseña" />
            <button>Iniciar sesión</button>
            <p>
                ¿No tienes cuenta?{" "}
                <Link to={"/register"}>
                    <span>Regístrate</span>
                </Link>
            </p>
        </div>
    );
}

export { LoginScreen }  