export class Price {
    private readonly value: number;

    constructor(amount: number) {
        this.value = amount;
    }

    getValue(): number {
        return this.value;
    }

    toString(): string {
        return this.value.toFixed(2);
    }

    equals(other: Price): boolean {
        return this.value === other.value;
    }
}
