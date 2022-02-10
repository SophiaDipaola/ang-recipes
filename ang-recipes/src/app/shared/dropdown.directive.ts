import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  //   functionality to add css class to allow the dropdown to happen when it is clicked
  @HostBinding('class.open') isOpen = false
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen
  }
  constructor() { }

}
