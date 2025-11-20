// scripts.js
$(function(){
  // rellenar modal con datos del botón "Más info"
  $('#infoModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var title = button.data('title') || 'Detalle';
    var desc = button.data('desc') || '';
    var modal = $(this);
    modal.find('#modalTitle').text(title);
    modal.find('#modalDesc').text(desc);
  });

  // filtros por país - manipulación DOM con jQuery
  $('.brutal-filter').on('click', function(){
    $('.brutal-filter').removeClass('active');
    $(this).addClass('active');
    var filter = $(this).data('filter');
    if(filter === 'all'){
      $('.card-item').show();
    } else {
      $('.card-item').hide();
      $('.' + filter).show();
    }
  });

  // Smooth scroll a secciones (cuando se clickea enlace con hash)
  $('a[href^="#"]').on('click', function(e){
    var target = this.hash;
    if(target){
      e.preventDefault();
      var $target = $(target);
      if($target.length){
        $('html, body').animate({ scrollTop: $target.offset().top - 60 }, 600);
      }
    }
  });

  // Formulario de reservas: prevenir envío real y simular confirmación
  $('#reservationForm').on('submit', function(e){
    e.preventDefault();
    var name = $('#name').val();
    var type = $('#type').val();
    // simple feedback
    alert('Gracias, ' + name + '. Tu reserva de tipo "' + type + '" ha sido recibida.');
    $(this)[0].reset();
  });

  // CTA botones de compra que simulan acción
  $('#buyGeneral, #buyVip, #buyFamily, #ctaTickets').on('click', function(){
    alert('Redirigiendo a la pasarela de pago (simulado).');
    // podrías redirigir a /entradas.html
    window.location.href = 'entradas.html';
  });

  // cerrar nav collapse al clicar un enlace en móvil (mejora UX)
  $('.navbar-nav .nav-link').on('click', function(){
    var navbarCollapse = $('.navbar-collapse');
    if(navbarCollapse.hasClass('show')){
      var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse[0]);
      if(bsCollapse) bsCollapse.hide();
    }
  });

});

// --- robust ScrollReveal init con fallback --- //
(function(){
  // helper: desocultar si falla todo
  function revealFallback() {
    document.querySelectorAll('.grid-wrapper > div').forEach(function(el){
      el.classList.add('is-visible-fallback');
    });
  }

  // si ScrollReveal no está cargado aún, intentar cargar (rare) o usar fallback
  if (typeof ScrollReveal === 'undefined') {
    console.warn('ScrollReveal no encontrado — aplicando fallback (mostrar imágenes).');
    // small delay to allow script tag to load if it's being injected late
    setTimeout(function(){
      if (typeof ScrollReveal === 'undefined') {
        revealFallback();
        return;
      }
      // si ya está cargado después del timeout, inicializar normalmente
      initScrollReveal();
    }, 120);
    return;
  }

  // función que inicializa ScrollReveal de forma segura
  function initScrollReveal(){
    try {
      ScrollReveal().reveal(".grid-wrapper > div", {
        delay: 150,
        distance: "40px",
        interval: 80,
        origin: "bottom",
        scale: 0.92,
        reset: false,
        // cuando se revele, asegurar que fallback no interfiera
        afterReveal: function(el){
          el.classList.remove('is-visible-fallback');
        }
      });
    } catch (err){
      console.error('Error inicializando ScrollReveal:', err);
      revealFallback();
    }
  }

  // arrancar
  initScrollReveal();
})();

document.querySelectorAll(".ub-filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    document.querySelectorAll(".ub-activity").forEach(card => {
      card.style.display = 
        filter === "all" || card.classList.contains(filter)
        ? "block"
        : "none";
    });
  });
});



document.querySelectorAll(".ub-day-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const day = btn.dataset.day;

    // Activar botón
    document.querySelectorAll(".ub-day-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Mostrar timeline correspondiente
    document.querySelectorAll(".ub-timeline-day").forEach(sec => {
      sec.classList.add("d-none");
    });
    document.getElementById(day).classList.remove("d-none");
  });
});









// const btns = document.querySelectorAll('.filter-btn');
// const items = document.querySelectorAll('.activity');

// btns.forEach(btn => {
//   btn.onclick = () => {
//     const filter = btn.getAttribute('data-filter');
//     items.forEach(item => {
//       item.style.display = (filter === "all" || item.classList.contains(filter))
//         ? "block"
//         : "none";
//     });
//   };
// });