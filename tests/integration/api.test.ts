import { find } from "../../api/report";
import { prisma } from "../../repo/index"

// jest.mock('../../prisma/index');

it('returns categories from the database', async () => {
    await prisma.reports.createMany({
      data: [
        { id: 1, description: 'hello' },
        { id: 2, description: 'world' },
      ],
    });
  
    const response = await find({});
    console.log({
        response
    })
    expect(response.statusCode).toStrictEqual(200);
    // expect(response.body.data.categories).toMatchSnapshot();
  });