import { Directive, OnInit, OnChanges, Input, ElementRef, Renderer2, SimpleChanges, OnDestroy } from '@angular/core';

@Directive({
  selector: "[relativeLoader]",
})
export class RelativeLoaderDirective implements OnInit, OnChanges {
  private loader: HTMLElement;
  @Input() loading: boolean | undefined;
  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.loader = this.renderer.createElement("div");
  }
  ngOnInit(): void {}

  ngOnChanges( changes: SimpleChanges): void {
    if (this.loading && this.el) {
      this.createSimpleLoader();
      this.renderer.setStyle(
        this.el.nativeElement.firstChild,
        "display",
        "none"
      );
      this.renderer.appendChild(this.el.nativeElement, this.loader);
    }
    else {
      this.renderer.removeChild(this.el.nativeElement, this.loader);
      this.renderer.setStyle(
        this.el?.nativeElement.firstChild,
        "display",
        "block"
      );
    }
  }

  createSimpleLoader() {
    this.renderer.setStyle(this.loader, "display", "flex");
    this.renderer.setStyle(this.loader, "flex-direction", "column");
    this.renderer.setStyle(this.loader, "justify-content", "center");
    this.renderer.setStyle(this.loader, "align-items", "center");
    const ldsRoller = this.renderer.createElement("div");
    this.renderer.addClass(ldsRoller, "lds-roller");
    for(let i = 0; i<5; i++){
      const div = this.renderer.createElement("div");
      this.renderer.appendChild(ldsRoller, div);
    };
    this.renderer.appendChild(this.loader, ldsRoller);
  }
}
