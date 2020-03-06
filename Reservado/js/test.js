var expect = chai.expect;

describe(" Testea funcion reservaHorario" , function(){
  it("Cuando se reserva el horario de un restaurante, el horario correspondiente se elimina del arreglo",function(){
   var entrada = "13:00";
   var restauranteSeleccionado = listadoDeRestaurantes[0];
   restauranteSeleccionado.reservarHorario(entrada);
   expect(restauranteSeleccionado.horarios.length).to.equal(2);
   expect(restauranteSeleccionado.horarios[0]).to.equal("15:30");
   expect(restauranteSeleccionado.horarios[1]).to.equal("18:00");

  });

  it("Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual",function(){
    var restauranteSeleccionado = listadoDeRestaurantes[3];
    restauranteSeleccionado.reservarHorario("19:00");
    expect(restauranteSeleccionado.horarios.length).to.equal(3);
    expect(restauranteSeleccionado.horarios[0]).to.equal("12:00");
    expect(restauranteSeleccionado.horarios[1]).to.equal("15:00");
    expect(restauranteSeleccionado.horarios[2]).to.equal("17:30");
   });

   it("Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual",function(){
    var restauranteSeleccionado = listadoDeRestaurantes[4];
    restauranteSeleccionado.reservarHorario();
    expect(restauranteSeleccionado.horarios.length).to.equal(3);
    expect(restauranteSeleccionado.horarios[0]).to.equal("12:00");
    expect(restauranteSeleccionado.horarios[1]).to.equal("13:30");
    expect(restauranteSeleccionado.horarios[2]).to.equal("16:00");
   });

});

//test obtener calificación
describe(" Testea funcion obtener calificacion " , function(){
  it("Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente",function(){
   var restauranteSeleccionado = listadoDeRestaurantes[8];
   expect(restauranteSeleccionado.obtenerPuntuacion()).to.equal(7.3);
  });


  it("Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0",function(){
    var restauranteSeleccionado = new Restaurant(55,"New Emanuel Cafe", "Merienda", "Londres", ["12:30", "14:00", "14:30"], "../img/desayuno3.jpg",[]);
    expect(restauranteSeleccionado.obtenerPuntuacion()).to.equal(0);
   });

});

//test Funcion Calificar
describe(" Testea funcion calificar " , function(){
  it("Dado un restaurant que tiene calificación, se qgrega una nueva puntacion que es mayor a 0 y menor que 10",function(){
   var nuevaCalificacion = 11;
   var restauranteSeleccionado = listadoDeRestaurantes[9];
   restauranteSeleccionado.calificar(nuevaCalificacion);
   expect(restauranteSeleccionado.calificaciones.length).to.equal(5);
  });
});

//test Funcion buscar restaurante
describe(" Testea funcion buscar restaurante " , function(){
  it("Dado un restaurant se lo busca por su id",function(){
   var listadoDeRestaurantes= listado.buscarRestaurante(10);
   expect(listadoDeRestaurantes.id).to.equal(10);
  });
});

//test Funcion obtener restaurante
describe('Testeo función obtenerRestaurantes', function () {
  it('Pruebo que una búsqueda válida y pruebo que sea instancia de Restaurant.', function () {
      var restoPruebaInstancia = listado.buscarRestaurante(24);
      expect(restoPruebaInstancia).to.be.an.instanceof(Restaurant);
  });

  it('Pruebo filtro Nueva York, Asática, 18:00, debe devolver solo TAO Uptown.', function () {
    var restoFiltrado4 = listado.obtenerRestaurantes('Asiática', 'Nueva York', '18:00');
    expect(restoFiltrado4[0].nombre).to.equal('TAO Uptown');
  });
});

describe(" Testea funcion buscar restaurante por filtrado " , function(){
  it("Dado un restaurant se lo busca por su  rubro, ubicacion y horario",function(){
   var respuestaRestaurantes = listado.obtenerRestaurantes('Asiática' , 'Londres', '14:30');
   expect(respuestaRestaurantes[0].id).to.equal(2);
  });
});

describe(" Testea funcion buscar restaurante por filtrado con parametros nulos " , function(){
  it("Dado un restaurant con parametros nulos, retorna la lista de restaurante",function(){
   var respuestaRestaurantes = listado.obtenerRestaurantes(null , null, null);
   expect(respuestaRestaurantes.length).to.equal(24);
  });
});

describe(" Testea funcion buscar restaurante por filtrado sin parametros " , function(){
  it("Dado un restaurant sin parametros, devuelve un array vacio",function(){
   var respuestaRestaurantes = listado.obtenerRestaurantes();
   expect(respuestaRestaurantes.length).to.equal(0);
  });
});


//test del objeto reserva
describe('Testeo las funcionalidades de los objetos Reserva.', function () {
  var todasLasReservasDePrueba = [];
  var reservaPrueba1 = new Reserva(new Date(2019, 1, 31, 11, 00), 2, 250, "DES1");
  var reservaPrueba2 = new Reserva(new Date(2019, 4, 12, 14, 00), 6, 550, "DES15");
  var reservaPrueba3 = new Reserva(new Date(2019, 5, 23, 12, 00), 8, 580, "");
  var reservaPrueba4 = new Reserva(new Date(2019, 9, 20, 20, 00), 10, 330, "DES15");
  var reservaPrueba5 = new Reserva(new Date(2019, 11, 5, 21, 00), 5, 220, "DES1");
  var reservaPrueba6 = new Reserva(new Date(2019, 11, 5, 21, 00), 5, 220, "sarasa");
  todasLasReservasDePrueba.push(reservaPrueba1, reservaPrueba2, reservaPrueba3, reservaPrueba4, reservaPrueba5);

  it('Pruebo que cada restaurante calcule correctamente su precio base.', function () {
      expect(reservaPrueba1.calcularPrecioBase()).to.equal(500);
      expect(reservaPrueba2.calcularPrecioBase()).to.equal(3300);
      expect(reservaPrueba3.calcularPrecioBase()).to.equal(4640);
      expect(reservaPrueba4.calcularPrecioBase()).to.equal(3300);
      expect(reservaPrueba5.calcularPrecioBase()).to.equal(1100);
      expect(reservaPrueba6.calcularPrecioBase()).to.equal(1100);
  });

  it('Pruebo el descuento por grupo grande.', function () {
      expect(descuentoGrupoGrande(reservaPrueba1.cantidadPersonas, reservaPrueba1.calcularPrecioBase())).to.equal(0);
      expect(descuentoGrupoGrande(reservaPrueba2.cantidadPersonas, reservaPrueba2.calcularPrecioBase())).to.equal(3300 * 0.05);
      expect(descuentoGrupoGrande(reservaPrueba3.cantidadPersonas, reservaPrueba3.calcularPrecioBase())).to.equal(4640 * 0.1);
      expect(descuentoGrupoGrande(reservaPrueba4.cantidadPersonas, reservaPrueba4.calcularPrecioBase())).to.equal(3300 * 0.15);
      expect(descuentoGrupoGrande(reservaPrueba5.cantidadPersonas, reservaPrueba5.calcularPrecioBase())).to.equal(1100 * 0.05);
      expect(descuentoGrupoGrande(reservaPrueba5.cantidadPersonas, reservaPrueba6.calcularPrecioBase())).to.equal(1100 * 0.05);
  });

  it('Pruebo el descuento por código.', function () {
      expect(descuentoCodigo(500, reservaPrueba1.codigoDescuento, reservaPrueba1.precioPersona)).to.equal(reservaPrueba1.precioPersona);
      expect(descuentoCodigo(3300, reservaPrueba2.codigoDescuento, reservaPrueba2.precioPersona)).to.equal(3300 * 0.15);
      expect(descuentoCodigo(4640, reservaPrueba3.codigoDescuento, reservaPrueba3.precioPersona)).to.equal(0);
      expect(descuentoCodigo(3300, reservaPrueba4.codigoDescuento, reservaPrueba4.precioPersona)).to.equal(3300 * 0.15);
      expect(descuentoCodigo(1100, reservaPrueba5.codigoDescuento, reservaPrueba5.precioPersona)).to.equal(reservaPrueba5.precioPersona);
      expect(descuentoCodigo(1100, reservaPrueba6.codigoDescuento, reservaPrueba5.precioPersona)).to.equal(console.log('El código ingresado no existe.'));
  });

  it('Pruebo el descuento total.', function () {
      expect(calcularDescuentos(reservaPrueba1.cantidadPersonas, reservaPrueba1.calcularPrecioBase(), reservaPrueba1.codigoDescuento, reservaPrueba1.precioPersona)).to.equal(250);
      expect(calcularDescuentos(reservaPrueba2.cantidadPersonas, reservaPrueba2.calcularPrecioBase(), reservaPrueba2.codigoDescuento, reservaPrueba2.precioPersona)).to.equal(660);
      expect(calcularDescuentos(reservaPrueba3.cantidadPersonas, reservaPrueba3.calcularPrecioBase(), reservaPrueba3.codigoDescuento, reservaPrueba3.precioPersona)).to.equal(464);
      expect(calcularDescuentos(reservaPrueba4.cantidadPersonas, reservaPrueba4.calcularPrecioBase(), reservaPrueba4.codigoDescuento, reservaPrueba4.precioPersona)).to.equal(990);
      expect(calcularDescuentos(reservaPrueba5.cantidadPersonas, reservaPrueba5.calcularPrecioBase(), reservaPrueba5.codigoDescuento, reservaPrueba5.precioPersona)).to.equal(275);
      expect(isNaN(calcularDescuentos(reservaPrueba6.cantidadPersonas, reservaPrueba6.calcularPrecioBase(), reservaPrueba6.codigoDescuento, reservaPrueba6.precioPersona))).to.equal(true);
  });

  it('Pruebo adicional por horario.', function () {
      expect(adicionalHorario(reservaPrueba1.calcularPrecioBase(), reservaPrueba1.horario.getHours())).to.equal(0);
      expect(adicionalHorario(reservaPrueba2.calcularPrecioBase(), reservaPrueba2.horario.getHours())).to.equal(reservaPrueba2.calcularPrecioBase() * 0.5);
      expect(adicionalHorario(reservaPrueba5.calcularPrecioBase(), reservaPrueba5.horario.getHours())).to.equal(reservaPrueba5.calcularPrecioBase() * 0.5);
  });

  it('Pruebo el adicional por día.', function () {
      expect(adicionalDia(reservaPrueba1.calcularPrecioBase(), reservaPrueba1.horario.getDay())).to.equal(reservaPrueba1.calcularPrecioBase() * 0.1);
      expect(adicionalDia(reservaPrueba5.calcularPrecioBase(), reservaPrueba5.horario.getDay())).to.equal(0);
  });

  it('Pruebo el adicional total.', function () {
      expect(calcularAdicionales(reservaPrueba2.calcularPrecioBase(), reservaPrueba2.horario.getHours(), reservaPrueba2.horario.getDay())).to.equal(1980);
      expect(calcularAdicionales(reservaPrueba3.calcularPrecioBase(), reservaPrueba3.horario.getHours(), reservaPrueba3.horario.getDay())).to.equal(464);
  });

  it('Pruebo que cada restaurante calcule correctamente su precio final.', function () {
      expect(reservaPrueba1.calcularPrecioTotal()).to.equal(300);
      expect(reservaPrueba2.calcularPrecioTotal()).to.equal(4620);
      expect(reservaPrueba3.calcularPrecioTotal()).to.equal(4640);
      expect(reservaPrueba4.calcularPrecioTotal()).to.equal(4290);
      expect(reservaPrueba5.calcularPrecioTotal()).to.equal(1375);
  });
});

