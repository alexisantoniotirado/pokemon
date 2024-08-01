
//Cargamos el contenido del DOM, antes del script y llamamos al contenedor y creamos el boton volver
document.addEventListener('DOMContentLoaded', () => {
    const contenedorDetallesPokemon = document.getElementById('detalles-pokemon');
    const botonVolver = document.createElement('button');
    botonVolver.textContent = 'Volver';
    botonVolver.id = 'botonVolver';

    //Llamar URL del Pokemon y guardar en localstorage para mejor experiencia de navegacion
    const urlPokemon = localStorage.getItem('urlPokemonSeleccionado');

    // Función que cargara los detalles del Pokemon, asincronicamente, es decir, que el programa continue su flujo,
    // mientras se carga la lista esperando la solicitud de red.
    async function cargarDetallesPokemon() {
      try {
        const respuesta = await fetch(urlPokemon);
        const datos = await respuesta.json();

        // Mostrar toda la información del Pokemon
        const contenedorDetalles = document.createElement('div');
        contenedorDetalles.innerHTML = `
          <h2>${datos.name}</h2>
          <img src="${datos.sprites.front_default}" alt="${datos.name}" id="imagenPokemon" >
          <p>Número: ${datos.id}</p>
          <p>Altura: ${datos.height}</p>
          <p>Peso: ${datos.weight}</p>
          <p>HP: ${datos.stats[0].base_stat}</p>
          <p>Ataque: ${datos.stats[1].base_stat}</p>
          <p>Defensa: ${datos.stats[2].base_stat}</p>
          <p>Ataque especial: ${datos.stats[3].base_stat}</p>
          <p>Defensa especial: ${datos.stats[4].base_stat}</p>
          <p>Velocidad: ${datos.stats[5].base_stat}</p>
          <p>Habilidades: ${datos.abilities.map(habilidad => habilidad.ability.name).join(', ')}</p>
        `;
      
        // Agregarr el botón de volver al contenedor de detalles Pokemon
        contenedorDetalles.appendChild(botonVolver);
        contenedorDetallesPokemon.appendChild(contenedorDetalles);
      } catch (error) {
        console.error('Error al cargar los detalles del Pokémon:', error);
      }
    }

    // Agregamos el evento click al botón de volver
    botonVolver.addEventListener('click', () => volverALista());

    // Función para volver a la lista principal
    function volverALista() {

    // Limpiar la URL almacenada en localStorage y devolverte al index o la lista
    localStorage.removeItem('urlPokemonSeleccionado');
    window.location.href = '/index.html';
    }

    // Cargar los detalles del Pokemon de nuevo al cargar la página
    cargarDetallesPokemon();
  });


