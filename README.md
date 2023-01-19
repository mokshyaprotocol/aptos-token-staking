Aptos Token Staking Contract

# Init

```
aptos init

```
# Test

``` 
aptos move test --named-addresses mokshyastaking=your_address
```
# Publish

```
 aptos move publish --named-addresses mokshyastaking=your_address
```
Copy the account address and replace in tests/staking.ts
# Set Up
```javascript
import {AptosClient, AptosAccount, FaucetClient, TxnBuilderTypes} from "aptos";

const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
// Creator Account
const account1 = new AptosAccount();
// Staker Account
const account2 = new AptosAccount();
```
# Create Staking
```javascript
const create_staking_payloads = {
      type: "entry_function_payload",
      function: "0x16bc6ca315f9203a9c090ce9bf5c23366e6dbc819e4c3efe96de0fcaecb42f01::tokenstaking::create_staking",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [BigInt(1),collection,BigInt(10)
      ],
    };
    let txnRequest = await client.generateTransaction(account1.address(), create_staking_payloads);
    let bcsTxn = AptosClient.generateBCSTransaction(account1, txnRequest);
    await client.submitSignedBCSTransaction(bcsTxn);

```
# Stake Token
```javascript
 const create_staking_payloads = {
      type: "entry_function_payload",
      function: "0x16bc6ca315f9203a9c090ce9bf5c23366e6dbc819e4c3efe96de0fcaecb42f01::tokenstaking::stake_token",
      type_arguments: [],
      arguments: [account1.address(),collection,tokenname,tokenPropertyVersion,BigInt(1)
      ],
    };
    let txnRequest = await client.generateTransaction(account2.address(), create_staking_payloads);
    let bcsTxn = AptosClient.generateBCSTransaction(account2, txnRequest);
    await client.submitSignedBCSTransaction(bcsTxn);
```
# Claim Reward
```javascript
 const create_staking_payloads = {
      type: "entry_function_payload",
      function: "0x16bc6ca315f9203a9c090ce9bf5c23366e6dbc819e4c3efe96de0fcaecb42f01::tokenstaking::claim_reward",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [collection,tokenname,account1.address()
      ],
    };
    let txnRequest = await client.generateTransaction(account2.address(), create_staking_payloads);
    let bcsTxn = AptosClient.generateBCSTransaction(account2, txnRequest);
    await client.submitSignedBCSTransaction(bcsTxn);
```
# Unstake Token
```javascript
const create_staking_payloads = {
      type: "entry_function_payload",
      function: "0x16bc6ca315f9203a9c090ce9bf5c23366e6dbc819e4c3efe96de0fcaecb42f01::tokenstaking::unstake_token",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [account1.address(),collection,tokenname,tokenPropertyVersion
      ],
    };
    let txnRequest = await client.generateTransaction(account2.address(), create_staking_payloads);
    let bcsTxn = AptosClient.generateBCSTransaction(account2, txnRequest);
    await client.submitSignedBCSTransaction(bcsTxn);

```