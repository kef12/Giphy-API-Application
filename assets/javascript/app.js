
$(document).ready(function(){
    // Initial array of animals
    var animals = ["dogs", "cats", "birds", "pigs", "horses", "lizards", "cows"];

    // displayAnimals function re-renders the HTML to display the appropriate content
    function displayAnimals() {

      var animals = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animals + "&api_key=s6StGlWW3Bt8JjNXRQeRYyIKL3ny8eoD&limit=10";

      // Creates AJAX call for the specific animal button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response){
        $("#animalview").empty();

        var results = response.data;

        // Retrieves the Rating Data
        console.log(response);

        // Loops the animals for limit 10
        for(var i = 0; i < results.length; i++) {

          // Creates a div to hold the animals
          var animalDiv = $("<div>");

          // Makes the class for style.css
          animalDiv.addClass("animalpictures");

          // Creates an element to have the rating displayed
          var rating = results[i].rating;
          var p = $("<h2>").text("Rating: " + rating);

          // Pauses or animates the images when clicked
          var animalImage = $("<img>");
          animalImage.attr("src", results[i].images.fixed_height_still.url);
          animalImage.attr("data-still", results[i].images.fixed_height_still.url);
          animalImage.attr("data-animate", results[i].images.fixed_height.url);
          animalImage.attr("data-state", "still");
          animalImage.addClass('animalImage');

          // Displays the rating
          animalDiv.prepend(p);

          // Displays the animal image
          animalDiv.prepend(animalImage);
          $("#animalview").prepend(animalDiv);
        }

        //if the variable state is equal to 'still',
        // then update the src attribute of this image to it's data-animate value,
        // and update the data-state attribute to 'animate'.
        // If state does not equal 'still', then update the src attribute of this
        // image to it's data-animate value and update the data-state attribute to 'still'
        $(".animalImage").on("click", function() {
          var state = $(this).attr("data-state");
          console.log(state);

          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      });        
    }

    // Function for displaying animal data
    function renderButtons() {

      // Deletes the animals prior to adding new animals
      $("#animalbuttons").empty();

      for(var i = 0; i < animals.length; i++) {

        // Then dynamicaly generates buttons for each animal in the array
        var animalsAdd = $("<button>");

        // Adds a class of animals to our button
        animalsAdd.addClass("animals");

        // Added a data-attribute
        animalsAdd.attr("data-name", animals[i]);

        // Provided the initial button text
        animalsAdd.text(animals[i]);

        // Added the button to the buttons-view div
        $("#animalbuttons").append(animalsAdd);
      }
    }

    // This function handles events where the add animal button is clicked
    $("#add-animal").on("click", function(event){
      event.preventDefault();

      // This line of code will grab the input from the textbox
      var animal = $("#animal-input").val().trim();

      // The animal from the textbox is then added to our array
      animals.push(animal);

      // Calling renderButtons which handles the processing of our animal array
      renderButtons();
    });

    // Adding click event listeners to all elements with a class of "animal"
    $(document).on("click", ".animals", displayAnimals);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
});