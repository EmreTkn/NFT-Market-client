import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  axios  from 'axios';
// import Web3 from "web3";
// import Web3Modal from "web3modal";
import NFT from '../../../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import { INFTITemModel } from 'src/models/NFTItemModel';
import { ItemModel } from 'src/models/ItemModel';
const nftmarketaddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const nftaddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

@Injectable({
  providedIn: 'root'
})
export class NftServiceService {
  marketContract: any;
  tokenContract: any;
  nftData:any;

  private metaDataListSource = new BehaviorSubject<INFTITemModel[]>([]);
  metaDataList$ = this.metaDataListSource.asObservable();


  items:INFTITemModel[] = [];


  constructor(private http: HttpClient) {
    this.getItemFromBlockChaine();
   }

  async getItemFromBlockChaine(){
    const provider = new ethers.providers.JsonRpcProvider('');
    this.tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    this.marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider);
    const metaDataList = await this.marketContract.fetchMarketItems();

    this.items = await Promise.all(metaDataList.map(async  (i:INFTITemModel) => {
      const tokenUri = await this.tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        itemId: i.itemId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item;
  })
  )
  this.metaDataListSource.next(this.items);
  }
}
