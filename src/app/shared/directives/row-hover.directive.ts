import { Directive, ElementRef, HostListener,  Input } from '@angular/core';

@Directive({
  selector: '[appRowHover]'
})
export class RowHoverDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.pintarBG('#EFF0D1');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.pintarBG('');
  }

  private pintarBG(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }


}
