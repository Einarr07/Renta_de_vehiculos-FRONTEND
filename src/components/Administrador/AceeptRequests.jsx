import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AceeptRequests = () => {
  const [loading, setLoading] = useState(true);
  const [noVehiclesMessage, setNoVehiclesMessage] = useState('');
  const [solicitudes, setSolicitudes] = useState([]);
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);

  const obtenerVehiculosPendientes = async () => {
    try {
      const autenticado = localStorage.getItem('token');
      const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/solicitudes/pendientes`, {
        headers: {
          Authorization: `Bearer ${autenticado}`,
        },
      });

      console.log('Respuesta del servidor:', respuesta.data);

      if (respuesta.data.success && Array.isArray(respuesta.data.vehiculos_pendientes) && respuesta.data.vehiculos_pendientes.length > 0) {
        console.log('Vehículos pendientes del servidor:', respuesta.data.vehiculos_pendientes);
        setSolicitudes(respuesta.data.vehiculos_pendientes);
        setLoading(false);
      } else {
        setLoading(false);
        setNoVehiclesMessage('No hay vehículos pendientes.');
      }
    } catch (error) {
      console.error('Error al obtener la lista de vehículos pendientes:', error);
      setLoading(false);
      setNoVehiclesMessage('Error al obtener la lista de vehículos pendientes.');
    }
  };

  useEffect(() => {
    obtenerVehiculosPendientes();
  }, []);

  const handleAccept = async (solicitudId) => {
    try {
      const autenticado = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/estado/${solicitudId}`,
        { estado: 2 },
        {
          headers: {
            Authorization: `Bearer ${autenticado}`,
          },
        }
      );
      console.log('Solicitud de aceptación exitosa');
      obtenerVehiculosPendientes(); // Actualiza la lista después de aceptar
      window.alert('Vehículo aceptado');
    } catch (error) {
      console.error('Error al aceptar la solicitud:', error);
    }
  };

  const handleReject = async (solicitudId) => {
    try {
      const autenticado = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/estado/${solicitudId}`,
        { estado: 3 },
        {
          headers: {
            Authorization: `Bearer ${autenticado}`,
          },
        }
      );
      console.log('Solicitud de rechazo exitosa');
      obtenerVehiculosPendientes(); // Actualiza la lista después de rechazar
      window.alert('Vehículo rechazado');
    } catch (error) {
      console.error('Error al rechazar la solicitud:', error);
    }
  };


  const handleShowMoreInfo = (vehiculo) => {
    setSelectedVehiculo(vehiculo);
    setShowMoreInfoModal(true);
  };

  const handleCloseModal = () => {
    setSelectedVehiculo(null);
    setShowMoreInfoModal(false);
  };

  return (
    <>
      <div className="container mx-auto mt-5">
        <h2 className="text-center mb-4 text-4xl font-bold">Vehículos Pendientes</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : solicitudes.length === 0 ? (
          <p>{noVehiclesMessage}</p>
        ) : (
          <div className="row">
            {solicitudes.map((vehiculo) => (
              <div key={vehiculo.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="bg-white p-4 rounded-md shadow-md d-flex flex-column h-100">
                <img
                  src={vehiculo.image_url} 
                  alt="Imagen del vehículo"
                  className="w-full h-32 object-cover mb-4"
                />
                 <div className="mb-2 text-xl font-semibold">{vehiculo.marca}</div>
                  <div className="text-gray-600">${vehiculo.costo_alquiler} por día</div>
                  <div>Tipo de vehículo: {vehiculo.tipo_vehiculo}</div>
                  <div>Placas: {vehiculo.placas}</div>
                  <div>Número de pasajeros: {vehiculo.numero_pasajero}</div>
            
                <div className="mt-auto">
                  <div className="d-flex flex-column">
                    <button className="button-green mb-2" onClick={() => handleShowMoreInfo(vehiculo)}>
                      Más información
                    </button>
                    <button className="button-blue mb-2" onClick={() => handleAccept(vehiculo.id)}>
                      Aceptar
                    </button>
                    <button className="button-red" onClick={() => handleReject(vehiculo.id)}>
                      Rechazar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>

      {showMoreInfoModal && selectedVehiculo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-close close-button" onClick={handleCloseModal}>
              &times;
            </div>
            <>
              <h2>{selectedVehiculo.modelo}</h2>
              <p className="modal-detail">Marca: {selectedVehiculo.marca}</p>
              <p className="modal-detail">Tipo de vehículo: {selectedVehiculo.tipo_vehiculo}</p>
              <p className="modal-detail">Costo por día: ${selectedVehiculo.costo_alquiler}</p>
              <p className="modal-detail">Número de pasajeros: {selectedVehiculo.numero_pasajero}</p>
              <p className="modal-detail">Placas: {selectedVehiculo.placas}</p>
              <p className="modal-detail">Descripción: {selectedVehiculo.descripcion}</p>
              <p className="modal-detail">Contacto: {selectedVehiculo.contacto}</p>
              <img src={selectedVehiculo.image_url} alt="Imagen del vehículo" className="modal-image" />
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default AceeptRequests;
