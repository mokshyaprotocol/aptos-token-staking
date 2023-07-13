
import { HexString,AptosClient, Provider,Network,TxnBuilderTypes, BCS } from "aptos";



export class StakingClient
{
  client: AptosClient;
  pid: string;
  provider:Provider;

  constructor(nodeUrl: string, pid:string,network:Network) {
    this.client = new AptosClient(nodeUrl);
    // Initialize the module owner account here
    this.pid = pid
    this.provider= new Provider(network)
  }
  /**
   * Create Staking
   * @param stakingCreator staking creator
   * @param dpr daily interest rate
   * @param collectionName Collection name
   * @param totalAmount Total Amount
   * @param typeArgs Type Arguments
   * @returns Promise<TxnBuilderTypes.RawTransaction>
   */
  // :!:>createStaking
  async createStaking(
    stakingCreator: HexString,
    dpr: BCS.AnyNumber,
    collectionName: string,
    totalAmount: BCS.AnyNumber,
    typeArgs: string,
  ): Promise<TxnBuilderTypes.RawTransaction> {
    return await this.provider.generateTransaction(stakingCreator, {
      function: `${this.pid}::mokshyastaking::create_staking`,
      type_arguments: [typeArgs],
      arguments: [dpr,collectionName, collectionName,totalAmount],
    });
  }
  /**
   *  Update DPR
   * @param  stakingCreator staking creator
   * @param dpr daily interest rate
   * @param collectionName Collection name
   * @returns Promise<TxnBuilderTypes.RawTransaction>
   */
  // :!:>updateDPR
  async updateDPR(
    stakingCreator:HexString,
    dpr: BCS.AnyNumber,
    collectionName: string,
    ): Promise<TxnBuilderTypes.RawTransaction> {
      return await this.provider.generateTransaction(stakingCreator, {
        function: `${this.pid}::mokshyastaking::update_dpr`,
        type_arguments: [],
        arguments: [dpr,collectionName,],
      });
  }
    /**
   *  creatorStopStaking
   * @param  stakingCreator staking creator
   * @param collectionName Collection name
   * @returns Promise<TxnBuilderTypes.RawTransaction>
   */
  // :!:>creatorStopStaking
  async creatorStopStaking(
    stakingCreator:HexString,
    collectionName: string,
    ): Promise<TxnBuilderTypes.RawTransaction> {
      return await this.provider.generateTransaction(stakingCreator, {
        function: `${this.pid}::mokshyastaking::creator_stop_staking`,
        type_arguments: [],
        arguments: [collectionName,],
      });
  }
    /**
   *  deposit_staking_rewards
   * @param  stakingCreator staking creator
   * @param amount additional staking rewards
   * @param collectionName Collection name
   * @param typeArgs Type Arguments
   * @returns Promise<TxnBuilderTypes.RawTransaction>
   */
  // :!:>deposit_staking_rewards
  async depositStakingRewards(
    stakingCreator:HexString,
    amount: BCS.AnyNumber,
    collectionName: string,
    typeArgs: string,
    ): Promise<TxnBuilderTypes.RawTransaction> {
      return await this.provider.generateTransaction(stakingCreator, {
        function: `${this.pid}::mokshyastaking::deposit_staking_rewards`,
        type_arguments: [typeArgs],
        arguments: [collectionName,amount,],
      });
  }
   /**
   *  Staking
   * @param staker Who stakes token
   * @param stakingCreator staking creator
   * @param collectionName Collection name
   * @param tokenName Token name
   * @param propertyVersion token property version
   * @param tokens number of tokens to be staked
   * @returns Promise<TxnBuilderTypes.RawTransaction>
   */
  // :!:>stakeToken
  async stakeToken(
    staker: HexString,
    stakingCreator: HexString,
    collectionName: string,
    tokenName:string,
    propertyVersion: BCS.AnyNumber,
    tokens: BCS.AnyNumber,
  ): Promise<TxnBuilderTypes.RawTransaction> {
    return await this.provider.generateTransaction(staker, {
      function: `${this.pid}::mokshyastaking::stake_token`,
      type_arguments: [],
      arguments: [stakingCreator,collectionName,tokenName,propertyVersion,tokens],
    });
  }
  /**
   *  Claim Reward
   * @param staker Who stakes token
   * @param stakingCreator staking creator
   * @param collectionName Collection name
   * @param tokenName Token name
   * @returns Promise<TxnBuilderTypes.RawTransaction>
   */
  // :!:>claim_reward
  async claimReward(
    staker: HexString,
    stakingCreator: HexString,
    collectionName: string,
    tokenName:string,
  ): Promise<TxnBuilderTypes.RawTransaction> {
    return await this.provider.generateTransaction(staker, {
      function: `${this.pid}::mokshyastaking::claim_reward`,
      type_arguments: [],
      arguments: [collectionName,tokenName,stakingCreator,],
    });
  }
      /**
   *  UnStaking
   * @param staker Who stakes token
   * @param stakingCreator staking creator
   * @param collectionName Collection name
   * @param tokenName Token name
   * @param propertyVersion token property version
   * @param typeArgs type Arguments
   * @returns Promise<TxnBuilderTypes.RawTransaction>
   */
  // :!:>unstakeToken
  async unstakeToken(
    staker: HexString,
    stakingCreator: HexString,
    collectionName: string,
    tokenName:string,
    propertyVersion: BCS.AnyNumber,
    typeArgs: string,
  ): Promise<TxnBuilderTypes.RawTransaction> {
    return await this.provider.generateTransaction(staker, {
      function: `${this.pid}::mokshyastaking::unstake_token`,
      type_arguments: [typeArgs],
      arguments: [stakingCreator,collectionName,tokenName,propertyVersion,],
    });
  }
}

