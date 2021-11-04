/* 
David Oberlander - Programming Fundamentals - Online - 10605
  Please see the text file in this js folder to view the problem statement, defining diagram, solution algorithm, and test cases. 
*/


// Will hide or show the container div using either display or visibility
function ToggleContainerDisplay (containerName, option, displayType) {
  // Initialize variables and set up the element variable 
  var element = document.getElementById(containerName);
  var showValue = "";
  var hideValue = "";

  // Determine if displayType was display or visibility
  if(displayType === "display") {
    showValue = "block";
    hideValue = "none";
  } else {
    showValue = "visible";
    hideValue = "hidden";
  }

  // Show or display the option, the actual element
  if (option === "show") {
    (displayType === "display") ? element.style.display = showValue : element.style.visibility = showValue;
  } else if (option === "hide") {
    (displayType === "display") ? element.style.display = hideValue : element.style.visibility = hideValue;
  } else {
    (displayType === "display") ? element.style.display = showValue : element.style.visibility = showValue;
  }
}


// Set focus (mainly used by next and previous buttons built in the quiz)
function SetFocus(inputField) {
  document.getElementById(inputField).focus();
}


// Adjust the dot class to show the appropriate class per question
function SetDotStyle(questionNumber) {
  var dotNumber = document.getElementById("dot" + questionNumber);
  var userInput = document.getElementById("userAnswer" + questionNumber).value;
  if (userInput === "" || userInput === null) {
     // The user did not enter anything on this question    
     dotNumber.style.border = "1px solid #FF0000";
     dotNumber.style.backgroundColor = "#FFFFFF"; 
     dotNumber.style.color = "#000000";      
  } else {

    // The user did enter information on this question
    dotNumber.style.border = "1px solid #000000";
    dotNumber.style.backgroundColor = "#0059A5"; 
    dotNumber.style.color = "#FFFFFF";

  }
}


// Adjusts the dot class to the show it is the selected question, reseting the rest
function SetSelectedDot(questionNumber, numberOfQuestions) {
  var dotElement = "";
  for(var dotCounter = 1; dotCounter <= 10; dotCounter++) {
    dotElement = document.getElementById("dot" + dotCounter);
    if(dotCounter === questionNumber) {
      dotElement.style.border = "5px solid #8BBBE6";
    } else {
      // Only adjust the border width, not the color
      dotElement.style.border.width = "1px";
    }
  }
}


// Populate the Quiz Questions array
function PopulateQuestionArray () {
  var questions = ["I","Yes","No","Hello","Goodbye","He/She","Thank You","Fine","Happy","Today"]
  return questions;
}


// Populate the Correct Answers array
function PopulateCorrectAnswerArray () {
  var correctAnswers = ["Ako","Oo","Hindi","Kumusta","Paalam","Siya","Salamat","Mabuti","Masaya","Ngayon"];
  return correctAnswers;
}


// Build the quiz, creates hidden HTML sections for each of the translation questions and navigation buttons
function BuildQuiz() {
  // Initialize the variables and setup the elements
  var quizContainerElement = document.getElementById('quizContainer');
  var quizContainerHTML = "";
  var translationsContainer = document.getElementById('translationsContainer');
  var questions = [];
  var successfulBuild = "";
  var previousBtnVisibility = "visible";
  var nextBtnVisibility = "visible";
  var gradeQuizBtnDisplay = "none";

  // Call the function to get the Quiz Questions (translations)
  questions = PopulateQuestionArray();

  // Call the functions to hide the translations table and show the quizes container
  ToggleContainerDisplay("translationsContainer", "hide", "display");
  ToggleContainerDisplay("quizContainer", "show", "display");

  // Verify that the previous step has been completed, upon successful completion, this will help provide success or failure messages of the build
  if(translationsContainer.style.display === "none" && quizContainerElement.style.display === "block") { 

    // For loop that builds the <section> tags and HTML within the questionContainer, populates the questions within the fields, and displays the appropriate navigation buttons.
    for (var questionCounter = 1; questionCounter <= questions.length; questionCounter++) {
      quizContainerHTML += "        <section id=\"question" + questionCounter + "\" class=\"questionContainer\">\n          <p class=\"questionContainerNumber\">Question " + (questionCounter) + "</p>\n          <p id=\"translationQuestion\" class=\"translationQuestion\">" + questions[questionCounter-1] + "</p>\n";
      
      // Determine if the previous button should be displayed or not
      previousBtnVisibility = (questionCounter > 1) ? "visible" : "hidden";
      // Previous Button
      quizContainerHTML += "          <button id=\"previousBtn\" name=\"previousBtn\" onclick=\"ToggleContainerDisplay(\'question" + (questionCounter - 1) + "\',\'show\',\'display\'); ToggleContainerDisplay(\'question" + questionCounter + "\',\'hide\',\'display\'); SetFocus(\'userAnswer" + (questionCounter - 1) + "\'); SetDotStyle(" + questionCounter + "); SetSelectedDot(" + (questionCounter - 1) + "," + questions.length + ");\" style=\"visibility: " + previousBtnVisibility + ";\">Previous</button>";

      quizContainerHTML += "          <input type=\"text\" id=\"userAnswer" + questionCounter + "\" placeholder=\"Enter your answer here\"  autocomplete=\"off\">";

      // Determine if the next button should be displayed or not
      nextBtnVisibility = (questionCounter < questions.length) ? "visible" : "hidden";

      // Set the 2nd from last question's NEXT button to also show the Quiz button for the last question.
      gradeQuizBtnDisplay = (questionCounter === questions.length-1) ? " ToggleContainerDisplay(\'gradeQuizBtn\',\'show\',\'display\');" : "";
      
      // Next Button
      quizContainerHTML += "          <button id=\"nextBtn\" name=\"nextBtn\" onclick=\"ToggleContainerDisplay(\'question" + (questionCounter + 1) + "\',\'show\',\'display\'); ToggleContainerDisplay(\'question" + questionCounter + "\',\'hide\',\'display\'); SetFocus(\'userAnswer" + (questionCounter + 1) + "\');  SetDotStyle(" + questionCounter + "); SetSelectedDot(" + (questionCounter + 1) + "," + questions.length + ");" + gradeQuizBtnDisplay + "\" style=\"visibility: " + nextBtnVisibility + ";\">Next</button>";

      quizContainerHTML += "        </section>";
    }

    // Create question dot placement for each question displaying 1 to 10, but adjusted to show the appropriate array item
    for (var i = 1; i <= questions.length; i++){
      quizContainerHTML += "<span id=\"dot" + i + "\" class=\"emptyDot\" style=\"display: inline-block; box-sizing: initial;\">" + i + "</span>";  
    }   

    // Display Dot Legend
    quizContainerHTML += "<span class=\"legendBox\"><span class=\"emptyDot\" style=\"display: inline-block; border: 1px solid #FF0000;\"></span> = Nothing Entered <span class=\"emptyDot filledDot\" style=\"display: inline-block; margin-left: 20px;\"></span> = Has Entry <span class=\"emptyDot selectedDot\" style=\"display: inline-block; margin-left: 20px;\"></span> = Selected Question</span>";

    // Create the submit quiz button to display the results
    quizContainerHTML += "        <button id=\"gradeQuizBtn\" name=\"submitBtn\" onclick=\"GradeQuiz();\" style=\"display: none;\">Grade Quiz</button>";

    // Takes the above HTML string and inserts it after the current quizContainer element.
    quizContainerElement.innerHTML += quizContainerHTML;
    successfulBuild = "Yes";
  } else {
    successfulBuild = "No";
  }


  // Display the appropriate response if the quiz build was successful or not.
  if (successfulBuild === "Yes") {
    ToggleContainerDisplay("question1","show","display");
    SetFocus("userAnswer1");
    SetSelectedDot(1,questions.length);
    //document.getElementById("dot1").style.border = "15px solid black";
  } else if (successfulBuild === "No") {
    alert("We're sorry, the correct sections have not been displayed properly. Please try again later.");
  } else {
    alert("We're sorry, there was an error building your quiz at this time. Please try again later.");
  }

}


// Populate users answers
function PopulateUserAnswers() {
  // Initialize variables
  var questions = [];
  var userAnswers = [];
  var elementValue = "";

  // Get the questions Array primarily for the length
  questions = PopulateQuestionArray();

  // Insert the user Answers from each of the hidden input fields and put them into an array
  for (var i = 1; i <= questions.length; i++) {
    // Insert some date if the user did not enter anything to avoid null values
    elementValue = (document.getElementById('userAnswer' + i).value == null) ? "" : (document.getElementById('userAnswer' + i).value); 
    userAnswers.push(elementValue);
  }
  
  // Return the userAnswers as an array
  return userAnswers;
}


// Checks each answer and returns if it was correct or not
function GradeUserAnswer (userAnswer, correctAnswer) {
  var isCorrect = false;
  //alert(userAnswer.toLowerCase());
  if (userAnswer.toLowerCase().trim() == correctAnswer.toLowerCase().trim()) {
    isCorrect = true;
  }
  return isCorrect;
}

// Grade the users answers, display them alongside the correct answers in a table
function GradeQuiz () {
  var questions = [];
  var questionNumber = 0;
  var userAnswers = [];
  var correctAnswers = [];
  var isCorrect = true;
  var isCorrectText = "";
  var fontColor = "#000000";
  var translationGrade = 0;
  var finalGrade = 0;
  var quizContainer = document.getElementById('quizContainer');
  var resultsContainer = document.getElementById('resultsContainer');
  var resultsContainerHTML = "";

  // Populate the arrays
  questions = PopulateQuestionArray();
  userAnswers = PopulateUserAnswers();
  correctAnswers = PopulateCorrectAnswerArray();

  ToggleContainerDisplay("quizContainer", "hide", "display")
  ToggleContainerDisplay("resultsContainer", "show", "display")

  // Verify that the previous step has been completed, before proceeding with grading and building the results table
  if(quizContainer.style.display === "none" && resultsContainer.style.display === "block") { 

    // Build the headings of the table
    resultsContainerHTML += "        <table>";
    resultsContainerHTML += "          <thead>";
    resultsContainerHTML += "            <th>English</th>";
    resultsContainerHTML += "            <th>Your Answer</th>";
    resultsContainerHTML += "            <th>Correct Answer</th>";
    resultsContainerHTML += "            <th>Grade</th>";
    resultsContainerHTML += "          </thead>";
    resultsContainerHTML += "          <tbody>";

    // Create the rows showing the users answers, correct answers, and grade for each translation
    for(questionNumber; questionNumber < questions.length; questionNumber++) {
      // Check to see if they users answers were correct
      isCorrect = GradeUserAnswer(userAnswers[questionNumber], correctAnswers[questionNumber]);

      // If correct, increment the grade by one, if wrong, change the text color to red
      if(isCorrect) {
        fontColor = "#009900";
        isCorrectText = "Correct";
        translationGrade++;
      } else {
        fontColor = "#CC0000";
        isCorrectText = "Incorrect";
      }

      resultsContainerHTML += "            <tr>";
      resultsContainerHTML += "              <td>" + questions[questionNumber] + "</td>";
      resultsContainerHTML += "              <td style=\"color: " + fontColor + ";\">" + userAnswers[questionNumber] + "</td>";
      resultsContainerHTML += "              <td>" + correctAnswers[questionNumber] + "</td>";
      resultsContainerHTML += "              <td style=\"color: " + fontColor + ";\">" + isCorrectText + "</td>";
      resultsContainerHTML += "            </tr>";
    }

    finalGrade = (translationGrade / questions.length) * 100;

    resultsContainerHTML += "          </tbody>";
    resultsContainerHTML += "          <tfoot>";
    resultsContainerHTML += "            <tr>";
    resultsContainerHTML += "              <td colspan=2></td>";
    resultsContainerHTML += "              <td class=\"finalGradeText\">FINAL GRADE:</td>";
    resultsContainerHTML += "              <td class=\"finalGrade\">" + finalGrade + "%</td>";
    resultsContainerHTML += "            </tr>";
    resultsContainerHTML += "          </tfoot>";
    resultsContainerHTML += "        </table>";

    // Reset (reload the page to start from the beginning)
    resultsContainerHTML += "        <button id=\"resetBtn\" onclick=\"location.reload();\">Reset</button>";
  }

  // Insert the table into the resultsContainer
  resultsContainer.innerHTML += resultsContainerHTML;
}