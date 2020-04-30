$(document).ready(function() {

  $('.mobile-wrap').on('click', function() {
    $('.line-burger').toggleClass('line-active');
    $('.main-header__box').toggleClass('main-header__box--active');
    $('.main-header__list').slideToggle();
  });
 var media = matchMedia('(max-width: 1050px)'), matches = media.matches;

  $(window).resize(function() {
    if ($(window).width() >= 650) {
      $('.main-header__list').attr('style', '');
      $('.line-burger').removeClass('line-active');
    }

   /* if ($(window).width() <= 1050) {
      showSubmenu();

    } else {
        $(".popup__submenu").css("display", "none");
    }
*/showSubmenu();
  });

   /*
    if(matches) {
      showSubmenu();
    }

  function showSubmenu() {
    $('.popup__list').on('click', 'a[href=""]', function(e) {
        e.preventDefault();
      $(this).next('.popup__submenu').slideToggle();
    });
  }


 $('.popup__list').on('click', 'a[href=""]', function(e) {
    if ($(window).width() <= 1050) {
      e.preventDefault();
      $(this).next('.popup__submenu').slideToggle();
    }
  })*/

  function showSubmenu() {
    $('.popup__list').on('click', 'a[href=""]', function(e) {
        e.preventDefault();
      $(this).next('.popup__submenu').slideToggle();
    });
  }
showSubmenu();

  $('.call').on('click', function() {
    $('.popup__reqcall').addClass('popup__reqcall--active');
  });

  $('.main-nav__toggle').on('click', function() {
    $('.popup__menu').addClass('popup__menu--active');
  });

  $('.popup__desc').on('click', function() {
    $('.popup__menu').removeClass('popup__menu--active');
  });

  $('.main-header__btn').on('click', function() {
    $('.main-header__user').addClass('main-header__user--active');
  });

  $('.main-header__close').on('click', function() {
    $('.main-header__user').removeClass('main-header__user--active');
  });

  $('.dropdown-link').on('click', function(e) {
    e.preventDefault();
  });



  var catalog = $('.catalog__slider');

  catalog.slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    draggable: false,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    focusOnSelect: true,
    responsive: [

      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 961,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 781,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  var data = $('.data__wrap');

  data.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    draggable: false,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    focusOnSelect: true
  });

  function validate(input, length, regExp, error, phone) {
    $(input).on('blur keyup', function() {
      var value = $(this).val();
      var that = $(this);
      regExp = regExp == '' ? /./ : regExp;
      if (phone === true) {
        bool_reg = !regExp.test(value);
      } else {
        bool_reg = regExp.test(value);
      }
      if (value.length > length && value !== '' && bool_reg) {
        that.removeClass('form-fail').addClass('form-done');
        $(error).slideUp();
      } else {
        that.removeClass('form-done').addClass('form-fail');
        $(error).slideDown();
      }
    });
  }
  // деакцивация кнопки если есть поле с ошибкой
  function disBtn(input, btn) {
    var input = $(input);
    input.on('blur keyup', function() {
      if (input.hasClass('form-fail')) {
        $(btn).attr('disabled', 'disabled');
      } else {
        $(btn).removeAttr('disabled');
      }
    });
  }
  // для проверки при нажатии
  function valClick(input, length, regExp, error, btn, phone) {
    var value = $(input).val();
    regExp = regExp == '' ? /./ : regExp;
    if (phone === true) {
      bool_reg = regExp.test(value);
    } else {
      bool_reg = !regExp.test(value);
    }
    if (value.length < length && value === '' && bool_reg) {
      $(input).addClass('form-fail');
      $(error).slideDown();
    }
  }
  //  деакцивация кнопки при нажатии
  function disBtnClick(input, btn) {
    var input = $(input);
    if (input.hasClass('form-fail')) {
      $(btn).attr('disabled', 'disabled');
      return false;
    } else {
      return true;
    }
  }
  $('input[type="tel"]').mask("+38 (999) 999-99-99");
  var regName = /^[a-zA-Zа-яА-ЯёЁ]+/;
  var regPhone = /[_]/i;
  // пример использования
  validate('#c_name', 1, regName, '.contacts__fail-name');
  validate('#c_phone', 1, regPhone, '.contacts__fail-phone', true);
  disBtn('#c_name, #c_phone', '.contacts__btn');

  validate('.reqcall__input', 1, regPhone, '.reqcall__error', true);
  disBtn('#reqcall__input', '.reqcall__btn');


  var select_obj = {};

  (function() {

    $('.select__wrap').each(function() {
      var id = $(this).attr('id');
      checkActive(this);
      var placeholder = $(this).find('.select__placeholder').html();
      select_obj[id] = placeholder;
    });

    $('.select__wrap').on('click', '.select__placeholder', function() {
      $('.select__list').removeClass('select__list--active');
      $('.select__placeholder').removeClass('changed');
      $(this).next().toggleClass('select__list--active');
      $(this).toggleClass('changed');
    });

    $('.select__wrap').on('click', '.select__item', function(e) {
      if ($(e.target).is('.select__item--disabled')) {
        return false;
      } else {
        var container = $(this).parents('.select__wrap').attr('id');
        if ($('#' + container + ' .select__item--active').length == 1) {

          if (!$(this).hasClass('select__item--active')) {
            $('#' + container + ' .select__item').removeClass('select__item--active');
            $(this).addClass('select__item--active');
            setPlaceholder(this);
          }

        } else {
          setPlaceholder(this);
          $(this).toggleClass('select__item--active');
        }
        $(this).parent().removeClass('select__list--active');
        $(this).parents('.select__wrap').find('.select__placeholder').removeClass('changed');
      }
    });

    $('body').on('click', function(e) {
      if (!$(e.target).is('.changed, .select__list, .select__item')) {
        $('.select__list').removeClass('select__list--active');
      }
    });

    function setPlaceholder(self) {
      var value = $(self).data('value');
      var value_pl = $(self).html();
      $(self).parents('.select__wrap').find('.select__placeholder').html(value_pl);
    }

    function checkActive(self) {
      var text = $(self).find('.select__item--active').text();
      if (text === undefined || text === '') {
        text = $(self).find('.select__item:not(.select__item--disabled):eq(0)').addClass('select__item--active').text();
      }
      $(self).find('.select__placeholder').html(text);
    }

  })();

  function toggleSelect(id, value) {
    $(id).find('.select__item').removeClass('select__item--active');
    $(id).find('.select__item[data-value="' + value + '"]').addClass('select__item--active');
    $(id).find('.select__placeholder').html(value);
  }

  function getSelValue(id) {
    return $(id).find('.select__item--active').data('value');
  }

  $('body').on('click', function(e) {
    if ($(e.target).is('.popup__reqcall, .popup__close')) {
      $('.popup__reqcall').removeClass('popup__reqcall--active');
    }
  });

  var date = new Date();
  var hours = date.getHours();

  var minHours = '08';

  var sDay = getSelValue('#select__day');
  if (sDay == 'Сегодня' && hours >= 21) {
    $('#select__day').find('.select__item:eq(0)').addClass('select__item--disabled').removeClass('select__item--active');
    $('#select__day').find('.select__item:eq(1)').addClass('select__item--active');
    var newDay = $('#select__day').find('.select__item:eq(1)').data('value');
    $('#select__day').find('.select__placeholder').html(newDay);

    toggleSelect('#select__hour', minHours);
  } else if (sDay == 'Сегодня' && hours < 21) {
    sHours = hours + 2;
    sHours = sHours < 10 ? '0' + sHours : sHours;
    toggleSelect('#select__hour', sHours);
  }

  function validate(input, length, regExp, error, phone) {

    $(input).on('blur keyup', function() {
      var value = $(this).val();
      var that = $(this);

      regExp = regExp == '' ? /./ : regExp;

      if (phone === true) {
        bool_reg = !regExp.test(value);
      } else {
        bool_reg = regExp.test(value);
      }

      if (value.length > length && value !== '' && bool_reg) {
        that.removeClass('form-fail').addClass('form-done');
        $(error).slideUp();
      } else {
        that.removeClass('form-done').addClass('form-fail');
        $(error).slideDown();
      }
    });

  }

  // деакцивация кнопки если есть поле с ошибкой

  function disBtn(input, btn) {
    var input = $(input);
    input.on('blur keyup', function() {

      if (input.hasClass('form-fail')) {
        $(btn).attr('disabled', 'disabled');
      } else {
        $(btn).removeAttr('disabled');
      }

    });

  }

  // для проверки при нажатии

  function valClick(input, length, regExp, error, btn, phone) {
    var value = $(input).val();

    regExp = regExp == '' ? /./ : regExp;

    if (phone === true) {
      bool_reg = regExp.test(value);
    } else {
      bool_reg = !regExp.test(value);
    }

    if (value.length < length && value === '' && bool_reg) {
      $(input).addClass('form-fail');
      $(error).slideDown();
    }
  }

  //  деакцивация кнопки при нажатии

  function disBtnClick(input, btn) {
    var input = $(input);

    if (input.hasClass('form-fail')) {
      $(btn).attr('disabled', 'disabled');
      return false;
    } else {
      return true;
    }

  }

  $('input[type="tel"]').mask("+38 (999) 999-99-99");

  var regName = /^[a-zA-Zа-яА-ЯёЁ]+/;
  var regPhone = /[_]/i;

  // пример использования
  validate('#c_name', 1, regName, '.page-contacts__fail-name');
  validate('#c_phone', 1, regPhone, '.page-contacts__fail-phone', true);
  disBtn('#c_name, #c_phone', '.page-contacts__btn');

  $('select').styler();

});