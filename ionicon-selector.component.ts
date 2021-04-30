import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import * as iconData from './ionicon-data.json';

@Component({
  selector: 'ionicon-selector',
  templateUrl: './ionicon-selector.component.html',
  styleUrls: ['./ionicon-selector.component.scss'],
})
export class IoniconSelectorComponent implements OnInit {

  @ViewChild(IonInput)
  private inputElement!: IonInput;

  @Input()
  showTemplateUtility = false;

  @Input()
  modalTitle = 'Select Icon...';

  constructor( private modalController: ModalController ) { }

  inModal = false;

  iconList: any = (iconData as any).default.icons;

  filteredIcons: Array<any> | undefined;

  searchText = '';

  pageStart = 0;
  iconsPerPage = 100;

  selectedIcon: any;

  copied = false;

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    if ( await this.modalController.getTop() ) {
      this.inModal = true;
    }
    this.filterIcons('');
  }

  filterIcons( search: string ) {
    this.pageStart = 0;
    this.selectedIcon = undefined;
    if ( search ) {
      this.filteredIcons = this.iconList.filter( (i: { name: string; }) => i.name.includes( search.toLowerCase() ) );
    } else {
      this.filteredIcons = this.iconList.slice(0, this.iconsPerPage);
    }
  }

  searchChanged() {
    this.filterIcons( this.searchText );
  }

  nextPage() {
    this.selectedIcon = undefined;
    this.pageStart += this.iconsPerPage;
    this.filteredIcons = this.iconList.slice(this.pageStart, this.pageStart + this.iconsPerPage);
  }

  lastPage() {
    this.selectedIcon = undefined;
    this.pageStart -= this.iconsPerPage;
    if ( this.pageStart < 0 ) {
      this.pageStart = 0;
    }
    this.filteredIcons = this.iconList.slice(this.pageStart, this.pageStart + this.iconsPerPage);
  }

  canNext(): boolean {
    if (!this.searchText) {
      if (this.pageStart + this.iconsPerPage < this.iconList.length ) {
        return true;
      }
    }

    return false;
  }

  canLast(): boolean {
    return this.pageStart > 0;
  }

  selectIcon( icon: any ) {
    this.selectedIcon = icon;

    if ( this.inModal && !this.showTemplateUtility) {
      setTimeout( () => {
        this.modalController.dismiss( icon.name );
      }, 200 );
    }
  }

  async selectedClicked() {
    if ( !this.selectedIcon || !this.inputElement) {
      return;
    }
    const element = await this.inputElement.getInputElement();
    element.select();
    document.execCommand('copy');
    this.copied = true;

    setTimeout( () => {
      this.copied = false;
    }, 1000 );
  }

  selectedIconText(): string {
    if ( this.selectedIcon ) {
    return '<ion-icon name="' + this.selectedIcon.name + '"></ion-icon>';
    } else {
      return '';
    }
  }

  dismissModal() {
    if ( this.inModal ) {
      this.modalController.dismiss( this.selectedIcon ? this.selectedIcon.name : '');
    }
  }
}

