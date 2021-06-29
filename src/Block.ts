import crypto from 'crypto';

export class Block {

    static calculateBlockHash (index: number, previousHash: string, timestamp: number, data: string) : string {
      return crypto.createHash('SHA512').update(index + previousHash + timestamp + data, 'utf-8').digest('base64');
    }

    static validateStructure (block: Block) : boolean {
        return (block.index.constructor === Number) &&
            (block.hash.constructor === String) &&
            (block.previousHash.constructor === String) &&
            (block.data.constructor === String) &&
            (block.timestamp.constructor === Number)
    }

    #_index: number;
    #_hash: string;
    #_previousHash: string;
    #_data : string;
    #_timestamp: number;

    get index(): number {
        return this.#_index;
    }
    set index(value: number) {
        this.#_index = value;
    }

    get hash(): string {
        return this.#_hash;
    }
    set hash(value: string) {
        this.#_hash = value;
    }

    get previousHash(): string {
        return this.#_previousHash;
    }
    set previousHash(value: string) {
        this.#_previousHash = value;
    }

    get data(): string {
        return this.#_data;
    }
    set data(value: string) {
        this.#_data = value;
    }

    get timestamp(): number {
        return this.#_timestamp;
    }
    set timestamp(value: number) {
        this.#_timestamp = value;
    }

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data : string,
        timestamp: number
    ) {
        this.#_index = index;
        this.#_hash = hash;
        this.#_previousHash = previousHash;
        this.#_data = data;
        this.#_timestamp = timestamp;
    }
}
