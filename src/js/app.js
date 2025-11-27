// ============================================
// CÓDIGO JAVASCRIPT COMPLETO - VERSIÓN CORREGIDA
// ============================================

// ✅ Variables globales al inicio
let currentProject = "";
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    modos();
    zoomPerfil();
    subirFlecha();
    verProyectos();
    menuNav();
    setupNavigation();
    
    // ✅ SOLUCIÓN: Mover el modal al final del body
    moverModalAlBody();
});

function moverModalAlBody() {
    const modal = document.getElementById('modal');
    if (modal) {
        // Mueve el modal al final del body para que escape de cualquier contexto de apilamiento
        document.body.appendChild(modal);
    }
}

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
        document.body.style.opacity = 0.9;
        setTimeout(function() {
            document.body.classList.add('dark-mode');
            botonDarkMode.style.display = "none";
            botonDayMode.style.display = "block";
            document.body.style.opacity = 1;
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
    const perfilFijado2 = document.querySelector('.perfil-fijado2');

    perfil.addEventListener('click', function() {
        perfilFijado.style.display = "block";
        setTimeout(() => {
            perfilFijado2.style.opacity = "1";
            perfilFijado2.style.transform = "scale(1)";
        }, 0);
        document.body.classList.add('no-scroll');
    });

    equis.addEventListener('click', function() {
        perfilFijado2.style.opacity = "0";
        perfilFijado2.style.transform = "scale(0)";
        setTimeout(() => perfilFijado.style.display = "none", 300);
        document.body.classList.remove('no-scroll');
    });
}

function verProyectos() {
    const descripciones = document.querySelectorAll('.descripcion-proyectos');
    const flechas = document.querySelectorAll('.fa-angle-down');
    const titulos = document.querySelectorAll('.proyectos-titulo h5');

    function cerrarTodosLosProyectos() {
        descripciones.forEach(descripcion => {
            descripcion.classList.add('ocultar');
            descripcion.style.height = '0px';
        });
        flechas.forEach(flecha => flecha.classList.remove('giro'));
    }

    // Abre el ultimo proyecto por defecto (Scrivena)
    titulos.forEach((titulo, index) => {
        if(titulo.textContent.trim() === 'Scrivena') {
            descripciones[index].classList.remove('ocultar');
            descripciones[index].style.height = descripciones[index].scrollHeight + 'px';
            flechas[index].classList.add('giro');
        }
    });

    flechas.forEach((flecha, index) => {
        flecha.addEventListener('click', function() {
            if (descripciones[index].classList.contains('ocultar')) {
                cerrarTodosLosProyectos();
                descripciones[index].classList.remove('ocultar');
                setTimeout(() => descripciones[index].style.height = descripciones[index].scrollHeight + 'px', 0);
                flechas[index].classList.add('giro');
            } else {
                descripciones[index].style.height = '0px';
                descripciones[index].addEventListener('transitionend', function() {
                    descripciones[index].classList.add('ocultar');
                }, {once: true});
                flechas[index].classList.remove('giro');
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
    function handleClick(event) {
        event.preventDefault();
        const href = this.getAttribute('href');
        if (href === '/') {
            window.scrollTo(0, 0);
        } else {
            document.querySelector(href).scrollIntoView({behavior: 'smooth'});
        }
    }

    document.querySelector('.flecha').addEventListener('click', handleClick);
    document.querySelectorAll('.contenedor-nav a').forEach(link => link.addEventListener('click', handleClick));
}

// ✅ FUNCIONES DEL MODAL - CORREGIDAS
function openModal(project) {
    const modal = document.getElementById("modal");
    modal.style.display = "grid";
    modal.style.zIndex = "9999"; // ✅ Asegura z-index alto
    currentProject = project;
    currentImageIndex = 0;
    showImage(currentImageIndex);
    showSecondaryImages();
    document.body.classList.add('no-scroll');
}

function showSecondaryImages() {
    let secondaryImages = document.querySelectorAll(".secondary-images");
    secondaryImages.forEach(secundaria => {
        secundaria.style.display = "none";
    });
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    document.body.classList.remove('no-scroll');
}

function plusSlides(n) {
    showImage(currentImageIndex += n);
}

function showImage(n) {
    const modalImg = document.getElementById("modal-image");
    let images = document.querySelectorAll("." + currentProject + "-image");
    
    if (images.length === 0) {
        console.error("No se encontraron imágenes asociadas al proyecto: " + currentProject);
        return;
    }
    
    if (n >= images.length) {
        currentImageIndex = 0;
    }
    if (n < 0) {
        currentImageIndex = images.length - 1;
    }
    
    modalImg.src = images[currentImageIndex].src;
}

// Año en el footer
const currentYear = new Date().getFullYear();
document.getElementById('year').textContent = currentYear;