import { AccountId, AccountId0, u128 } from "ask-lang";

/**
  * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
  */
 @event
 export class Transfer {
  @topic from: AccountId = AccountId0;
  @topic to: AccountId = AccountId0;
  @topic tokenId: u128 = u128.Zero;

  constructor(from: AccountId, to: AccountId, tokenId: u128) {
    this.from = from;
    this.to = to;
    this.tokenId = tokenId;
  }
};

/**
 * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
 */
 @event
 export class Approval {
  @topic owner: AccountId;
  @topic approved: AccountId;
  @topic tokenId: u128;

  constructor(owner: AccountId, approved: AccountId, tokenId: u128) {
    this.owner = owner;
    this.approved = approved;
    this.tokenId = tokenId;
  }
}

/**
 * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
 */
 @event
 export class ApprovalForAll {
  @topic owner: AccountId;
  @topic operator: AccountId;

  approved: bool;

  constructor(owner: AccountId, operator: AccountId, approved: bool) {
    this.owner = owner;
    this.operator = operator;
    this.approved = approved;
  }
}

/**
 * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
 */
 @event
 export class Emoted {
  @topic from: AccountId = AccountId0;
  @topic tokenId: u128 = u128.Zero;
  
  emote: string = ''

  constructor(from: AccountId, tokenId: u128, emote: string) {
    this.from = from;
    this.emote = emote;
    this.tokenId = tokenId;
  }
};

/**
 * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
 */
 @event
 export class RoyaltySet {
  @topic from: AccountId = AccountId0;
  @topic tokenId: u128 = u128.Zero;
  @topic amount: u8 = u8.MIN_VALUE;

  constructor(from: AccountId, tokenId: u128, amount: u8) {
    this.from = from;
    this.amount = amount;
    this.tokenId = tokenId;
  }
};


/**
 * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
 */
 @event
 export class Listed {
  @topic from: AccountId = AccountId0;
  @topic tokenId: u128 = u128.Zero;
  @topic amount: string = '';

  constructor(from: AccountId, tokenId: u128, amount: string) {
    this.from = from;
    this.tokenId = tokenId;
    this.amount = amount;
  }
};