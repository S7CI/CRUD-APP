function agregar() {
    var nombre = document.getElementById("nombre").value;
    var id = generarId();
    var fecha = obtenerFechaActual();
    
    if (nombre) {
      var data = {
        nombre: nombre,
        id: id,
        fecha: fecha
      };
  
      var registros = JSON.parse(localStorage.getItem("registros")) || [];
      registros.push(data);
      localStorage.setItem("registros", JSON.stringify(registros));
      
      mostrarRegistros();
      
      document.getElementById("nombre").value = "";
    } else {
      alert("Por favor ingrese un nombre.");
    }
  }
  
  function generarId() {
    var registros = JSON.parse(localStorage.getItem("registros")) || [];
    var ultimoId = 0;
  
    registros.forEach(function(registro) {
      var id = parseInt(registro.id);
      if (id > ultimoId) {
        ultimoId = id;
      }
    });
  
    // Comenzar desde 45678
    var nuevoId = ultimoId >= 45678 ? ultimoId + 1 : 45678;
    return nuevoId.toString();
  }
  
  
  function obtenerFechaActual() {
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var año = fecha.getFullYear();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
  
    if (dia < 10) {
      dia = "0" + dia;
    }
    if (mes < 10) {
      mes = "0" + mes;
    }
    if (hora < 10) {
      hora = "0" + hora;
    }
    if (minutos < 10) {
      minutos = "0" + minutos;
    }
    if (segundos < 10) {
      segundos = "0" + segundos;
    }
  
    return dia + "/" + mes + "/" + año + " " + hora + ":" + minutos + ":" + segundos;
  }
  
  function mostrarRegistros() {
    var registros = JSON.parse(localStorage.getItem("registros")) || [];
    var tablaBody = document.getElementById("tabla-body");
    tablaBody.innerHTML = "";
    
    registros.forEach(function(registro) {
      var row = "<tr>";
      row += "<td>" + registro.nombre + "</td>";
      row += "<td>" + registro.id + "</td>";
      row += "<td>" + registro.fecha + "</td>";
      row += "<td><button class='btn-editar' onclick='editar(\"" + registro.id + "\")'>Editar</button></td>";
      row += "</tr>";
      tablaBody.innerHTML += row;
    });
  }
  
  function editar(id) {
    var registros = JSON.parse(localStorage.getItem("registros")) || [];
    
    registros.forEach(function(registro) {
      if (registro.id === id) {
        var nuevoNombre = prompt("Ingrese el nuevo nombre:");
        if (nuevoNombre) {
          registro.nombre = nuevoNombre;
          localStorage.setItem("registros", JSON.stringify(registros));
          mostrarRegistros();
        }
      }
    });
  }
  
  function eliminar(id) {
    if (confirm("¿Estás seguro de borrar este registro?")) {
      var registros = JSON.parse(localStorage.getItem("registros")) || [];
      registros = registros.filter(function(registro) {
        return registro.id !== id;
      });
      localStorage.setItem("registros", JSON.stringify(registros));
      mostrarRegistros();
    }
  }
  
  mostrarRegistros();
  