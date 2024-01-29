import Order from "../model/Orders";
import { getSurchargeValue, getDeliveryDistanceValue, getNumberOfItemsFeeValue, getAllFeesWithoutRushHours, getTotalFee ,calucateTotalFeeLimit} from "./DeliveryCalculator";

type TestCase = {
    input: any,
    output: any
};

// ************ Cart Value Fee Testing ************ //
describe("Surcharge", () => {
    let testCases = [
        { input: 10, output: 0 },
        { input: 11, output: 0 },
        { input: 9, output: 1 },
        { input: 9.5, output: 0.5 },
        { input: 1, output: 9 },
        { input: 0, output: 0 },  // zero cardValue give no surcharge
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
describe("DeliveryDistance", () => {
    let testCases = [
        { input: 500, output: 2 },
        { input: 1000, output: 2 },
        { input: 1001, output: 3 },
        { input: 1499, output: 3 },
        { input: 1500, output: 3 },
        { input: 1501, output: 4 },
    ];
    testCases.forEach((testCase: TestCase) => {
        test(`when The Distance is ${testCase.input} return fee is ${testCase.output} €`, () => {
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
describe("Bulk Items Fee", () => {
    let testCases = [
        { input: 0, output: 0 },
        { input: 4, output: 0 },
        { input: 5, output: 0.5 },
        { input: 10, output: 3 },
        { input: 13, output: 5.70 },
        { input: 14, output: 6.20 },  // zero cardValue give no surcharge
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

// ************ Calculate the fee before calculating the rush hours  ************ //
describe("Calculating the fee Value (Cart Value - num of items - distance ) ", () => {
    let testCases = [
        // { input: new Order(0,0,0,new Date) , output: 0 },
        { input: new Order(10, 2, 1000, new Date), output: 2 },
        { input: new Order(20, 5, 1503, new Date), output: 4.50 },
        { input: new Order(7, 1, 500, new Date), output: 5 },
        { input: new Order(80, 13, 1700, new Date), output: 9.70 },
        { input: new Order(31, 3, 4000, new Date), output: 8 },

    ];
    testCases.forEach((testCase: TestCase) => {
        test(`when the order  is  ${testCase.input} return the surcharge ${testCase.output} €`, () => {
            // given
            const orderInput = testCase.input
            const expectedSurcharge = testCase.output;

            // when
            const actualSurcharge = getAllFeesWithoutRushHours(orderInput.cartValue, orderInput.deliveryDistance, orderInput.numberOfItems);

            // then
            expect(actualSurcharge).toBe(expectedSurcharge);
        })
    })
});


// ************ Calculate the fee with the rush hours  ************ //
describe("Calculating the fee Value With the Rush Hour ", () => {
    let testCases = [
        // { input: new Order(0,0,0,new Date) , output: 0 },
        { input: new Order(10, 2, 1000, new Date("2024-02-02T15:24:00")), output: 2.4 }, //rush hour
        { input: new Order(20, 5, 1503, new Date("2024-02-02T11:00:00")), output: 4.50 }, //friday not rush hour
        { input: new Order(7, 1, 500, new Date("2024-01-26T15:24:00")), output: 6 },//rush hour
        { input: new Order(80, 13, 1700, new Date("2024-02-01T15:24:00")), output: 9.70 },//another day hour
        { input: new Order(31, 3, 4000, new Date("2024-02-04T15:24:00")), output: 8 },//another day hour

    ];
    testCases.forEach((testCase: TestCase) => {
        test(`when the order  is  ${testCase.input.time} return the fee ${testCase.output} €`, () => {
            // given
            const orderInput = testCase.input
            const expectedDeliveryFee = testCase.output;

            // when
            const actualDeliveryFee = getTotalFee(orderInput);

            // then
            expect(actualDeliveryFee).toBe(expectedDeliveryFee);
        })
    })
});

// ************ Calculate the fee with the rush hours  ************ //
describe("Calculating the fee Value With the Rush Hour ", () => {
    let testCases = [
        // { input: new Order(0,0,0,new Date) , output: 0 },
        { input: new Order(10, 2, 1000, new Date("2024-02-02T15:24:00")), output: 2.4 }, //rush hour
        { input: new Order(20, 5, 1503, new Date("2024-02-02T11:00:00")), output: 4.50 }, //friday not rush hour
        { input: new Order(7, 1, 500, new Date("2024-01-26T15:24:00")), output: 6 },//rush hour
        { input: new Order(80, 13, 1700, new Date("2024-02-01T15:24:00")), output: 9.70 },//another day hour
        { input: new Order(31, 3, 4000, new Date("2024-02-04T15:24:00")), output: 8 },//another day hour

    ];
    testCases.forEach((testCase: TestCase) => {
        test(`when the order  is  ${testCase.input.time} return the fee ${testCase.output} €`, () => {
            // given
            const orderInput = testCase.input
            const expectedDeliveryFee = testCase.output;

            // when
            const actualDeliveryFee = getTotalFee(orderInput);

            // then
            expect(actualDeliveryFee).toBe(expectedDeliveryFee);
        })
    })
});


// ************ Maxium Fee limitation  ************ //
describe("Maxium Fee limitation ", () => {
    let testCases = [
        // { input: new Order(0,0,0,new Date) , output: 0 },
        { input: new Order(10, 2, 1000, new Date("2024-02-02T15:24:00")), output: 2.4 }, //rush hour
        { input: new Order(100, 15, 7000, new Date("2024-02-02T11:00:00")), output: 15 }, //friday not rush hour
        { input: new Order(7, 1, 500, new Date("2024-01-26T15:24:00")), output: 6 },//rush hour
        { input: new Order(80, 13, 1700, new Date("2024-02-01T15:24:00")), output: 9.70 },//another day hour
        { input: new Order(120, 15, 7000, new Date("2024-02-04T15:24:00")), output: 15},//another day hour

    ];
    testCases.forEach((testCase: TestCase) => {
        test(`when the order  is  ${testCase.input.time} return the fee ${testCase.output} €`, () => {
            // given
            const orderInput = testCase.input
            const expectedDeliveryFee = testCase.output;

            // when
            const actualDeliveryFee = calucateTotalFeeLimit(orderInput);

            // then
            expect(actualDeliveryFee).toBe(expectedDeliveryFee);
        })
    })
});

// test(`testttttt`, () => {
    //     // given
    //     const order = new Order(1, 2, 3, new Date)
    //     const calculateSurcharge = (x: number) => x
    //     const calculateDistance = (x: number) => x
    //     const calculateRushHour = (x: number) => x

    //     // when
    //     const actualSurcharge = abdallahGetAllFeesWithoutRushHourss(order, calculateSurcharge, calculateDistance, calculateRushHour);

    //     // then
    //     expect(actualSurcharge).toBe(6);
    // })