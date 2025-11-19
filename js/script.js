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
