const { data } = require("vis-network");

module.exports = function (app, databaseService) {
 
  /*........................ PerfilesDoctores.................... */

  app.put("/modPerfil", (request, response) => {
    const { Usuario, Nombre, Especialidad, ApellidoPaterno, ApellidoMaterno } =
      request.body;
    databaseService
      .changeProfileData(
        Usuario,
        Nombre,
        Especialidad,
        ApellidoPaterno,
        ApellidoMaterno
      )
      .then(response.send("PerfiL MODIFICADO"))
      .catch((e) => response.status(500).json(e));
  });

  app.get('/AdminDoctores', (request, response) => {
    const { Doctor } = request.query;
    databaseService.getPerfilDoc(Doctor)
        .then(Doctor => {
            response.json(Doctor);
        }).catch(e => response.status(500).json(e));
});

  /*........................Inventario.................... */

  app.get("/Inventario", (request, response) => {
    databaseService
      .getInventario()
      .then((producto) => {
        response.json(producto);
      })
      .catch((e) => response.status(500).json(e));
  });

  app.post("/AgregarProducto", (request, response) => {
    const newProduct = request.body;
    console.log(
      newProduct
    );
    databaseService
      .setProducto(
        newProduct
      )
      .then(() => {
        response.json({ msj: "Producto Agregado Correctamente" });
      })
      .catch((e) => {
        response.status(500).json(e);
      });
  });

  app.post("/removeProducto", (request, response) => {
    const { ID } = request.query;
    databaseService
      .deleteProducto(ID)
      .then(() => {
        response.send("Producto eliminado");
      })
      .catch((error) => {
        console.error(error);
        response.status(500).json({ error: 'Error interno del servidor' });
      });
  });
  

  app.get("/productoesp", (request, response) => {
    const {ID} = request.query;
    databaseService
      .getProductoEspecifico(ID)
      .then((producto) => {
        response.json(producto);
      })
      .catch((e) => response.status(500).json(e));
  });

  app.get("/obtenerProductos", (request, response) => {
    databaseService
      .getProductos() // Sin pasar ningún parámetro adicional.
      .then((productos) => {
        // Ordenar los productos por NombreProducto en orden ascendente.
        productos.sort((a, b) => a.NombreProducto.localeCompare(b.NombreProducto));
        response.json(productos);
      })
      .catch((e) => response.status(500).json(e));
  });
  

  app.put("/modProducto", (request, response) => {
    const { ID, NombreProducto, Descripcion, CantidadDisponible, PrecioUnitario } =
      request.body;
    databaseService
      .changeProductData(
        ID,
        NombreProducto,
        Descripcion,
        CantidadDisponible,
        PrecioUnitario
      )
      .then(response.send("Producto MODIFICADO"))
      .catch((e) => response.status(500).json(e));
  });


  /*....................Historial................*/

  app.get("/Historiales", (request, response) => {
    databaseService
      .getHistoriales()
      .then((historial) => {
        response.json(historial);
      })
      .catch((e) => response.status(500).json(e));
  });

  app.post("/crearHistorial", (request, response) => {
    const newHistory = request.body;
    console.log(newHistory);

    databaseService
      .setPaciente(
        newHistory
      )

      .catch((e) => {
        response.status(500).json(e);
      });

    databaseService
      .setHistorial(newHistory)
      .then(() => {
        response.json({ msj: "Historial Creado" });
      })
      .catch((e) => {
        response.status(500).json(e);
      });
  });

  app.put("/modHistorial", (request, response) => {
    const { ID, Nombre, ApellidoPaterno, ApellidoMaterno, Edad, Historial, Comentarios, ID_Paciente, TipoSangre, NumeroTel, Alergias, Padecimientos } =
      request.body;
    databaseService
      .changeHistoryData(
        ID,
        Nombre,
        ApellidoPaterno,
        ApellidoMaterno,
        Edad,
        Historial,
        Comentarios,
        ID_Paciente,
        TipoSangre,
        NumeroTel,
        Alergias,
        Padecimientos
      )
      .catch((e) => response.status(500).json(e));
    databaseService.changePacientData(
      ID_Paciente,
      Nombre,
      ApellidoPaterno,
      ApellidoMaterno,
      TipoSangre,
      Edad,
      NumeroTel,
      Alergias,
      Padecimientos
    )
      .then(response.send("Historial MODIFICADO"))
      .catch((e) => response.status(500).json(e));
  });

  app.get("/historialesp", (request, response) => {
    const {ID_Paciente} = request.query;
    databaseService
      .getHistorialEspecifico(ID_Paciente)
      .then((historial) => {
        response.json(historial);
      })
      .catch((e) => response.status(500).json(e));
  });
  /*....................Citas................*/

  app.get("/verCitas", (request, response) => {
    databaseService
      .getCitas()
      .then((cita) => {
        response.json(cita);
      })
      .catch((e) => response.status(500).json(e));
  });

  app.post("/crearCita", (request, response) => {
    const newCita = request.body;
    console.log(newCita);
    databaseService.setCliente(newCita).catch((e) => {
      response.status(500).json(e);
    });
    databaseService
      .setCita(newCita)
      .then(() => {
        response.json({ msj: "Cita Creada" });
      })
      .catch((e) => {
        response.status(500).json(e);
      });
  });

  app.put("/modCita", (request, response) => {
    const { ID_citas, ID_Cliente, ID_Doctor, FechaHora, Estado, asunto } =
      request.body;
    databaseService
      .changeCitaData(
        ID_citas,
        ID_Cliente,
        ID_Doctor,
        FechaHora,
        Estado,
        asunto
      )
      .then(response.send("Cita MODIFICADA"))
      .catch((e) => response.status(500).json(e));
  }
  );

  app.delete("/removeCita", (request, response) => {
    const ID_citas = 0;
    databaseService
      .deleteCita(ID_citas)
      .then((Fincas) => {
        response.send("Cita eliminada");
      })
      .catch((e) => response.status(500).json(e));
  }
  );

};
