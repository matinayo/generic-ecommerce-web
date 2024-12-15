import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { tns } from 'tiny-slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('sliderRef') sliderRef!: ElementRef;
  
  ngOnInit(): void {
    const slider = tns({
      container: ".my-slider",
      "slideBy": 1,
      "speed": 200,
      "nav": false,
      autoplay: true,
      controls: false,
      autoplayButtonOutput: false,
      responsive: {
        1600: {
          items: 4,
          gutter: 20
        },
        1024: {
          items: 3,
          gutter: 20
        },
        768: {
          items: 2,
          gutter: 20
        },
        480: {
          items: 1
        }
      }
    })
  }

  @ViewChild('slider') slider!: ElementRef;

  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;

  // Drag start
  onMouseDown(event: MouseEvent): void {
    this.isDown = true;
    this.startX = event.pageX - this.slider.nativeElement.offsetLeft;
    this.scrollLeft = this.slider.nativeElement.scrollLeft;
    this.slider.nativeElement.classList.add('active');
  }

  // Drag end
  onMouseUp(): void {
    this.isDown = false;
    this.slider.nativeElement.classList.remove('active');
  }

  // Drag move
  onMouseMove(event: MouseEvent): void {
    if (!this.isDown) return;
    event.preventDefault();
    const x = event.pageX - this.slider.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2; // Adjust scroll speed
    this.slider.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

  // Scroll left button
  scrollLeftBtn(): void {
    this.slider.nativeElement.scrollLeft -= this.slider.nativeElement.clientWidth;
  }

  // Scroll right button
  scrollRight(): void {
    this.slider.nativeElement.scrollLeft += this.slider.nativeElement.clientWidth;
  }

  // Stop dragging on leaving the container
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isDown = false;
    this.slider.nativeElement.classList.remove('active');
  }
}
