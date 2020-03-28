$(function(){

    const appendToDo = function(data){
        var toDoCode = '<a href="#" class="toDo-link" data-id="' +
            data.id + '">' + data.name + '</a>'
            +'<span> </span>' +
            '<a href="#" class="toDo-delete" data-id="' +
             data.id + '"><font color="red">X</font></a>'
             +'<span> </span>' +
             '<a href="#" class="toDo-change" data-id="' +
              data.id + '"><font color="orange">Изменить дело</font></a><br>';
        $('#toDo-list')
            .append('<div>' + toDoCode + '</div>');
    };

    //Loading books on load page
   /* $.get('/todolist/', function(response)
             {
                 for(i in response) {
                     appendToDo(response[i]);
                 }
             });*/

    //Show adding form
    $('#show-add-toDo-form').click(function(){
        $('#toDo-form').css('display', 'flex');
    });

    //Closing changing form
    $('#toDo-form').click(function(event){
        if(event.target === this) {
            $(this).css('display', 'none');
        }
    });

    //Show changing form
        $(document).on('click', '.toDo-change', function(){
            var link = $(this);
            var toDoId = link.data('id');
            var toDoCode = '<form>' +
                           '<h2>Изменение дела</h2>' +
                           '<label>Заголовок дела:</label>' +
                           '<input type="text" name="name" value="">' +
                           '<label>Содержание дела:</label>' +
                           '<input type="text" name="content" value=""><hr><a href="#" class="change-toDo" data-id="' +
                           toDoId + '">Изменить</a></form><br>'
            $('#toDo-change-form')
                        .append('<div>' + toDoCode + '</div>');
            $('#toDo-change-form').css('display', 'flex');

        });

    //Closing adding form
    $('#toDo-change-form').click(function(event){
        if(event.target === this) {
            $(this).css('display', 'none');
        }
    });

    //Getting toDo
    $(document).on('click', '.toDo-link', function(){
        var link = $(this);
        var toDoId = link.data('id');
        $.ajax({
            method: "GET",
            url: '/todolist/' + toDoId,
            success: function(response)
            {
                var code = '<span>Содержание дела: ' + response.content + '</span>';
                link.parent().append(code);
            },
            error: function(response)
            {
                if(response.status == 404) {
                    alert('Дело не найдено!');
                }
            }
        });
        return false;
    });

    //Adding toDo
    $('#save-toDo').click(function()
    {
        var data = $('#toDo-form form').serialize();
        $.ajax({
            method: "POST",
            url: '/todolist/',
            data: data,
            success: function(response)
            {
                $('#toDo-form').css('display', 'none');
                var toDo = {};
                toDo.id = response;
                var dataArray = $('#toDo-form form').serializeArray();
                for(i in dataArray) {
                    toDo[dataArray[i]['name']] = dataArray[i]['value'];
                }
                appendToDo(toDo);
            }
        });
        return false;
    });

    //Deleting toDo
       $(document).on('click', '.toDo-delete', function(){
            var link = $(this);
            var toDoId = link.data('id');
            $.ajax({
                method: "DELETE",
                url: '/todolist/' + toDoId,
                success: function(response)
                {
                    var code = '<span>Дело удалено!</span>';
                    link.parent().append(code);
                },
                error: function(response)
                {
                    if(response.status == 404) {
                        alert('Дело не найдено!');
                    }
                }
            });
            return false;
        });

    //Change toDo
    $(document).on('click', '.change-toDo', function()
        {
        var link = $(this);
        var toDoId = link.data('id');
        var data = $('#toDo-change-form form').serialize();
        $.ajax({
            method: "PUT",
            url: '/todolist/' + toDoId,
            data: data,
            success: function(response)
            {
                var code = '<span><br>Дело изменено!</span>';
                link.parent().append(code);
            },
            error: function(response)
            {
                if(response.status == 404) {
                    alert('Дело не найдено!');
                }
            }
        });
        return false;
    });
});