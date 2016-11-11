/* Ajax function to use anywhere */
$.extend({
    getValues: function(url) {
        var result = null;
        $.ajax({
            url: url,
            type: 'GET',
            data:'application/json',
            dataType: 'json',
            cache: false,
            async: false,
            success: function(data) {
                result = data;
                console.log( "inside ajax = " + data );

                // $.each(data, function(k, v) {
                //     var title = this.title;
                //     var body = this.body;
                //     console.log(title);
                //     console.log(body);
                //     $('#html-container').append('<h3>'+title+'</h3><p>'+body+'</p><hr>');
                // });
            },
            error: function (xhr, textMessage, thrownError) {
                // console.log(xhr.status);
                // console.log(textMessage);
                // console.log(thrownError);
            }
        });
        return result;
    }
});



/* Below is an example of using an ajax call */
/*
   var rootURL = 'https://jsonplaceholder.typicode.com/posts/';
   var testJSON = $.getValues(rootURL);
   console.log("testJSON = " + testJSON);
*/



/* Below is an example using an ajax call with a Handlebars template */
/*
   var rootURL = 'https://jsonplaceholder.typicode.com/posts/';
   var testJSON = $.getValues(rootURL);
   console.log("testJSON = " + testJSON);

   var source = $("#handbars-template").html();
   var template = Handlebars.compile(source);
   var html = template(testJSON);
   console.log("html TEST code =" + html);
   $("#html-container").append(html);

   <script id="handbars-template" type="text/x-handlebars-template">
        {{#.}}
            <div class="post">
                <h3>{{title}}</h3>
                <p>{{body}}</p>
            </div>
        {{/.}}
    </script>
*/
