import React, { useState } from 'react';
import './LearningPath.css';

const questions = [
    {
        id: 1,
        text: "What type of systems do you prefer working with?",
        options: [
            { id: 'A', text: "Software systems (e.g., applications, websites)" },
            { id: 'B', text: "Hardware systems (e.g., circuits, devices)" },
            { id: 'C', text: "Data-driven systems (e.g., databases, analytics tools)" },
            { id: 'D', text: "Networked systems (e.g., servers, security protocols)" }
        ]
    },
    {
        id: 2,
        text: "Which of the following programming tasks interests you the most?",
        options: [
            { id: 'A', text: "Writing algorithms to solve problems" },
            { id: 'B', text: "Designing user interfaces or front-end applications" },
            { id: 'C', text: "Managing and querying databases" },
            { id: 'D', text: "Automating processes using scripts or tools" }
        ]
    },
    {
        id: 3,
        text: "Which area of computer science are you most curious about?",
        options: [
            { id: 'A', text: "Artificial Intelligence and Machine Learning" },
            { id: 'B', text: "Robotics and Embedded Systems" },
            { id: 'C', text: "Data Science and Big Data Analytics" },
            { id: 'D', text: "Cybersecurity and Ethical Hacking" }
        ]
    },
    {
        id: 4,
        text: "How do you approach problem-solving in technical tasks?",
        options: [
            { id: 'A', text: "Break the problem into smaller steps and write code to solve it" },
            { id: 'B', text: "Use tools or hardware to test and debug issues" },
            { id: 'C', text: "Analyze data trends to find a solution" },
            { id: 'D', text: "Secure the system by identifying vulnerabilities" }
        ]
    },
    {
        id: 5,
        text: "Which of these technical skills would you like to improve?",
        options: [
            { id: 'A', text: "Programming in languages like Python, Java, or C++" },
            { id: 'B', text: "Understanding how hardware components work together" },
            { id: 'C', text: "Working with data visualization tools like Tableau or Power BI" },
            { id: 'D', text: "Learning how to protect networks from cyberattacks" }
        ]
    },
    {
        id: 6,
        text: "What do you enjoy more: building or analyzing systems?",
        options: [
            { id: 'A', text: "Building software applications from scratch" },
            { id: 'B', text: "Designing hardware systems like IoT devices or robots" },
            { id: 'C', text: "Analyzing data for insights and predictions" },
            { id: 'D', text: "Testing and securing existing systems" }
        ]
    },
    {
        id: 7,
        text: "Which type of project excites you the most?",
        options: [
            { id: 'A', text: "Developing a mobile app or game" },
            { id: 'B', text: "Building a robot or smart device" },
            { id: 'C', text: "Creating a machine learning model to predict outcomes" },
            { id: 'D', text: "Setting up a secure network infrastructure" }
        ]
    },
    {
        id: 8,
        text: "Which programming concept do you find most interesting?",
        options: [
            { id: 'A', text: "Object-Oriented Programming (OOP), like in Java or Python" },
            { id: 'B', text: "Low-level programming for hardware, like in C or Assembly" },
            { id: 'C', text: "Writing SQL queries for data manipulation" },
            { id: 'D', text: "Scripting for automation, like in Bash or PowerShell" }
        ]
    },
    {
        id: 9,
        text: "How comfortable are you with debugging code?",
        options: [
            { id: 'A', text: "Very comfortable; I enjoy finding and fixing errors in programs" },
            { id: 'B', text: "Somewhat comfortable; I can debug simple issues but need practice with complex ones" },
            { id: 'C', text: "Not very comfortable; I prefer analyzing code rather than debugging it" },
            { id: 'D', text: "I have no experience with debugging but want to learn" }
        ]
    },
    {
        id: 10,
        text: "Which emerging technology would you like to explore further?",
        options: [
            { id: 'A', text: "Artificial Intelligence (AI/ML models, neural networks)" },
            { id: 'B', text: "Internet of Things (IoT devices, smart sensors)" },
            { id: 'C', text: "Blockchain (secure ledgers, cryptocurrency applications)" },
            { id: 'D', text: "Cloud Computing (AWS, Azure, Google Cloud)" }
        ]
    },
    {
        id: 11,
        text: "How do you feel about working with databases?",
        options: [
            { id: 'A', text: "I enjoy writing SQL queries and managing data" },
            { id: 'B', text: "I'm curious but haven't worked much with databases" },
            { id: 'C', text: "I prefer other areas like programming or hardware" },
            { id: 'D', text: "Databases don't interest me" }
        ]
    },
    {
        id: 12,
        text: "Which aspect of cybersecurity interests you the most?",
        options: [
            { id: 'A', text: "Finding vulnerabilities in systems" },
            { id: 'B', text: "Protecting networks from attacks" },
            { id: 'C', text: "Encrypting sensitive data" },
            { id: 'D', text: "Monitoring system activity for threats" }
        ]
    },
    {
        id: 13,
        text: "Do you enjoy working with algorithms?",
        options: [
            { id: 'A', text: "Yes, I love solving algorithmic problems" },
            { id: 'B', text: "Somewhat; I prefer practical applications over theory" },
            { id: 'C', text: "Not really; I find algorithms too abstract" },
            { id: 'D', text: "Unsure; I haven't explored them much" }
        ]
    },
    {
        id: 14,
        text: "How familiar are you with networking concepts?",
        options: [
            { id: 'A', text: "Very familiar; I know protocols like TCP/IP and DNS" },
            { id: 'B', text: "Somewhat familiar; I understand basic networking terms" },
            { id: 'C', text: "Not familiar but interested in learning more" },
            { id: 'D', text: "Not interested in networking" }
        ]
    },
    {
        id: 15,
        text: "Which type of data analysis task sounds appealing to you?",
        options: [
            { id: 'A', text: "Cleaning and preprocessing raw data" },
            { id: 'B', text: "Building predictive models using machine learning" },
            { id: 'C', text: "Visualizing data trends using dashboards" },
            { id: 'D', text: "None; I'm not interested in data analysis" }
        ]
    },
    {
        id: 16,
        text: "How do you feel about learning new programming languages?",
        options: [
            { id: 'A', text: "Excited! I want to learn as many as possible" },
            { id: 'B', text: "Interested, but only if they're relevant to my goals" },
            { id: 'C', text: "Neutral; I'd rather focus on mastering one language" },
            { id: 'D', text: "Uninterested in learning new languages" }
        ]
    },
    {
        id: 17,
        text: "Do you prefer theoretical concepts or hands-on work?",
        options: [
            { id: 'A', text: "Hands-on work; I enjoy building things practically" },
            { id: 'B', text: "Both equally excite me depending on the topic" },
            { id: 'C', text: "Theoretical concepts; I enjoy understanding how things work deeply" }
        ]
    },
    {
        id: 18,
        text: "Are you interested in working on real-world technical problems?",
        options: [
            { id: 'A', text: "Yes! Solving real-world challenges excites me" },
            { id: 'B', text: "Somewhat; depends on the complexity of the problem" },
            { id: 'C', text: "No, I prefer academic exercises over real-world tasks" }
        ]
    },
    {
        id: 19,
        text: "What kind of technical role appeals to you the most?",
        options: [
            { id: 'A', text: "Software Developer (coding apps/websites)" },
            { id: 'B', text: "Hardware Engineer (working on devices/machines)" },
            { id: 'C', text: "Data Scientist (analyzing datasets)" },
            { id: 'D', text: "Cybersecurity Analyst (protecting systems)" }
        ]
    },
    {
        id: 20,
        text: "How would you describe your technical aptitude currently?",
        options: [
            { id: 'A', text: "Advanced; I have experience with multiple technical tools/concepts" },
            { id: 'B', text: "Intermediate; I'm comfortable with some areas but need more practice" },
            { id: 'C', text: "Beginner; I'm just starting out but eager to learn more" }
        ]
    },
    {
        id: 21,
        text: "Which type of technical task do you enjoy the most?",
        options: [
            { id: 'A', text: "Writing code to build applications or solve problems" },
            { id: 'B', text: "Designing and troubleshooting hardware systems" },
            { id: 'C', text: "Analyzing data to find trends and insights" },
            { id: 'D', text: "Securing systems and identifying vulnerabilities" }
        ],
        learningPath: {
            'A': "Software Development/Programming",
            'B': "Hardware Engineering/IoT",
            'C': "Data Science/Analytics",
            'D': "Cybersecurity"
        }
    },
    {
        id: 22,
        text: "How do you approach learning new technologies?",
        options: [
            { id: 'A', text: "Experiment with tools and build projects hands-on" },
            { id: 'B', text: "Study theoretical concepts deeply before applying them" },
            { id: 'C', text: "Follow structured courses or certifications for guidance" },
            { id: 'D', text: "Collaborate with peers and learn through teamwork" }
        ],
        learningPath: {
            'A': "Practical fields like Web Development or Robotics",
            'B': "Research-oriented fields like AI/ML or Networking",
            'C': "Certification-based paths like Cloud Computing or Cybersecurity",
            'D': "Collaborative roles like Project Management or DevOps"
        }
    },
    {
        id: 23,
        text: "Which of these technical concepts excites you the most?",
        options: [
            { id: 'A', text: "Algorithms and data structures for efficient problem-solving" },
            { id: 'B', text: "Circuit design and embedded systems for innovative devices" },
            { id: 'C', text: "Machine learning models for predictive analytics" },
            { id: 'D', text: "Cryptography and ethical hacking for secure systems" }
        ],
        learningPath: {
            'A': "Competitive Programming/Software Engineering",
            'B': "Embedded Systems/Hardware Design",
            'C': "AI/ML/Data Science",
            'D': "Cybersecurity/Ethical Hacking"
        }
    },
    {
        id: 24,
        text: "What kind of tools do you prefer working with?",
        options: [
            { id: 'A', text: "Programming languages like Python, Java, or C++" },
            { id: 'B', text: "Hardware tools like Arduino, Raspberry Pi, or sensors" },
            { id: 'C', text: "Data tools like SQL, Tableau, or Excel" },
            { id: 'D', text: "Security tools like Kali Linux, Wireshark, or firewalls" }
        ],
        learningPath: {
            'A': "Software Development/Full Stack Development",
            'B': "IoT/Robotics/Hardware Engineering",
            'C': "Data Analytics/Data Science",
            'D': "Cybersecurity/Network Administration"
        }
    },
    {
        id: 25,
        text: "How do you prefer solving technical challenges?",
        options: [
            { id: 'A', text: "Writing efficient code to automate solutions" },
            { id: 'B', text: "Building physical prototypes to test ideas" },
            { id: 'C', text: "Using statistical methods to analyze data and predict outcomes" },
            { id: 'D', text: "Identifying system vulnerabilities and fixing them" }
        ],
        learningPath: {
            'A': "Software Engineering/Automation Development",
            'B': "Robotics/Hardware Design/IoT Systems",
            'C': "Data Science/Machine Learning Analytics",
            'D': "Cybersecurity/Ethical Hacking"
        }
    }
];

const LearningPath = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isComplete, setIsComplete] = useState(false);

    const handleAnswer = (questionId, optionId) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionId
        }));
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setIsComplete(true);
            // Here you can send the answers to your backend
            console.log('Final Answers:', JSON.stringify(answers, null, 2));
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    if (isComplete) {
        // Calculate the most common learning path based on the last 5 questions
        const getLearningPathSuggestions = () => {
            const pathCounts = {};
            for (let i = 21; i <= 25; i++) {
                const answer = answers[i];
                if (answer && questions[i-1].learningPath) {
                    const path = questions[i-1].learningPath[answer];
                    pathCounts[path] = (pathCounts[path] || 0) + 1;
                }
            }
            
            // Sort paths by count and get top 3
            return Object.entries(pathCounts)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([path]) => path);
        };

        const suggestedPaths = getLearningPathSuggestions();

        // Format detailed answers
        const getDetailedAnswers = () => {
            const detailedAnswers = {};
            questions.forEach(question => {
                const selectedOption = question.options.find(opt => opt.id === answers[question.id]);
                if (selectedOption) {
                    detailedAnswers[question.text] = selectedOption.text;
                }
            });
            return detailedAnswers;
        };

        return (
            <div className="learning-path-container">
                <h1>Learning Path Assessment Complete</h1>
                <div className="learning-path-content">
                    <div className="path-section">
                        <h2>Thank you for completing the assessment!</h2>
                        <p>Based on your responses, here are your recommended learning paths:</p>
                        <div className="learning-paths">
                            {suggestedPaths.map((path, index) => (
                                <div key={index} className="recommended-path">
                                    <h3>{index + 1}. {path}</h3>
                                </div>
                            ))}
                        </div>
                        <div className="answers-summary">
                            <h3>Your Detailed Responses:</h3>
                            <pre>{JSON.stringify(getDetailedAnswers(), null, 2)}</pre>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div className="learning-path-container">
            <h1>Learning Path Assessment</h1>
            <div className="learning-path-content">
                <div className="question-section">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                    <h2>Question {currentQuestion + 1} of {questions.length}</h2>
                    <div className="question">
                        <p>{question.text}</p>
                        <div className="options">
                            {question.options.map(option => (
                                <label key={option.id} className="option-label">
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={option.id}
                                        checked={answers[question.id] === option.id}
                                        onChange={() => handleAnswer(question.id, option.id)}
                                    />
                                    <span className="option-text">{option.text}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="navigation-buttons">
                        <button 
                            onClick={handlePrevious}
                            disabled={currentQuestion === 0}
                            className="nav-button"
                        >
                            Previous
                        </button>
                        <button 
                            onClick={handleNext}
                            className="nav-button"
                            disabled={!answers[question.id]}
                        >
                            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningPath; 