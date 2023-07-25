document.addEventListener('DOMContentLoaded', function() {
    modos();
    zoomPerfil();
    subirFlecha();
    verProyectos();
    menuNav();
});

function modos() {
    const botonDarkMode = document.querySelector('.icono-luna');
    const botonDayMode = document.querySelector('.icono-sol');

    botonDarkMode.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        botonDarkMode.style.display = "none";
        botonDayMode.style.display = "block";
    });

    botonDayMode.addEventListener('click', function() {
        document.body.classList.remove('dark-mode');
        botonDayMode.style.display = "none";
        botonDarkMode.style.display = "block";
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

    perfil.addEventListener('click', function() {
        perfilFijado.style.display = "block";
        document.body.classList.add('no-scroll');
    });

    equis.addEventListener('click', function() {
        perfilFijado.style.display = "none";
        document.body.classList.remove('no-scroll');
    });
}

function verProyectos() {
    const descripciones = document.querySelectorAll('.descripcion-proyectos');
    const flechas = document.querySelectorAll('.fa-angle-down');
    descripciones[2].style.height = descripciones[2].scrollHeight + 'px';

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

    btn.addEventListener('click', function() {
        nav.classList.toggle('abierto');
    });
}



// año copy
const currentYear = new Date().getFullYear();
document.getElementById('year').textContent = currentYear;