$(function(){

  // --- MODAL INFO ---
  $('#infoModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var title = button.data('title') || 'Detalle';
    var desc = button.data('desc') || '';
    var modal = $(this);
    modal.find('#modalTitle').text(title);
    modal.find('#modalDesc').text(desc);
  });

  // --- FILTROS ---
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

  // Smooth scroll
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

  // --- FORM RESERVA ---
  $('#reservationForm').on('submit', function(e){
    e.preventDefault();
    var name = $('#name').val();
    var type = $('#type').val();
    alert('Gracias, ' + name + '. Tu reserva de tipo "' + type + '" ha sido recibida.');
    $(this)[0].reset();
  });


  // ------------------------------------------------
  //   🛒 CONTADOR SIMPLE DEL CARRITO
  // ------------------------------------------------
  let cartCount = 0;

  function updateCart() {
    $('#cartCount').text(cartCount);
  }

  // Botones de compra
  $('#buyGeneral').on('click', function(){
    cartCount++;
    updateCart();
  });

  $('#buyVip').on('click', function(){
    cartCount++;
    updateCart();
  });

  $('#buyDuet').on('click', function(){
    cartCount++;
    updateCart();
  });


  // --- CTA Tickets (solo si lo usas) ---
  $('#ctaTickets').on('click', function(){
    alert('Redirigiendo a las entradas...');
    window.location.href = 'tickets.html';
  });

  // --- CERRAR MENU MOVIL ---
  $('.navbar-nav .nav-link').on('click', function(){
    var navbarCollapse = $('.navbar-collapse');
    if(navbarCollapse.hasClass('show')){
      var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse[0]);
      if(bsCollapse) bsCollapse.hide();
    }
  });

}); // FIN DOM READY



// ------------------------------------------------
//      ScrollReveal seguro con fallback
// ------------------------------------------------
(function(){
  function revealFallback() {
    document.querySelectorAll('.grid-wrapper > div').forEach(function(el){
      el.classList.add('is-visible-fallback');
    });
  }

  if (typeof ScrollReveal === 'undefined') {
    console.warn('ScrollReveal no encontrado — fallback.');
    setTimeout(function(){
      if (typeof ScrollReveal === 'undefined') {
        revealFallback();
        return;
      }
      initScrollReveal();
    }, 120);
    return;
  }

  function initScrollReveal(){
    try {
      ScrollReveal().reveal(".grid-wrapper > div", {
        delay: 150,
        distance: "40px",
        interval: 80,
        origin: "bottom",
        scale: 0.92,
        reset: false,
        afterReveal: function(el){
          el.classList.remove('is-visible-fallback');
        }
      });
    } catch (err){
      console.error('Error SR:', err);
      revealFallback();
    }
  }

  initScrollReveal();
})();


// ------------------------------------------------
//      Filtros UB
// ------------------------------------------------
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


// ------------------------------------------------
//      Timeline por días
// ------------------------------------------------
document.querySelectorAll(".ub-day-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const day = btn.dataset.day;

    document.querySelectorAll(".ub-day-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

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