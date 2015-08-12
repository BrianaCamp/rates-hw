$(document).ready(function(){

$('#addButton').on('click', function() {
  var numContainers;
  // this is a callback function that gets run when a click event happens on #addButton.
  // code here only runs after addButton is clicked.
  // it has a nested scope (level 2), this can access code outside of it or level 1.
  // code written in scope level 2 can access code within scope level 1, but not vice versa.
  // thats how you're able to access numContainers here, but if you had numContainers defined on level 2,
  // you couldn't refer to it on level 1. make sense? leave comment/questions here.

  //(bri)so, by moving the declared variable numContainers in the function, making it a local variable, it works, and the code that points to that variable within the function works. But when it was delcared in the global space, the local variable cannot work with it, therefore it was null. I thought that global variables would be able to be used anywhere within the program, scope level 2 or 3.

    numContainers = $("div.container").length; // save the number of containers to numContainers

    // build/add template
    var templateHTML = $('#handlebarsTemplate').html();
    var handlebarsTemplate = Handlebars.compile(templateHTML);
    var compiledHTML = handlebarsTemplate({});

    // check if the # of containers is less/eqal to the limit.
    if(numContainers <= 4){
        $('.main').append(compiledHTML); // add to dom.
    }
});

    $("body").on("click",".removeButton", function(evt) {
        $(evt.currentTarget).parents('.container').remove(); // evt.currentTarget is the button thats being clicked, find the parent container and remove it from dom.
    });

// lets start over here. we want to save all the data from the input boxes into an array
    $("body").on("click", ".saveButton", function() {
        // this function runs every time the save button is clicked.
        var results = []; // array to save rate info to.

        //lets grab all the inputs
        var inputs = $('input');

        // lets iterate over each input
        $.each(inputs, function(index, input) {
            var weekObj = {};
            var item = $(input).val();
            weekObj.day = item;
            results.push( weekObj ); // save value into array.
        });

        console.log(results); // output array.
    });

});
