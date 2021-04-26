var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Component, Input, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import * as iconData from './ionicon-data.json';
let IoniconSelectorComponent = class IoniconSelectorComponent {
    constructor(modalController) {
        this.modalController = modalController;
        this.showTemplateUtility = false;
        this.modalTitle = 'Select Icon...';
        this.inModal = false;
        this.iconList = iconData.default.icons;
        this.searchText = '';
        this.pageStart = 0;
        this.iconsPerPage = 100;
        this.copied = false;
    }
    ngOnInit() {
        this.initialize();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.modalController.getTop()) {
                this.inModal = true;
            }
            this.filterIcons('');
        });
    }
    filterIcons(search) {
        this.pageStart = 0;
        this.selectedIcon = undefined;
        if (search) {
            this.filteredIcons = this.iconList.filter((i) => i.name.includes(search.toLowerCase()));
        }
        else {
            this.filteredIcons = this.iconList.slice(0, this.iconsPerPage);
        }
    }
    searchChanged() {
        this.filterIcons(this.searchText);
    }
    nextPage() {
        this.selectedIcon = undefined;
        this.pageStart += this.iconsPerPage;
        this.filteredIcons = this.iconList.slice(this.pageStart, this.pageStart + this.iconsPerPage);
    }
    lastPage() {
        this.selectedIcon = undefined;
        this.pageStart -= this.iconsPerPage;
        if (this.pageStart < 0) {
            this.pageStart = 0;
        }
        this.filteredIcons = this.iconList.slice(this.pageStart, this.pageStart + this.iconsPerPage);
    }
    canNext() {
        if (!this.searchText) {
            if (this.pageStart + this.iconsPerPage < this.iconList.length) {
                return true;
            }
        }
        return false;
    }
    canLast() {
        return this.pageStart > 0;
    }
    selectIcon(icon) {
        this.selectedIcon = icon;
        if (this.inModal && !this.showTemplateUtility) {
            setTimeout(() => {
                this.modalController.dismiss(icon.name);
            }, 200);
        }
    }
    selectedClicked() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.selectedIcon || !this.inputElement) {
                return;
            }
            const element = yield this.inputElement.getInputElement();
            element.select();
            document.execCommand('copy');
            this.copied = true;
            setTimeout(() => {
                this.copied = false;
            }, 1000);
        });
    }
    selectedIconText() {
        if (this.selectedIcon) {
            return '<ion-icon name="' + this.selectedIcon.name + '"></ion-icon>';
        }
        else {
            return '';
        }
    }
    dismissModal() {
        if (this.inModal) {
            this.modalController.dismiss(this.selectedIcon ? this.selectedIcon.name : '');
        }
    }
};
__decorate([
    ViewChild(IonInput)
], IoniconSelectorComponent.prototype, "inputElement", void 0);
__decorate([
    Input()
], IoniconSelectorComponent.prototype, "showTemplateUtility", void 0);
__decorate([
    Input()
], IoniconSelectorComponent.prototype, "modalTitle", void 0);
IoniconSelectorComponent = __decorate([
    Component({
        selector: 'ionicon-selector',
        templateUrl: './ionicon-selector.component.html',
        styleUrls: ['./ionicon-selector.component.scss'],
    })
], IoniconSelectorComponent);
export { IoniconSelectorComponent };
//# sourceMappingURL=ionicon-selector.component.js.map