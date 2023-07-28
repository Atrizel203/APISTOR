const databaseService = () => {
  const knex = require("knex")({
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB,
    },
  });

  const tabla = "doctores";
  const tabla2 = "Pacientes_registrados";
  const tabla3 = "citas";
  const tabla4 = "clientes";
  const tabla5 = "historial";
  const tabla6 = "inventario";

  const getPerfilDoc = async (Doctor) => {
    const resultado = await knex(tabla)
      .select()
      .where({ Usuario: Doctor })
      .first();
    return resultado;
  };

  const changeProfileData = async (
    Usuario,
    Nombre,
    Especialidad,
    ApellidoPaterno,
    ApellidoMaterno
  ) => {
    const resultado = await knex(tabla).where({ Usuario: Usuario }).update({
      Nombre: Nombre,
      ApellidoPaterno: ApellidoPaterno,
      ApellidoMaterno: ApellidoMaterno,
      Especialidad: Especialidad,
    });
    return console.log(resultado);
  };

  const getCitas = () => {
    return knex(tabla3)
      .select()
      .join(tabla4, (tabla3.ID_Cliente = tabla4.id_clientes));
  };

  const getInventario = () => {
    return knex(tabla6).select();
  };

  const setProducto = ({ID,
    NombreProducto,
    Descripcion,
    CantidadDisponible,
    PrecioUnitario}
    
  ) => {
    return knex(tabla6).insert({
      ID: ID,
      NombreProducto: NombreProducto,
      Descripcion: Descripcion,
      CantidadDisponible: CantidadDisponible,
      PrecioUnitario: PrecioUnitario,
    });
  };

  const deleteProducto = (ID) => {
    return knex(tabla6).where({ ID: ID }).del();
  };

  const getProductos = async () => {
    try {
      const resultado = await knex('DB_SS.inventario')
        .select()
        .groupBy('NombreProducto')
        .orderBy('NombreProducto', 'desc');
  
      return resultado;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      return [];
    } finally {
      knex.destroy(); // Cierra la conexión a la base de datos cuando la consulta haya finalizado.
    }
  };

  const getProductoEspecifico = (NombreProducto) => {
    const resultado = knex(tabla6)
      .select()
      .where("NombreProducto", "like", "%" + NombreProducto + "%");
    return resultado;
  };

  const getHistorialEspecifico = (idPaciente) => {
    const resultado = knex()
      .select().where({idPaciente: idPaciente})
      .from(tabla5)
      .innerJoin(tabla2)
      ;
    return resultado;
  };

  const getHistorial = (ID) => {
    const resultado = knex(tabla5)
      .select()
      .where({ ID: ID })
      .first();
    return resultado;
  };

  const getPaciente = (idPaciente) => {
    const resultado = knex(tabla2)
      .select()
      .where({ idPaciente: idPaciente })
      .first();
    return resultado;
  };
  const getHistoriales =  () => {
    const resultado = knex(tabla2)
      .select('idPaciente', 'Nombre', 'ApellidoPaterno', 'ApellidoMaterno')
    return resultado;
  };

  const setHistorial = ({ ID, Valoracion1, Valoracion2, Valoracion3, Consulta1, Consulta2, Consulta3, Estudios, Resultados, id_paciente }) => {
    return knex(tabla5).insert({
      ID: ID,
      Valoracion1: Valoracion1,
      Valoracion2: Valoracion2,
      Valoracion3: Valoracion3,
      Consulta1: Consulta1,
      Consulta2: Consulta2,
      Consulta3: Consulta3,
      Estudios: Estudios,
      Resultados: Resultados,
      id_paciente: id_paciente,
    });
  };

  const setPaciente = ({
    idPaciente,
    Nombre,
    ApellidoPaterno,
    ApellidoMaterno,
    TipoSangre,
    Edad,
    Telefono,
    Alergias,
    Enfermedades,
    Peso,
    Altura,
    Medicamentos,

  }) => {
    return knex(tabla2).insert({
      idPaciente: idPaciente,
      Nombre: Nombre,
      ApellidoPaterno: ApellidoPaterno,
      ApellidoMaterno: ApellidoMaterno,
      Edad: Edad,
      TipoSangre: TipoSangre,
      Alergias: Alergias,
      Enfermedades: Enfermedades,
      Peso: Peso,
      Altura: Altura,
      Medicamentos: Medicamentos,
      Telefono: Telefono,
    });
  };

  const setCita = ({ID_Doctor, Comentarios, Horario,  ID_Cliente}) => {
    return knex(tabla3).insert({
      ID_Doctor: ID_Doctor,
      Comentarios: Comentarios,
      Horario: Horario,
      ID_Cliente: ID_Cliente,
    });
  };

  const setCliente = () => {
    return knex(tabla4).insert({
      id_clientes: id_clientes,
      Nombre_cliente: Nombre_cliente,
      ApellidoP_cliente: ApellidoP_cliente,
      ApellidoM_cliente: ApellidoM_cliente,
    });
  };

  const changeHistoryData = async (
    ID,
     Valoracion1,
      Valoracion2,
      Valoracion3,
      Consulta1,
      Consulta2,
      Consulta3,
     Estudios,
      Resultados,
  ) => {
    const resultado = await knex(tabla5).where({ ID: ID }).update({
      Valoracion1: Valoracion1,
      Valoracion2: Valoracion2,
      Valoracion3: Valoracion3,
      Consulta1: Consulta1,
      Consulta2: Consulta2,
      Consulta3: Consulta3,
      Estudios: Estudios,
      Resultados: Resultados,
    });
    return console.log(resultado);
  };

  const changePacientData = async (
    idPaciente,
       Nombre,
       ApellidoPaterno,
       ApellidoMaterno,
       TipoSangre,
       Edad,
       Telefono,
       Alergias,
       Enfermedades,
       Peso,
       Altura,
       Medicamentos
    ) => {
      const resultado = await knex(tabla2).where({ idPaciente: idPaciente }).update({
        Nombre: Nombre,
        ApellidoPaterno: ApellidoPaterno,
        ApellidoMaterno: ApellidoMaterno,
        TipoSangre: TipoSangre,
        Edad: Edad,
        Telefono: Telefono,
        Alergias: Alergias,
        Enfermedades: Enfermedades,
        Peso: Peso,
        Altura: Altura,
        Medicamentos: Medicamentos,
      });
      return console.log(resultado);
    };

    const changeCitaData = async (  ID_doctor, Comentarios, Horario, ID_Cliente) => {
      const resultado = await knex(tabla3).where({ ID_citas: ID_citas }).update({
        ID_doctor: ID_doctor,
        Comentarios: Comentarios,
        Horario: Horario,
        ID_Cliente: ID_Cliente,
      });
      return console.log(resultado);
    };

    const deleteCita = (ID_Cliente) => {
      return knex(tabla3).where({ ID_Cliente: ID_Cliente }).del();
    };

    const changeProductData = async (
      ID,
      NombreProducto,
      Descripcion,
      CantidadDisponible,
      PrecioUnitario
    ) => {
      const resultado = await knex(tabla6).where({ ID: ID }).update({
        NombreProducto: NombreProducto,
        Descripcion: Descripcion,
        CantidadDisponible: CantidadDisponible,
        PrecioUnitario: PrecioUnitario,
      });
      return console.log(resultado);
    };

  return {
    getCitas,
    getHistoriales,
    getInventario,
    getPerfilDoc,
    changeProfileData,
    setProducto,
    deleteProducto,
    setHistorial,
    setPaciente,
    setCita,
    setCliente,
    getProductoEspecifico,
    changeHistoryData,
    changePacientData,
    changeCitaData,
    deleteCita,
    changeProductData,
    getHistorialEspecifico,
    getProductos,
    getHistorial,
    getPaciente,
  };
};

module.exports = { databaseService };
