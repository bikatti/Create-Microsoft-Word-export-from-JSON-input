import React, { useEffect, useState } from 'react';
import { Document, Packer, Paragraph } from 'docx';
import styles from './styles';

const WordExport = () => {
    // State hook to store the quiz data
    const [quizData, setQuizData] = useState(null);

    // Fetch the quiz data from a JSON file
    useEffect(() => {
        fetch('/example_input.json')
            .then((response) => response.json())
            .then((data) => setQuizData(data));
    }, []);

    // Helper function to create a Paragraph object with a given text and style
    const createParagraph = (text, style) => {
        return new Paragraph({
            text: text,
            style: style,
        });
    };

    // Helper function to create a title Paragraph object
    const createTitle = (text) => {
        return createParagraph(text, 'title');
    };

    // Helper function to create a question Paragraph object
    const createQuestion = (number, text) => {
        const questionText = `${number}. ${text}`;
        return createParagraph(questionText, 'question');
    };

    // Helper function to create an option Paragraph object
    const createOption = (label, text) => {
        const optionText = `${label}. ${text}`;
        return createParagraph(optionText, 'option');
    };

    // Handler function to generate a Word document
    const generateWordDocument = () => {
        // Check if there is quiz data available
        if (!quizData) {
            console.log('No Quiz Data inputted');
            return;
        }

        const children = [createTitle(quizData.title)];

        // Loop through the quiz questions and options to create Paragraph objects
        quizData.questions.forEach((questionData, index) => {
            const question = createQuestion(index + 1, questionData.question);
            children.push(question);

            questionData.options.forEach((option, optionIndex) => {
                const optionLabel = String.fromCharCode(97 + optionIndex);
                const optionElement = createOption(optionLabel, option.value);
                children.push(optionElement);
            });
        });

        // Create a new Word document with the prepared Paragraph objects
        const doc = new Document({
            styles,
            sections: [
                {
                    children: children,
                },
            ],
        });

        // Package the document and download it
        Packer.toBlob(doc).then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'generated-document.docx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        });
    };

    // Determine if the Download Word Document button should be disabled
    const isDisabled = !quizData;

    return (
        <button onClick={generateWordDocument} disabled={isDisabled}>
            Download Word Document
        </button>
    );
};

export default WordExport;