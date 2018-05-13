import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { StoreApi } from 'models/Api/Store';
import { StoreProvider } from '../../providers/store/store';

@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {
  stores: StoreApi[];
  initialStores: StoreApi[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public storeProvider: StoreProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoresPage');
  }

  ngOnInit() {
    this.getStores();
  }

  getStores(): void {
    this.storeProvider.find().subscribe(s => {
      this.initialStores = s;
      this.stores = s;
    });
  }
  
  navigateToStorePage(store: StoreApi) {
    this.navCtrl.push('StorePage', {storeId: store.bid});

  }

  openFilters() {
    const filtersModal = this.modalCtrl.create('FiltersPage');
    filtersModal.present();
  }

  searchStores(event: any) {
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.stores = this.initialStores.filter((s) => {
        return (s.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.stores = this.initialStores;
    }
  }

}
