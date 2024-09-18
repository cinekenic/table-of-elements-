import { Component, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ServerMockService } from '../../api/services/server-mock.service';

@Component({
  selector: 'app-table-renderer',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table-renderer.component.html',
  styleUrl: './table-renderer.component.scss',
})
export class TableRendererComponent {
  private elementService = inject(ServerMockService);
  public dataSource = signal<Element[]>([]);
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  ngOnInit() {
    this.elementService
      .getElements()
      .subscribe((element) => this.dataSource.set(element));
  }
}
