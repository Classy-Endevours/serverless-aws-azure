
const fakeData = {
    reports: {
        oneReport: () => ({
            description: "test",
            attachmentURL: "test",
        }),
        manyReport: (length = 2) => {
            return [...Array(length).keys()].map(idx => ({
                description: `test-${idx}`,
                attachmentURL: `test-url-${idx}`,
            }))
        }
    }
}

export default fakeData
