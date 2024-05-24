// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const questions = [
    
        {
            question: "What is the capital of Sweden?",
            options: ["Stockholm", "Gothenburg", "Malmö", "Uppsala"],
            answer: "Stockholm"
        },
        {
            question: "Which Swedish city is known for its canals?",
            options: ["Stockholm", "Gothenburg", "Malmö", "Uppsala"],
            answer: "Gothenburg"
        },
        {
            question: "What is the currency of Sweden?",
            options: ["Euro", "Dollar", "Pound", "Krona"],
            answer: "Krona"
        },
        {
            question: "What is Sweden's official language?",
            options: ["Norwegian", "Danish", "Finnish", "Swedish"],
            answer: "Swedish"
        },
        {
            question: "Which Swedish pop group is famous worldwide?",
            options: ["ABBA", "The Beatles", "Queen", "The Rolling Stones"],
            answer: "ABBA"
        },
        {
            question: "What is the name of Sweden's current king?",
            options: ["Carl XVI Gustaf", "Harald V", "Philippe", "Henrik"],
            answer: "Carl XVI Gustaf"
        },
        {
            question: "Which Swedish company is known for its furniture?",
            options: ["IKEA", "H&M", "Volvo", "Ericsson"],
            answer: "IKEA"
        },
        {
            question: "What is the name of the Swedish festival celebrated around the summer solstice?",
            options: ["Midsummer", "Christmas", "Easter", "Walpurgis Night"],
            answer: "Midsummer"
        },
        {
            question: "What is the name of the famous Swedish detective series by Stieg Larsson?",
            options: ["Millennium", "Harry Potter", "The Girl with the Dragon Tattoo", "Sherlock Holmes"],
            answer: "Millennium"
        },
        {
            question: "What is the largest island in Sweden?",
            options: ["Gotland", "Öland", "Orust", "Hisingen"],
            answer: "Gotland"
        }
    ];

    let currentQuestionIndex = 0;
    let correctScore = 0;
    let wrongScore = 0;
    let username = '';

    // Function to start the quiz, hide username input, and show the first question
    function startSweQuiz() {
        username = document.getElementById('username').value;
        if (username) {
            document.getElementById('usernameInput').classList.add('hidden');
            document.getElementById('sweQuestions').classList.remove('hidden');
            document.getElementById('sweQuestions').insertAdjacentHTML('beforeend', '<div class="score">Correct: <span id="correct-score">0</span> | Wrong: <span id="wrong-score">0</span></div>');
            loadSweQuestion();
        } else {
            alert('Please enter your username.');
        }
    }

    // Load the current question and its options
    function loadSweQuestion() {
        let sweQuestions = document.getElementById('sweQuestions');
        sweQuestions.innerHTML = '';
        if (currentQuestionIndex < questions.length) {
            let { question, options } = questions[currentQuestionIndex];
            sweQuestions.appendChild(createElement('div', 'question', question));
            let optionsContainer = createElement('div', 'options');
            options.forEach(option => {
                optionsContainer.appendChild(createOptionElement(option));
            });
            sweQuestions.appendChild(optionsContainer);
        } else {
            showFinalScore();
        }
    }
//Create an HTML element with given tag, class, and text content
    function createElement(tag, className, textContent = '') {
        let element = document.createElement(tag);
        element.className = className;
        element.textContent = textContent;
        return element;
    }
//Create an option element for a question
    function createOptionElement(option) {
        let optionElement = createElement('div', 'option', option);
        optionElement.onclick = () => handleAllAnswers(optionElement, option);
        return optionElement;
    }
//Handle the user's answer selection
    function handleAllAnswers(selectedOptionElement, selectedOption) {
        let { answer } = questions[currentQuestionIndex];
        selectedOptionElement.classList.add(selectedOption === answer ? 'correct' : 'wrong');
        let optionsContainer = selectedOptionElement.parentElement;
        Array.from(optionsContainer.children).forEach(child => {
            child.onclick = null;
            
        });
        selectedOption === answer ? correctScore++ : wrongScore++;
        document.getElementById('correct-score').textContent = correctScore;
        document.getElementById('wrong-score').textContent = wrongScore;
        setTimeout(() => {
            currentQuestionIndex++;
            loadSweQuestion();
        }, 1000);
    }
//Display the final score at the end of the quiz
    function showFinalScore() {
        let questionContainer = document.getElementById('sweQuestions');
        questionContainer.innerHTML = `<p>Quiz completed! ${username}, your score is ${correctScore} correct and ${wrongScore} wrong out of ${questions.length}.</p>`;
    }

    document.getElementById('startQuizButton').addEventListener('click', startSweQuiz);
});
