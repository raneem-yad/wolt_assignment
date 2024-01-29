import { getSurchargeValue ,getDeliveryDistanceValue, getNumberOfItemsFeeValue  } from "./DeliveryCalculator";

type TestCase = {
    input: number,
    output: number
};

// ************ Cart Value Fee Testing ************ //
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

// ************ DeliveryDistance Fee Testing ************ //
describe("DeliveryDistance", () =>  {
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

// ************ surcharge with number of items ************ //
describe("Bulk Items Fee", () =>  {
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