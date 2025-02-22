import { Link } from "react-router-dom";

const RegisterScreen = () => {
    return (
        <div className="form-container">
            <h2>Registro</h2>
            <input type="text" placeholder="Nombre" />
            <input type="text" placeholder="Apellido" />
            <input type="email" placeholder="Correo" />
            <input type="password" placeholder="Contraseña" />
            <input type="text" placeholder="Cédula" />
            <button>Registrarse</button>
            <p>
                ¿Ya tienes cuenta?{" "}
                <Link to={"/login"}>
                    <span>Iniciar Sesion</span>
                </Link>
            </p>
        </div>
    );
}

export { RegisterScreen };