export default {
    paragraphStyles: [
        {
            id: 'title',
            name: 'Title',
            basedOn: 'Normal',
            next: 'Normal',
            run: {
                size: 20 * 2,
                font: 'Times New Roman',
            },
            paragraph: {
                spacing: {
                    after: 300,
                },
            },
        },
        {
            id: 'question',
            name: 'Question',
            basedOn: 'Normal',
            next: 'Normal',
            run: {
                size: 12 * 2,
                font: 'Times New Roman',
            },
            paragraph: {
                spacing: {
                    before: 150,
                },
            },
        },
        {
            id: 'option',
            name: 'Option',
            basedOn: 'Normal',
            next: 'Normal',
            run: {
                size: 12 * 2,
                font: 'Times New Roman',
            },
        },
    ]
}