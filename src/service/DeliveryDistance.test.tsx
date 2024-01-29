import { getDeliveryDistanceValue } from "./DeliveryDistance";

type TestCase = {
    input: number,
    output: number
};

describe("Surcharge", () =>  {
    let testCases = [
        {input: 500, output: 2},
        {input: 1000, output: 2},
        {input: 1001, output: 3},
        {input: 1499, output: 3},
        {input: 1500, output: 3},
        {input: 1501, output: 4},
    ];
    testCases.forEach((testCase: TestCase) => {
        test(`when The Distance is ${testCase.input} return fee is ${testCase.output} €` , () => {
            // given
            const distanceValue = testCase.input
            const expectedDeliveryFee = testCase.output;

            // when
            const actualDeliveryFee = getDeliveryDistanceValue(distanceValue);

            // then
            expect(actualDeliveryFee).toBe(expectedDeliveryFee);
        })
    })
});