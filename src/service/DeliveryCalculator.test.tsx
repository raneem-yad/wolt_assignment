import { getSurchargeValue , getNumberOfItemsFeeValue } from "./DeliveryCalculator";

type TestCase = {
    input: number,
    output: number
};

describe("Surcharge", () =>  {
    let testCases = [
        {input: 10, output: 0},
        {input: 11, output: 0},
        {input: 9, output: 1},
        {input: 9.5, output: 0.5},
        {input: 1, output: 9},
        {input: 0, output: 0},  // zero cardValue give no surcharge
    ];
    testCases.forEach((testCase: TestCase) => {
        test(`when cart value ${testCase.input} return ${testCase.output}`, () => {
            // given
            const cartValue = testCase.input
            const expectedSurcharge = testCase.output;

            // when
            const actualSurcharge = getSurchargeValue(cartValue);

            // then
            expect(actualSurcharge).toBe(expectedSurcharge);
        })
    })
});


describe("Bulk Items Surcharge", () =>  {
    let testCases = [
        {input: 0, output: 0},
        {input: 4, output: 0},
        {input: 5, output: 0.5},
        {input: 10, output: 3},
        {input: 13, output: 5.70},
        {input: 14, output: 6.20},  // zero cardValue give no surcharge
    ];
    testCases.forEach((testCase: TestCase) => {
        test(`when number of items is  ${testCase.input} return the surcharge ${testCase.output} €`, () => {
            // given
            const numberOfItems = testCase.input
            const expectedSurcharge = testCase.output;

            // when
            const actualSurcharge = getNumberOfItemsFeeValue(numberOfItems);

            // then
            expect(actualSurcharge).toBe(expectedSurcharge);
        })
    })
});