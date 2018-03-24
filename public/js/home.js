$(document).ready(function () {
    
    
    for (var i = 0; i < ads.length; i++) {
        $('<div class="item"><img src="/uploads/' + ads[i] + '"><div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
        $('<li data-target="#carousel-example-generic" data-slide-to="' + i + '"></li>').appendTo('.carousel-indicators')

    }
    $('.item').first().addClass('active');
    $('.carousel-indicators > li').first().addClass('active');
    $('#carousel-example-generic').carousel();

    $('#favorite').on('submit', function (e) {
        e.preventDefault();

        var id = $('#id').val();
        var className = $('#class').val();

        $.ajax({
            url: '/home',
            type: 'POST',
            data: {
                id: id,
                class: className
            },
            success: function () {
                console.log(className);
            }
        })

    });
});