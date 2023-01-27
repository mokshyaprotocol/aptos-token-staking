
import { AptosClient,TokenClient, AptosAccount, FaucetClient, } from "aptos";


const NODE_URL = process.env.APTOS_NODE_URL || "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = process.env.APTOS_FAUCET_URL || "https://faucet.devnet.aptoslabs.com";


const client = new AptosClient(NODE_URL);
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);
//pid
const pid="0xb96f8e38894d0e6310f846fb29b661015b510816859d1600f239b45bf14dfea0";
// Creator Account
const account1 = new AptosAccount();
// Staker Account
const account2 = new AptosAccount();
const collection = "Mokshya Collection";
const tokenname = "Mokshya Token #1";
const description="Mokshya Token for test"
const uri = "https://github.com/mokshyaprotocol"
const tokenPropertyVersion = BigInt(0);

const token_data_id =  {creator: account1.address().hex(),
  collection: collection,
  name: tokenname,

}
const tokenId = {
  token_data_id,
  property_version: `${tokenPropertyVersion}`,
};
const tokenClient = new TokenClient(client); // <:!:section_1b

/**
 * Testing Staking Contract
 */
 describe("Token Staking", () => {
  it ("Create Collection", async () => {
    await faucetClient.fundAccount(account1.address(), 1000000000);//Airdropping
    const create_collection_payloads = {
      type: "entry_function_payload",
      function: "0x3::token::create_collection_script",
      type_arguments: [],
      arguments: [collection,description,uri,BigInt(100),[false, false, false]],
    };
    let txnRequest = await client.generateTransaction(account1.address(), create_collection_payloads);
    let bcsTxn = AptosClient.generateBCSTransaction(account1, txnRequest);
    let hash=await client.submitSignedBCSTransaction(bcsTxn);
    console.log(hash);

  });
  it ("Create Token", async () => {
    const create_token_payloads = {
      type: "entry_function_payload",
      function: "0x3::token::create_token_script",
      type_arguments: [],
      arguments: [collection,tokenname,description,BigInt(5),BigInt(10),uri,account1.address(),
        BigInt(100),BigInt(0),[ false, false, false, false, false, false ],
        [ "attack", "num_of_use"],
        [[1,2],[1,2]],
        ["Bro","Ho"]
      ],
    };
    let txnRequest = await client.generateTransaction(account1.address(), create_token_payloads);
    let bcsTxn = AptosClient.generateBCSTransaction(account1, txnRequest);
    let hash=await client.submitSignedBCSTransaction(bcsTxn);
    console.log(hash);
  });
  it ("Opt In Transfer ", async () => {
    await faucetClient.fundAccount(account2.address(), 1000000000);//Airdropping
    const create_token_payloads = {
      type: "entry_function_payload",
      function: "0x3::token::opt_in_direct_transfer",
      type_arguments: [],
      arguments: [true],
    };
    let txnRequest = await client.generateTransaction(account2.address(), create_token_payloads);
    let bcsTxn = AptosClient.generateBCSTransaction(account2, txnRequest);
    let hash=await client.submitSignedBCSTransaction(bcsTxn);
    console.log(hash);
  });
  it ("Transfer Token ", async () => {
    const create_token_payloads = {
      type: "entry_function_payload",
      function: "0x3::token::transfer_with_opt_in",
      type_arguments: [],
      arguments: [account1.address(),collection,tokenname,tokenPropertyVersion,account2.address(),BigInt(1)],
    };
    let txnRequest = await client.generateTransaction(account1.address(), create_token_payloads);
    let bcsTxn = AptosClient.generateBCSTransaction(account1, txnRequest);
    let hash=await client.submitSignedBCSTransaction(bcsTxn);
    console.log(hash);
  
  });
  it ("Create Staking", async () => {
    const create_staking_payloads = {
      type: "entry_function_payload",
      function: pid+"::tokenstaking::create_staking",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [86400,collection,1000000
      ],
    };
    let txnRequest = await client.generateTransaction(account1.address(), create_staking_payloads);
    let bcsTxn = AptosClient.generateBCSTransaction(account1, txnRequest);
    let hash=await client.submitSignedBCSTransaction(bcsTxn);
    console.log(hash);
  });
  it ("Stake Token", async () => {
    const create_staking_payloads = {
      type: "entry_function_payload",
      function: pid+"::tokenstaking::stake_token",
      type_arguments: [],
      arguments: [account1.address(),collection,tokenname,tokenPropertyVersion,BigInt(1)
      ],
    };
    let txnRequest = await client.generateTransaction(account2.address(), create_staking_payloads);
    let bcsTxn = AptosClient.generateBCSTransaction(account2, txnRequest);
    let hash=await client.submitSignedBCSTransaction(bcsTxn);
    console.log(hash);
  });
  it ("Get Reward", async () => {
    const create_staking_payloads = {
      type: "entry_function_payload",
      function:pid+"::tokenstaking::claim_reward",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [collection,tokenname,account1.address()
      ],
    };
    let txnRequest = await client.generateTransaction(account2.address(), create_staking_payloads);
    let bcsTxn = AptosClient.generateBCSTransaction(account2, txnRequest);
    let hash=await client.submitSignedBCSTransaction(bcsTxn);
    console.log(hash);
  });
  it ("Unstake Token", async () => {
    const create_staking_payloads = {
      type: "entry_function_payload",
      function: pid+"::tokenstaking::unstake_token",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [account1.address(),collection,tokenname,tokenPropertyVersion
      ],
    };
    let txnRequest = await client.generateTransaction(account2.address(), create_staking_payloads);
    let bcsTxn = AptosClient.generateBCSTransaction(account2, txnRequest);
    let hash=await client.submitSignedBCSTransaction(bcsTxn);
    console.log(hash);
  });
  it ("Re-Stake Token", async () => {
    const create_staking_payloads = {
      type: "entry_function_payload",
      function: pid+"::tokenstaking::stake_token",
      type_arguments: [],
      arguments: [account1.address(),collection,tokenname,tokenPropertyVersion,BigInt(1)
      ],
    };
    let txnRequest = await client.generateTransaction(account2.address(), create_staking_payloads);
    let bcsTxn = AptosClient.generateBCSTransaction(account2, txnRequest);
    let hash=await client.submitSignedBCSTransaction(bcsTxn);
    console.log(hash);
  });
  it ("Get Reward", async () => {
    const create_staking_payloads = {
      type: "entry_function_payload",
      function: pid+"::tokenstaking::claim_reward",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [collection,tokenname,account1.address()
      ],
    };
    let txnRequest = await client.generateTransaction(account2.address(), create_staking_payloads);
    let bcsTxn = AptosClient.generateBCSTransaction(account2, txnRequest);
    let hash=await client.submitSignedBCSTransaction(bcsTxn);
    console.log(hash);
  });
  });
