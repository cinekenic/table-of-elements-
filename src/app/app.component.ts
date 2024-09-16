import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableRendererComponent } from './components/table-renderer/table-renderer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableRendererComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'table-of-elements';
}
