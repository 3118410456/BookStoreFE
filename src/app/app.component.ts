import { Component, EventEmitter, Output } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyBookStore';

  itemss: any[] = [];

  addUserName(newUserName: any) {
    this.items.push(newUserName);
    console.log(newUserName)
  }

  currentItem = 'Television';

  items = ['item1', 'item2', 'item3', 'item4'];
  
    addItem(newItem: string) {
      this.items.push(newItem);
    }
}

