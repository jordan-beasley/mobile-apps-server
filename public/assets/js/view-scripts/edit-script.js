(function(){
    $(window).on('load', function(){
        
        $.get('/stories-api/getGenres', function(result, status){
            var selector = $('#genre-selector');

            for(var i = 0; i < result.length; i++){
                selector.append(`<option value="${result[i].id}">${result[i].name}</option>`);
            }
        });

        $('.edit-submit').on('click', function(){
            var id = $('#us-id').val();
            var storyTitle = $('#st-title').val();
            var storyGenre = $('#genre-selector').val();
            var storyBody = $('#st-body').val();

            var fields = {
                userId: id,
                title: storyTitle,
                genreId: storyGenre,
                body: storyBody
            }
            
            var urlParams = $.param(fields);

            $.post('/stories-api/saveStory?' + urlParams).done(function(result, status){
                console.log('result', result);
            });
        });
    });
})();