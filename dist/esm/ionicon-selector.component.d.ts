import { OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
export declare class IoniconSelectorComponent implements OnInit {
    private modalController;
    private inputElement;
    showTemplateUtility: boolean;
    modalTitle: string;
    constructor(modalController: ModalController);
    inModal: boolean;
    iconList: any;
    filteredIcons: Array<any> | undefined;
    searchText: string;
    pageStart: number;
    iconsPerPage: number;
    selectedIcon: any;
    copied: boolean;
    ngOnInit(): void;
    initialize(): Promise<void>;
    filterIcons(search: string): void;
    searchChanged(): void;
    nextPage(): void;
    lastPage(): void;
    canNext(): boolean;
    canLast(): boolean;
    selectIcon(icon: any): void;
    selectedClicked(): Promise<void>;
    selectedIconText(): string;
    dismissModal(): void;
}
