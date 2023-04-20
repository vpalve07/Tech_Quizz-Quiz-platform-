# Tech Quizz
Tech Quizz is a quiz platform that allows users to create and take quizzes on various tech-related topics. It offers features such as quiz creation, quiz taking, and quiz registration.

## Schemas

### User Schema (Sign Up)
The user schema is used for user registration. It includes the following fields:
- name: The user's name.
- email: The user's email address.
- password: The user's password.
- type: The user's type, which can be either "jobSeeker" or "organizer".
- currentCompany: The user's current company.
- secretQuestion: A secret question and answer for account recovery.

### Quiz Schema (Create Quiz)
The quiz schema is used for quiz creation. It includes the following fields:
- quizName: The name of the quiz.
- userId: The ID of the user who created the quiz.
- quizType: The type of quiz, which can be "MCQ".
- timeLimit: The time limit for the quiz.
- topicTags: The topic tags for the quiz.
- totalScore: The total score for the quiz.
- isActive: A boolean value indicating whether the quiz is active.
- isDeleted: A boolean value indicating whether the quiz is deleted.

### Quiz Questions Schema
The quiz questions schema is used for quiz questions. It includes the following fields:
- quizId: The ID of the quiz the question belongs to.
- question: The question.
- options: The answer options for the question.
- ans: The correct answer for the question.
- marks: The marks assigned to the question.

### Quiz Registration Schema (For Quiz Taker)
The quiz registration schema is used for quiz registration by quiz takers. It includes the - - following fields:
- quizId: The ID of the quiz the user is registering for.
- userId: The ID of the user who is registering for the quiz.
- score: The score the user obtained in the quiz.
- isAttempted: A boolean value indicating whether the user attempted the quiz.
- correctAns: The number of correct answers the user gave in the quiz.
- wrongAns: The number of wrong answers the user gave in the quiz.
- totalQueAttempted: The total number of questions attempted by the user.
- totalQueUnAttempted: The total number of questions not attempted by the user.


## Quiz App API Endpoints
### 1. User SignUp
Create a user in the database with the provided data.
Method: POST 
URL: localhost:3001/user

#### Request Body:

{
    "name": "vinay",
    "email": "org12345@gmail.com",
    "password": "123@Vvasd",
    "type": "organizer",
    "secretQuestion": {
        "question": "fav movie of all time",
        "answer": "hera pheri"
    }
}

#### Response Body:
{
    "status": true,
    "Message": "Sign Up successfully"
}

### 2. Forget Password
Get the secret question for a user in order to reset their password.
Method: POST
URL: localhost:3001/forgotPass
#### Request Body:
{
    "email": "org123545@gmail.com"
}

#### Response Body:
{
    "status": true,
    "data": {
        "email": "org123545@gmail.com",
        "secretQuestion": "fav movie of all time"
    }
}

### 3. Reset Password
#### Reset a user's password with their secret question and answer.
#### Method: POST
#### URL: localhost:3001/resetPassword
#### Request Body:
{
    "email": "org123545@gmail.com",
    "secretQuestion": "fav movie of all time",
    "answer": "hera pheri",
    "newPassword": "6989@Vinay"
}

#### Response Body:
{
    "status": true,
    "Message": "Password Changed Successfully"
}

### 4. Login
Log in a user and provide a JWT token.
#### Method: POST 
#### Authorization: JWT token required
#### URL: localhost:3001/login
#### Request Body:
{
    "email": "org123545@gmail.com",
    "password": "6989@Vinay"
}

#### Response Body:
{
    "status": true,
    "message": "User Logged in successfully"
}

### 5. Create Quiz
Create a quiz with provided data. Requires JWT authentication.
#### Method: POST 
#### Authorization: JWT token required
#### URL: localhost:3001/quiz
#### Request Body:
{
    "quizName": "Quiz",
    "quizType": "MCQ",
    "timeLimit": "2",
    "topicTags": ["LinkedList", "DSA"],
    "totalScore": 2
}
#### Response Body:
{
    "status": true,
    "QuizId": "6433d0a3ee13163ae8e83c13",
    "Message": "Quiz created successfully"
}

### 6. Update Quiz
#### Method: POST
#### Authorization: JWT token required
#### URL: localhost:3001/updateQuiz/64330ed77165719c54acc732
#### Request Body:
{
    "quizName": "updated quizName",
    "quizType":"MCQ",
    "timeLimit":"7",
    "topicTags":["DSA","js"]
}
#### Response Body:
{
    "status": true,
    "message": "Quiz updated successfully"
}

### 7. Post Questions for Quiz
#### Method: POST
#### Authorization: JWT token required
#### URL: localhost:3001/quizQue/6433d0a3ee13163ae8e83c13
#### Request Body:
{
    "question":"Which of the following is not javascript data types?",
    "options":{
        "1":"Null type",
        "2":"Undefined type",
        "3":"Number type",
        "4":"All of the mentioned"
    },
    "ans":"4",
    "marks":2
}

#### Response Body:
{
    "status": true,
    "QuestionId": "6433d138ee13163ae8e83c18",
    "Message": "Question created successfully"
}

### 8. Activate Quiz
#### Method: POST
#### Authorization: JWT token required
#### URL: localhost:3001/activateQuiz/quizId
#### Response Body:
{
    "status": true,
    "message": "Quiz is activated"
}

### 9. Register for Quiz
#### Method: POST
#### Authorization: JWT token required
#### URL: localhost:3001/regQuiz/quizId
#### Response Body:
{
    "status": true,
    "Message": "Quiz registration is successful"
}


### 10. Update User Info
#### Method: POST
#### Authorization: JWT token required
#### URL: localhost:3000/update
#### Request Body:

{
    "name":"jassu new",
    "email":"organizr21@gmailla.com",
    "password":"6989@Vidssfdg",
    "type":"jobSeeker",
    "currentCompony":"Microsoft",
    "secretQuestion":{
        "question":"favorite movie",
        "answer":"hera pheri"
    }
}
#### Response Body:
{
    "status": true,
    "msg": "Data updated successfully"
}

### 11. View Leaderboard
#### Method: GET
#### Authorization: JWT token required
#### URL: localhost:3001/leaderboard/6432e04072d7b10c06151da8
#### Response Body:
{
    "status": true,
    "data": [
        {
            "userId": {
                "name": "vinay",
                "email": "org@gmail.com"
            },
            "score": 3
        },
        {
            "userId": {
                "name": "vinay",
                "email": "org123@gmail.com"
            },
            "score": 1
        },
       {
            "userId": {
                "name": "vinay",
                "email": "org1234@gmail.com"
            },
            "score": 9
        }
     ]
}

### 12. Past Quizzes of Job Seeker
#### Method: GET
#### Authorization: JWT token required
#### URL: localhost:3000/userQuizes
#### Request Body:
{
	"userId": "<user_id_from_token>"
}
#### Response Body:
{
    "status": true,
    "data": [
        {
            "quizId": {
                "quizName": "updated quizName",
                "quizType": "MCQ",
                "timeLimit": 7,
                "topicTags": [
                    "DSA",
                    "js"
                ],
                "totalScore": 15,
                "isActive": true
            },
            "score": 9
        }
    ]
}

### 13. See Quizzes
#### Method: GET
#### Authorization: JWT token required
#### URL: localhost:3000/orgQuizes
#### Request Body:
{
	"userId": "<user_id_from_token>"
}
#### Response Body:
{
    "status": true,
    "data": [
        {
            "quizName": "FrontEnd Quiz",
            "quizType": "MCQ",
            "timeLimit": 1,
            "topicTags": [
                "LinkedList",
                "DSA"
            ],
            "totalScore": 2,
            "isActive": true
        },
        {
            "quizName": "FrontEnd Quiz",
            "quizType": "MCQ",
            "timeLimit": 2,
            "topicTags": [
                "LinkedList",
                "DSA"
            ],
            "totalScore": 2,
            "isActive": true
        },
        {
            "quizName": "FrontEnd Quiz",
            "quizType": "MCQ",
            "timeLimit": 30,
            "topicTags": [
                "LinkedList",
                "DSA"
            ],
            "totalScore": 2,
            "isActive": true
        }
    ]
}

### 14. Get Ongoing Quizzes
#### Method: GET
#### Authorization: JWT token required
#### URL: localhost:3000/getQuizes
#### Request Body:
{
"userId": "<user_id_from_token>"
}
#### Response Body:
{
   "status": true,
   "data": [
        {
            "quizName": "try Quiz",
            "quizType": "MCQ",
            "timeLimit": 60,
            "topicTags": [
                "LinkedList",
                "DSA"
            ],
            "totalScore": 100,
            "isActive": true
        },
        {
            "quizName": "try Quiz",
            "quizType": "MCQ",
            "timeLimit": 60,
            "topicTags": [
                "LinkedList",
                "DSA"
            ],
        }
   ]
}

### 15. Start Quiz
#### Method: GET
#### Authorization: JWT token required
#### URL: localhost:3001/startQuiz/quizId
#### Response Body:
{
    "status": true,
    "message": "Quiz is starting"
}
### 16. Questions
#### Method: GET
#### Authorization: JWT token required
#### URL: localhost:3001/question/6433d0a3ee13163ae8e83c13?page=2
#### Response Body:
Question1
{
    "status": true,
    "message": "question",
    "data": [
        {
            "_id": "6433d1a6ee13163ae8e83c1e",
            "question": "Which of the following is not javascript data types?",
            "options": {
                "1": "Null type",
                "2": "Undefined type",
                "3": "Number type",
                "4": "All of the mentioned"
            },
            "marks": 2
        }
    ]
}

#### Request Body:
Question1 answer
{
    "questionId":"6433d1a6ee13163ae8e83c1e",
    "answer":"4",
    "marks":"2"
}

#### Response Body:
Question2
{
    "status": true,
    "message": "question",
    "data": [
        {
            "_id": "6433d1a7ee13163ae8e83c22",
            "question": "Which of the following is not javascript data types?",
            "options": {
                "1": "Null type",
                "2": "Undefined type",
                "3": "Number type",
                "4": "All of the mentioned"
            },
            "marks": 2
        }
    ]
}

#### Response Body:
Final result after quiz time is up
{
    "status": true,
    "data": {
        "totalQuizScore": 15,
        "myTotalScore": 9,
        "totalCorrectAnswer": 3,
        "totalWrongAnswer": 3,
        "totalQuestions": 0,
        "totalQuestionsAttempted": 0
    }
}


### 17. Submit Quiz
#### Method: GET
#### Authorization: JWT token required
#### URL: localhost:3001/submit/64330ed77165719c54acc732
#### Response Body:
{
    "status": true,
    "data": {
        "totalQuizScore": 15,
        "myTotalScore": 9,
        "totalCorrectAnswer": 3,
        "totalWrongAnswer": 3,
        "totalQuestions": 0,
        "totalQuestionsAttempted": 0
    }
}
