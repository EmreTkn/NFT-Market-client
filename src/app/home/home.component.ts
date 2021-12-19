import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NftServiceService } from '../nft-service.service';
import {ItemModel} from '../../models/ItemModel';
import { INFTITemModel } from 'src/models/NFTItemModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items:INFTITemModel[] = [];
  metaDataList$: Observable<INFTITemModel[]>;
  constructor(private nftService: NftServiceService) {
    this.items = this.nftService.items;
    this.metaDataList$ = this.nftService.metaDataList$;
   }

  async ngOnInit() {

  }
  consoleLog(){

  }
}
