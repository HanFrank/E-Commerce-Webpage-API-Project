import formatCurrency from './util';

test("TestFormatCurrencyShortInteger", () => {
    expect(formatCurrency(3)).toBe("$3 ");
})

test("TestFormatCurrencyLongInteger", () => {
    expect(formatCurrency(313131435234)).toBe("$313,131,435,234 ");
})

test("TestFormatCurrencySingleDecimal", () => {
    expect(formatCurrency(1.4)).toBe("$1.4 ");
})

test("TestFormatCurrencyTwoDecimal", () => {
    expect(formatCurrency(2.65)).toBe("$2.65 ");
})

test("TestFormatCurrencyMultipleDecimal", () => {
    expect(formatCurrency(6.13213)).toBe("$6.13 ");
})
