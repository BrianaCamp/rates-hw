$(document).ready(function(){
  //(bri1.0)so i changed the program from counting on button clicks, and made it count how many container classes there are, but for some reason it keeps recognizing the div.container as null even when it's clearly in the DOM, thus allowing the number of weeks to be added are over the 5 limit.
  //(jens) theres a problem of scope here. when does line 4 run? when does line 7-14 run? Is numContainers changing at all? Why or Why not?
  //(bri2.0), I changed the variable declaration for numContainers, but it's still happening for the handlebars code.. please help! I get it conceptually but cannot implement a practical solution.
  // (jens2.0) lets dissect the scope/statements for addButton code.


  //count button clicks
  var numContainers;     //jens - declares numContainers variable with in the function defined at line 1.
                         // this would be accessable at any point in the js because the  the scope level (level 1).
                         // no hoisting happening here because its already at the top of the function.
                         // code here runs on page load because of the $(document).ready call
                         // but, is numContainers needed at this level?
                         // we just need to know the number of rate containers inside the addButton function. move this there.

$('#addButton').on('click', function() {
  // this is a callback function that gets run when a click event happens on #addButton.
  // code here only runs after addButton is clicked.
  // it has a nested scope (level 2), this can access code outside of it or level 1.
  // code written in scope level 2 can access code within scope level 1, but not vice versa.
  // thats how you're able to access numContainers here, but if you had numContainers defined on level 2,
  // you couldn't refer to it on level 1. make sense? leave comment/questions here.

    numContainers = $("div.container").length; // save the number of containers to numContainers

    // build/add template
    var templateHTML = $('#handlebarsTemplate').html();
    var handlebarsTemplate = Handlebars.compile(templateHTML);
    var compiledHTML = handlebarsTemplate({});

    // check if the # of containers is less/eqal to the limit.
    if(numContainers !== null && numContainers <= 5){
        $('.main').append(compiledHTML); // add to dom.
    }
});


    //(bri2.0), good call, I changed it to body and added event delegation to remove the last CONTAINER instead of ".main"... i'm such a dummy!
    // (jens 2.0 (now with less beard!)) don't be so hard on yourself. This is better! But introduces a problem. If you have 2 .containers, and click remove in the first one, it removes the second container!
    $("body").on("click",".removeButton", function(evt) {
//        $(".container").last().remove(); // instead of this, do this:
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
            // pop quiz: what scope level is this right here??
            results.push( $(input).val() ); // save value into array.
        });

        console.log(results); // output array.
    });

});
