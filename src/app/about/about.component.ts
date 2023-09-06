import { Component, Input } from '@angular/core';
import { left } from '@popperjs/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  isAnimation = false ;
  startAnimation ()  {
    const direction = this.isAnimation ? '-=250px' : '+=250px';

    $('#animatedDiv').animate({ left: direction }, 'fast', () => {
      this.isAnimation = !this.isAnimation; // Đảo ngược giá trị isAnimation
    });
  }

}