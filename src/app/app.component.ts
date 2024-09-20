import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableOfPeriodicElementsComponent } from './components/table-of-periodic-elements/table-of-periodic-elements.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableOfPeriodicElementsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'table-of-elements';
}
