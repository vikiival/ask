import { AccountId, u128, msg } from "ask-lang";
import { ERC721 } from "./ERC721";

@contract
class MyERC721 extends ERC721 {
  constructor() {
    super();
  }

  @constructor
  default(name: string = "", symbol: string = ""): void {
    super.default(name, symbol);
  }

  @message
  mint(baseURI: string): void {
    this._create(baseURI);
  }

  @message
  transfer(to: AccountId, tokenId: u128): void {
    this._safeList(tokenId, u128.Zero)
    this._transfer(msg.sender, to, tokenId);
  }

  @message
  burn(tokenId: u128): void {
    this._burn(tokenId);
  }

  @message
  setTokenURI(tokenId: u128, tokenURI: string): void {
    this._setTokenURI(tokenId, tokenURI);
  }

  @message
  setBaseURI(baseURI: string): void {
    this._setBaseURI(baseURI);
  }

  @message
  setRoyalty(tokenId: u128, amount: u8): void {
    this._addRoyalty(tokenId, amount);
  }

  @message
  emote(tokenId: u128, data: string): void {
    this._emote(tokenId, data);
  }

  @message
  list(tokenId: u128, amount: u128): void {
    this._safeList(tokenId, amount);
  }

  @message(payable)
  buy(tokenId: u128): void {
    this._buy(tokenId);
  }

  @message(payable)
  send(to: AccountId): void {
    this._send(to);
  }
}