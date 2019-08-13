import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostListener('click') mouseHover(eventData: Event) {
    this.renderer.addClass(this.elRref.nativeElement, 'open');
  }

  // @HostListener('mouse') mouseLeave(eventData: Event) {
  //   this.renderer.addClass(this.elRref.nativeElement, 'show');
  // }
  constructor(private elRref: ElementRef, private renderer: Renderer2) {
  }

}
