import { ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DestroyableComponent } from './destroyable-component.abstract';

export abstract class ModalAbstract extends DestroyableComponent {
  protected abstract modal?: ElementRef;

  constructor(protected readonly modalService: NgbModal) {
    super();
  }

  openModal(): void {
    this.modalService.open(this.modal, { centered: true, backdrop: 'static' });
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }
}
