  $(document).ready(function(){
     // Устанавливаем обработчик потери фокуса для всех полей ввода текста
     $('input#fio, input#email, input#phone').unbind().blur( function(){

        // Для удобства записываем обращения к атрибуту и значению каждого поля в переменные
         var id = $(this).attr('id');
         var val = $(this).val();

       // После того, как поле потеряло фокус, перебираем значения id, совпадающие с id данного поля
       switch(id)
       {
             // Проверка поля "Имя"
             case 'fio':
                var rv_name = /^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$/; // используем регулярное выражение

                // Eсли длина имени больше 2 символов, оно не пустое и удовлетворяет рег. выражению,
                // то добавляем этому полю класс .not_error,
                // и ниже в контейнер для ошибок выводим слово " Принято", т.е. валидация для этого поля пройдена успешно

                if(val.length > 3 && val != '' && rv_name.test(val))
                {
                   $(this).addClass('not_error');
                   $('#fio').css('border', '2px solid green');
                   $(this).next('.error-box').text('Принято')
                                             .css('color','green')
                                             .animate({'paddingLeft':'10px'},400)
                                             .animate({'paddingLeft':'5px'},400);
                }

              // Иначе, мы удаляем класс not-error и заменяем его на класс error, говоря о том что поле содержит ошибку валидации,
              // и ниже в наш контейнер выводим сообщение об ошибке и параметры для верной валидации

                else
                {
                   $(this).removeClass('not_error').addClass('error');
                   $('#fio').css('border', '2px solid red');
                   $(this).next('.error-box').text('Введите ФИО полностью')
                                             .css('color','red')
                                             .animate({'paddingLeft':'10px'},400)
                                             .animate({'paddingLeft':'5px'},400);
                }
            break;

           // Проверка email
           case 'email':
               str = val.split('@').slice(1);
			   var allowedDomains = [ 'ya.ru' , 'yandex.ru' , 'yandex.ua' , 'yandex.by' , 'yandex.kz' , 'yandex.com'];

	   		 if ($.inArray(str[0], allowedDomains) !== -1) 
               {
                  $(this).addClass('not_error');
                  $('#email').css('border', '2px solid green');
                  $(this).next('.error-box').text('Принято')
                                            .css('color','green')
                                            .animate({'paddingLeft':'10px'},400)
                                            .animate({'paddingLeft':'5px'},400);
               }
               else
               {
                  $(this).removeClass('not_error').addClass('error');
                  $('#email').css('border', '2px solid red');
                  $(this).next('.error-box').text('Введите правильный email! Только с доменнами  ya.ru, yandex.ru, yandex.ua, yandex.by, yandex.kz, yandex.com.')
                                             .css('color','red')
                                             .animate({'paddingLeft':'10px'},400)
                                             .animate({'paddingLeft':'5px'},400);
               }
           break;


          // Проверка поля "Сообщение"
          case 'phone':
         	
      		var phone =  val.replace(/^\+7\/s/, '');
    		var phones = val.replace(/[^0-9]/g,'');
    		var sum = phones.split('').reduce(function(a,b){ return +a+ +b; });
    		
	    	if(sum <= 30 && sum > 8) {
                 $(this).addClass('not_error');
                 $('#phone').css('border', '2px solid green');
                $(this).next('.error-box').text('Принято')
                                             .css('color','green')
                                             .animate({'paddingLeft':'10px'},400)
                                             .animate({'paddingLeft':'5px'},400);
              }
              else
              {
                 $(this).removeClass('not_error').addClass('error');
                 $('#phone').css('border', '2px solid red');
                $(this).next('.error-box').text('Заполните это поле! Пример: +7(111)222-33-11')
                                             .css('color','red')
                                             .animate({'paddingLeft':'10px'},400)
                                             .animate({'paddingLeft':'5px'},400);
              }
          break;

       } // end switch(...)

     }); // end blur()

     // Теперь отправим наше письмо с помощью AJAX
     $('form#myForm').button().click(function(e){

         // Запрещаем стандартное поведение для кнопки submit
         e.preventDefault();

         // После того, как мы нажали кнопку "Отправить", делаем проверку,
         // если кол-во полей с классом .not_error равно 3 (так как у нас всего 3 поля), то есть все поля заполнены верно,
         // выполняем наш Ajax сценарий и отправляем письмо адресату

         if($('.not_error').length == 3)
         {
            // Eще одним моментом является то, что в качестве указания данных для передачи обработчику send.php, мы обращаемся $(this) к нашей форме,
            // и вызываем метод .serialize().
            // Это очень удобно, т.к. он сразу возвращает сгенерированную строку с именами и значениями выбранных элементов формы.

             $.ajax({
                    url: 'index.htm',
                    type: 'get',
                    data: $(this).serialize(),

                    beforeSend: function(xhr, textStatus){ 
                         $('form#myForm :input').attr('disabled','disabled');
                    },

                   success: function(response){
                        $('button').attr("disabled","disabled");
    					$('input[name="fio"]').attr("disabled","disabled");
    					$('input[name="email"]').attr("disabled","disabled");
				    	$('input[name="phone"]').attr("disabled","disabled");
					 $('#resultContainer').text('Отправленно');
                   },
                   error: function(response){
					 $('#resultContainer').text('ERROR');
                   }

            }); // end ajax({...})
        }

        // Иначе, если количество полей с данным классом не равно значению 3, мы возвращаем false,
        // останавливая отправку сообщения в невалидной форме
       else
       {
          return false;
       }

   }); // end submit()
     $('#phone').mask('+7 (999) 999-9999');
  }); // end script
