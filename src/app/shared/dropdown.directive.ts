import { Directive, Renderer2, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show')   isOpen = false;

  @HostListener('click') onDDClick() {
    this.isOpen = !this.isOpen;    
  }

  
  constructor(private elRref: ElementRef, private renderer: Renderer2) {
  }

}
