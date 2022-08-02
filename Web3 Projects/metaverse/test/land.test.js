const Land = artifacts.require("./Land")

require('chai')
    .use(require('chai-as-promised'))
    .should()

const EVM_REVERT =   "VM Exception while processing transaction: revert"

contract("Land", ([owner1, owner2]) => {
    const NAME = 'DApp U Buildings'
    const SYMBOL = 'DUB'
    const COST = web3.utils.toWei('1', 'ether')

    let land, result

beforeEach( asynch () => {
    land = await Land.new(NAME, SYMBOL, COST)
})

    describe("Deployment", () => {
        it("returns the contract name", async () => {
            result = await land.name()
            result.should.equal(NAME)
        })

        it("returns the symbol", async () => {
            result = await land.symbol()
            result.should.equal(SYMBOL)
        })

        it("returns the cost to mint", async () => {
            result = await land.cost()
            result.toString().should.equal(COST)
        })

        it("returns the max supply", async () => {
            result = await land.maxSupply()
            result.toString().should.equal('5')
        })

        it("Returns the number of buildings/land available", async () => {
            result = await land.getBuildings()
            result.length.should.equal(5)
        })
    })

    describe("Minting", () => {
        describe("Success", () => {
            beforeEach(async () => {
                result = await land.mint(1, {from: owner1, value: COST})
            })
            // result = await land.mint(1, {from: owner1, value: COST})
           
           it("Updates the owner address", async () => {
            result = await land.ownerOf(1)
            result.should.equal(owner1)
        })
        
        it("Updates building details", async () => {
            result = await land.getBuilding(1)
            result.owner.should.equal(owner1)
        })
    })

    describe('Failure', () => {
        it("prevents mint with 0 value", async () => {
            await land.mint(1, { from: owner1, value: 0 }).should.be.rejectedWith(EVM_REVERT)
        })

        it('Prevents mint with invalid ID', async () => {
            await land.mint(100, { from: ownder1, value: COST }).should.be.rejectedWith(EVM_REVERT)
        })

        it('Prevents minting if already ownded', async () => {
            await land.mint(1, { from: owner1, value: COST })
            await land.mint(1, { from: owner2, value: COST }).should.be.rejectedWith(EVM_REVERT)
        })
            describe('Transfers', () => {
                describe('success', () => {
                    beforeEach( async () => {
                        land.mint(1, {from : owner1, value: COST})
                        land.approve(owner2, 1, {from : owner1})
                        land.transferFrom(owner1, owner2, 1, { from: owner2 })

                    })

                    it('Updates the owner address', async () => {
                        result = await land.ownerOf(1)
                        result.should.equal(owner2)
                    })

                    it('Updates nuilding details', async () => {
                        result = await land.getBuilding(1)
                        result.owner.should.equal(owner2)
                    })
                })
                
                decribe('failure', () => {
                    it('Prevents transfers without ownership', async () => {
                        await land.transferFrom(owner1, owner2, 1, { from: owner2}).should.be.rejectedWith(EVM_REVERT)
                    })

                    it('Prevents transfers without ownership', async () => {
                        await land.mint(1, { from: owner1, value: COST })
                        await land.transferFrom(owner1, owner2, 1, { from: owner2}).should.be.rejectedWith(EVM_REVERT)
                    })
                
            })

            })


    })


        
    })
})