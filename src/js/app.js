document.addEventListener('DOMContentLoaded', function() {
    modos();
    zoomPerfil();
    subirFlecha();
    verProyectos();
    menuNav();
    setupNavigation();
});

function modos() {
    const botonDarkMode = document.querySelector('.icono-luna');
    const botonDayMode = document.querySelector('.icono-sol');

    // Cuando se carga la página, revisa si el modo oscuro está activo en el almacenamiento local
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        botonDarkMode.style.display = "none";
        botonDayMode.style.display = "block";
    }

    botonDarkMode.addEventListener('click', function() {
        document.body.style.opacity = .9;
        setTimeout(function() {
            document.body.classList.add('dark-mode');
            botonDarkMode.style.display = "none";
            botonDayMode.style.display = "block";
            document.body.style.opacity = 1;
            // Guarda el estado del modo oscuro en el almacenamiento local
            localStorage.setItem('darkMode', 'true');
        }, 200);
    });

    botonDayMode.addEventListener('click', function() {
        document.body.style.opacity = .9;
        setTimeout(function() {
            document.body.classList.remove('dark-mode');
            botonDayMode.style.display = "none";
            botonDarkMode.style.display = "block";
            document.body.style.opacity = 1;
            // Guarda el estado del modo oscuro en el almacenamiento local
            localStorage.setItem('darkMode', 'false');
        }, 200);
    });
}



function subirFlecha() {
    const flecha = document.querySelector('.flecha');
    window.addEventListener('scroll', function(){
        if( document.documentElement.scrollTop > 500) {
            flecha.style.display = "flex";
        } else {
            flecha.style.display = "none";
        }
    });
}

function zoomPerfil() {
    const equis = document.querySelector('.equis');
    const perfil = document.querySelector('.perfil-contenedor');
    const perfilFijado = document.querySelector('.fijado-contenedor');
    const perfilFijado2 = document.querySelector('.perfil-fijado2');  // Agrega esta línea

    perfil.addEventListener('click', function() {
        perfilFijado.style.display = "block";
        // Cambia la opacidad y la escala de perfilFijado2
        setTimeout(() => {
            perfilFijado2.style.opacity = "1";
            perfilFijado2.style.transform = "scale(1)";
        }, 0);
        document.body.classList.add('no-scroll');
    });

    equis.addEventListener('click', function() {
        // Cambia la opacidad y la escala de perfilFijado2
        perfilFijado2.style.opacity = "0";
        perfilFijado2.style.transform = "scale(0)";
        // Después de que la transición se haya completado, entonces cambia display a "none" en perfilFijado
        setTimeout(() => perfilFijado.style.display = "none", 300);  // Ajusta el tiempo de demora según la duración de tu transición
        document.body.classList.remove('no-scroll');
    });
}

function verProyectos() {
    const descripciones = document.querySelectorAll('.descripcion-proyectos');
    const flechas = document.querySelectorAll('.fa-angle-down');
    const titulos = document.querySelectorAll('.proyectos-titulo h5'); // Selecciona todos los títulos de los proyectos

    // Abre el proyecto "App Salon" por defecto
    titulos.forEach((titulo, index) => {
        if(titulo.textContent.trim() === 'App Salon') {
            descripciones[index].classList.remove('ocultar');
            descripciones[index].style.height = descripciones[index].scrollHeight + 'px';
            flechas[index].classList.add('giro');
        }
    });

    flechas.forEach((flecha, index) => {
        flecha.addEventListener('click', function() {
            flecha.classList.toggle('giro');
            if (descripciones[index].classList.contains('ocultar')) {
                descripciones[index].classList.remove('ocultar');
                setTimeout(() => descripciones[index].style.height = descripciones[index].scrollHeight + 'px', 0);
            } else {
                descripciones[index].style.height = '0px';
                descripciones[index].addEventListener('transitionend', function() {
                    descripciones[index].classList.add('ocultar');
                }, {once: true});
            }
        });
    });
}


function menuNav() {
    const btn = document.querySelector('.icono-menu');
    const nav = document.querySelector('.navegacion-mobile');
    const navLinks = document.querySelectorAll('.navegacion-mobile li a');

    btn.addEventListener('click', function() {
        nav.classList.toggle('abierto');
    });

    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function() {
            nav.classList.remove('abierto');
        });
    }
}

function setupNavigation() {
    // Manejador de eventos de clic común
    function handleClick(event) {
        event.preventDefault();
        const href = this.getAttribute('href');
        // Comprueba si el href es "#" (logo o flecha) o un ID de fragmento (navegación)
        if (href === '/') {
            window.scrollTo(0, 0);
        } else {
            document.querySelector(href).scrollIntoView({behavior: 'smooth'});
        }
    }

    // Agrega el manejador de eventos de clic a los enlaces de navegación, al logo y a la flecha
    document.querySelector('.flecha').addEventListener('click', handleClick);
    document.querySelectorAll('.contenedor-nav a').forEach(link => link.addEventListener('click', handleClick));
}



// año copy
const currentYear = new Date().getFullYear();
document.getElementById('year').textContent = currentYear;