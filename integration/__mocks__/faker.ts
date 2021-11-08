const fakeData = {
  reports: {
    oneReport: () => ({
      description: "test",
      attachmentURL: "test",
      statusReports: {
        create: [
          {
            status: "new",
          },
        ],
      },
    }),
    manyReport: (length = 2) => {
      return [...Array(length).keys()].map((idx) => ({
        description: `test-${idx}`,
        attachmentURL: `test-url-${idx}`,
      }));
    },
  },
};

export default fakeData;
