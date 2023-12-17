import { Link } from 'react-router-dom';
import { useState } from 'react';
import Mensaje from '../Alertas/Mensaje';
import axios from 'axios';
import vehiculosPropietarios from "../../assets/images/vehiculosPropietarios.jpeg";
export const RegisterPropietario = () => {
    const [mensaje, setMensaje] = useState({})
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
        email: "",
        password: ""
    })
    // Estados para la longitud de los campos
    const [nombreLength, setNombreLength] = useState(0);
    const [apellidoLength, setApellidoLength] = useState(0);
    const [direccionLength, setDireccionLength] = useState(0);
    const [telefonoLength, setTelefonoLength] = useState(0);
    const [emailLength, setEmailLength] = useState(0);
    const [passwordLength, setPasswordLength] = useState(0);

    const handleChange = (e) => {
        const newValue = e.target.value;
        const maxLengths = {
            nombre: 30,
            apellido: 30,
            direccion: 60,
            telefono: 10,
            email: 50, 
            password: 20 
        };

        // Validar si el campo de teléfono solo contiene números
        if (e.target.name === "telefono" && !/^\d*$/.test(newValue)) {
            return; // Si no son números, no actualices el estado
        }

        if (newValue.length <= maxLengths[e.target.name]) {
            setForm({
                ...form,
                [e.target.name]: newValue
            });

            // Actualizar la longitud según el campo correspondiente
            switch (e.target.name) {
                case "nombre":
                    setNombreLength(newValue.length);
                    break;
                case "apellido":
                    setApellidoLength(newValue.length);
                    break;
                case "direccion":
                    setDireccionLength(newValue.length);
                    break;
                case "telefono":
                    setTelefonoLength(newValue.length);
                    break;
                case "email":
                    setEmailLength(newValue.length);
                    break;
                case "password":
                    setPasswordLength(newValue.length);
                    break;
                default:
                    break;
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/registro`
            const respuesta = await axios.post(url, form)
            setMensaje({ respuesta: respuesta.data.msg, tipo: true })
            setForm({})
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
        }
    }

    return (
        <>
            <div className="bg-white min-h-screen flex justify-center items-center">
  <div className="w-full md:w-1/2 h-screen">
    <div className="md:w-4/5 sm:w-full">
      <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">Bienvenido</h1>
      <small className="text-gray-400 block my-4 text-sm">Como propietario tienes la opción de poder rentar vehículos a 
      nuestros clientes.
      <br />Ingresa tus datos para poder registrarte:</small>
      {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="nombre">
                                Nombre ({nombreLength}/30):
                            </label>
                            <input type="text" id="nombre" name='nombre'
                                value={form.nombre || ""} onChange={handleChange}
                                placeholder="Ingresa tu nombre" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="apellido">
                                Apellido ({apellidoLength}/30):
                            </label>
                            <input type="text" id="apellido" name='apellido'
                                value={form.apellido || ""} onChange={handleChange}
                                placeholder="Ingresa tu apellido" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="direccion">
                                Dirección ({direccionLength}/60):
                            </label>
                            <input type="text" id="direccion" name='direccion'
                                value={form.direccion || ""} onChange={handleChange}
                                placeholder="Ingresa tu dirección" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="telefono">
                                Teléfono ({telefonoLength}/10):
                            </label>
                            <input type="tel" id="telefono" name='telefono'
                                value={form.telefono || ""} onChange={handleChange}
                                placeholder="Ingresa tu teléfono" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="email">Correo electrónico ({emailLength}/50):</label>
                            <input type="email" id="email" name='email'
                            value={form.email || ""} onChange={handleChange}
                            placeholder="Ingresa tu correo electrónico" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="password">Contraseña ({passwordLength}/20):</label>
                            <input type="password" id="password" name='password'
                                value={form.password || ""} onChange={handleChange}
                                placeholder="********************" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <button className="bg-gray-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">Registrar</button>
                        </div>
                    </form>

                    <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                        <hr className="border-gray-400" />
                        <p className="text-center text-sm"></p>
                        <hr className="border-gray-400" />
                    </div>

      <div className="mt-3 text-sm flex justify-between items-center">
        <p>¿Ya tienes una cuenta? Dirígete al login para poder iniciar sesión.</p>
        <Link to="/login" className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white mr-4">Iniciar sesión</Link>
      </div>
    </div>
  </div>
  <div
      className={`hidden sm:block w-full md:w-1/2 h-screen bg-cover bg-center bg-no-repeat float-right`}
      style={{ backgroundImage: `url(${vehiculosPropietarios})` }}
    ></div>
</div>

        </>
    )
}
export default RegisterPropietario;