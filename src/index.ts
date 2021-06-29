// tsc-watch starts typescript compiler with --watch parameter with ability to react to compilation status

import {Block} from './Block';

const genesisBlock: Block = new Block(0, "202120212021", "", "vladimir", getNewTimeStamp());

let blockChains : Block[] = [genesisBlock];

function getBlockChains() : Block[] {
    return blockChains;
}

function getLastBlock() : Block {
    return blockChains[blockChains.length - 1];
}

function getNewTimeStamp() : number {
    return Math.round(Date.now() / 1000);
}

function isBlockValid (candidateBlock: Block, previousBlock: Block) : boolean {
    return (Block.validateStructure(candidateBlock)) &&
        (previousBlock.index + 1 === candidateBlock.index) &&
        (previousBlock.hash === candidateBlock.previousHash) &&
        Block.calculateBlockHash(candidateBlock.index, candidateBlock.previousHash, candidateBlock.timestamp, candidateBlock.data) === candidateBlock.hash
}

function createNewBlock(data: string) : Block {
    const previousBlock : Block = getLastBlock();
    const nextIndex : number = previousBlock.index + 1;
    const nextTimeStamp : number = getNewTimeStamp();
    const nextHash : string = Block.calculateBlockHash(nextIndex, previousBlock.hash, nextTimeStamp, data);

    const nextBlock : Block = new Block(nextIndex, nextHash, previousBlock.hash, data, nextTimeStamp);
    addBlock(nextBlock);

    return nextBlock;
};

function addBlock (newBlock: Block) : void  {
    if (isBlockValid(newBlock, getLastBlock())) getBlockChains().push(newBlock);
}


createNewBlock('jayce');
createNewBlock('akali');

blockChains.forEach((block: Block)=>{
    // 왜 안먹지?
    // const entries = Object.entries(block);
    // console.dir(entries);
    console.log(`index: ${block.index}, data: ${block.data}\nhash: ${block.hash} \nprevious Hash :${block.previousHash}`);
    console.log('============================================');
});

