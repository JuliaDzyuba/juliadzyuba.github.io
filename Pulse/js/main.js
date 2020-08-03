$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
    loop:true,
    items: 1,
    responsive:{
      0:{
          //items:1
          dots: true
      },
      768:{
          //items:3
          dots: true
      },
      992:{
        dots: false
          //items:5
      }
  }
  })

  let owl = $('.owl-carousel');

  owl.owlCarousel();
  // Go to the next item
  $('.next').click(function() {
    owl.trigger('next.owl.carousel');
  })
  // Go to the previous item
  $('.prev').click(function() {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    owl.trigger('prev.owl.carousel', [300]);
  });

//Tabs
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog-items').removeClass('catalog-items_active').eq($(this).index()).addClass('catalog-items_active');
  });

//Link
  // $('.catalog-items__link_more').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog-items__content').eq(i).toggleClass('catalog-items__content_active');
  //     $('.catalog-items__list').eq(i).toggleClass('catalog-items__list_active');
  //   });
  // });

  // $('.catalog-items__link_back').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog-items__content').eq(i).toggleClass('catalog-items__content_active');
  //     $('.catalog-items__list').eq(i).toggleClass('catalog-items__list_active');
  //   });
  // });

  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
      $('.catalog-items__content').eq(i).toggleClass('catalog-items__content_active');
      $('.catalog-items__list').eq(i).toggleClass('catalog-items__list_active');
      });
    });
  };

  toggleSlide('.catalog-items__content');
  toggleSlide('.catalog-items__list');

// Modal


  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
   
  });

  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  })

  // $('.button_mini').on('click', function(){
  //   $('.overlay, #order').fadeIn('slow');
  // });

  $('.button_mini').each(function(i) {
    $(this).on('click', function(){
      $('#order .modal__descr').text($('.catalog-items__subtitle').eq(i).text());
      $('#order .modal__price').text($('.catalog-items__price').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

  //Validate
  function validateForms(form){
    $(form).validate({
      rules: {
        user_name: {
          required: true,
          minlength: 2
        },
        user_phone: "required",
        user_email: {
          required: true,
          email: true
        }
      },
      messages: {
        user_name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа!")
        },
        user_phone: "Пожалуйста, введите свой номер телефона",
        user_email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты"
        }
      }
    });
  };

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  //maskedinput
  $('input[name=user_phone]').mask("(999)999-99-99");

  // Mailer
  let forms = document.querySelectorAll('form');
  
  let overlay = document.querySelector('.overlay');
  let thanks = document.querySelector('#thanks');
  let consultation = document.querySelector('#consultation');
  let order = document.querySelector('#order');

  forms.forEach( form => {
  	form.addEventListener('submit', submitHandler)
    function submitHandler(e){
    	e.preventDefault();
        fetch("mailer/smart.php", {
            method: "POST",
            body: new FormData(form)
        })
            // .then(response => response.json())
            // .then(function(json) {  form.reset(); })
            .catch(function(error) { console.log(error); });
        form.reset();
        // console.log(consultation);
        // console.log(order);
        if(form.closest('#consultation') || form.closest('#order')){
        	consultation.style.display = 'none';
        	order.style.display = 'none';
        }
        overlay.style.display = 'block';
        thanks.style.display = 'block';
    };
});
    

  /*$('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');
      $('form').trigger('reset');

    });
    return false;

  });
  */

  //Scrolling

  $(window).scroll( function() {
    if($(this).scrollTop() > 1200) {
      $('.up').fadeIn();
    } else {
      $('.up').fadeOut();
    }
  });

  $("a[href^='#']").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  //Animation

  new WOW().init();

});

