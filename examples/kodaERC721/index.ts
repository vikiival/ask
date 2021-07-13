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
}