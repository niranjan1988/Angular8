import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() isRecipe = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  OnClick(type) {
    if (type === 'recipe') {
      this.isRecipe.emit(true);
    } else {
      this.isRecipe.emit(false);
    }
  }

}
