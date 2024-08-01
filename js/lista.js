//Esperamos que se carge el DOM antes del script, llamamos a la lista y los botones. 
//Definimos 20 elementos por pagina y 150 Pokemones maximo
document.addEventListener('DOMContentLoaded', () => {
    const contenedorListaPokemon = document.getElementById('lista-pokemon');
    const contenedorBotonesNavegacion = document.getElementById('botones-navegacion');
    const elementosPorPagina = 20;
    const totalPokemones = 150;
    const paginaActual = parseInt(new URLSearchParams(window.location.search).get('pagina')) || 1;
  
    // Función para cargar la lista de Pokémon
    async function cargarListaPokemon(pagina) {
      try {
        //Esta parte es importante para que muestre cada 20 elementos en orden
        const offset = (pagina - 1) * elementosPorPagina;
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${elementosPorPagina}&offset=${offset}`);
        const datos = await respuesta.json();
  
        // Limpiar la lista anterior
        contenedorListaPokemon.innerHTML = "";
  
        // Iterar sobre los resultados de la API y mostrar información de Pokémon
        datos.results.forEach((pokemon, index) => {
  
          // Calcula el número de Pokémon en la lista total
          const numeroPokemon = offset + index + 1;
  
          // Verificar si el número de Pokémon es válido (menor o igual al total)
          if (numeroPokemon <= totalPokemones) {
            // Crear un elemento de carta para cada Pokémon
            const cartaPokemon = document.createElement('div');
            cartaPokemon.classList.add('carta-pokemon');
            cartaPokemon.textContent = `${numeroPokemon}. ${pokemon.name}`;
            cartaPokemon.addEventListener('click', () => mostrarDetallesPokemon(pokemon.url));
            contenedorListaPokemon.appendChild(cartaPokemon);
          }
        });
  
        // Actualizar botones de navegación
        agregarBotonesNavegacion(pagina);
      } catch (error) {
        console.error('Error al cargar la lista de Pokémon:', error);
      }
    }
  
    // Función para mostrar los detalles del Pokémon seleccionado
    function mostrarDetallesPokemon(url) {
      // Almacenar la URL del Pokémon seleccionado en localStorage
      localStorage.setItem('urlPokemonSeleccionado', url);
      // Redirigir a la página de detalles
      window.location.href = '/html/detalles.html';
    }
  
    // Función para agregar botones de navegación en su contenedor correspondiente
    function agregarBotonesNavegacion(paginaActual) {
      // Limpiar el contenedor anterior
      contenedorBotonesNavegacion.innerHTML = "";
  
      //Crear boton siguiente
      const botonSiguiente = document.createElement('button');
      botonSiguiente.textContent = 'Siguiente';
      botonSiguiente.addEventListener('click', () => cambiarPagina(paginaActual + 1));
      contenedorBotonesNavegacion.appendChild(botonSiguiente);
  
      //Y si estamos en una pagina diferente a 1, crea boton de anterior
      if (paginaActual > 1) {
        const botonAnterior = document.createElement('button');
        botonAnterior.textContent = 'Anterior';
        botonAnterior.addEventListener('click', () => cambiarPagina(paginaActual - 1));
        contenedorBotonesNavegacion.appendChild(botonAnterior);
      }
    }
  
    // Funcion que cambia la página y carga la lista correspondiente
    function cambiarPagina(pagina) {
      //Va a verificar que la pagina no se pase del rango de 150 elementos
      if (pagina > 0 && pagina <= Math.ceil(totalPokemones / elementosPorPagina)) {
        const url = new URL(window.location.href);
        url.searchParams.set('pagina', pagina);
        window.location.href = url.href;
      }
    }
  
    // Carga la lista de Pokemones al cargar la página
    cargarListaPokemon(paginaActual);
  });
  