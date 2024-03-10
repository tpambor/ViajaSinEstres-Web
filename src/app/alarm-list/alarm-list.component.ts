import { NgClass, NgFor } from '@angular/common';
import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Alarm } from '../alarm';
import { ALARMS } from '../alarms';

export type SortColumn = keyof Alarm | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

const compare = (v1: string | number | boolean, v2: string | number | boolean) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  standalone: true,
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdSortableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'app-alarm-list',
  standalone: true,
  imports: [
    NgbdSortableHeader,
    FormsModule,
    NgFor,
    NgClass,
    RouterLink,
    NgbDropdownModule
  ],
  templateUrl: './alarm-list.component.html',
  styleUrl: './alarm-list.component.css'
})
export class AlarmListComponent {
  alarms!: Alarm[];
  sortDirection: SortDirection = '';
  sortColumn: SortColumn = '';
  totalAlarms!: number;
  page = 1;
  pageCount = 1;
  selectionState!: string;
  searchName = '';

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor() {
    this.refreshData();
  }

  refreshData() {
    let alarms;

    alarms = ALARMS.filter((o) => o.name.toLowerCase().includes(this.searchName.toLowerCase()));

    this.totalAlarms = alarms.length;

		// sort alarms
		if (this.sortDirection === '' || this.sortColumn === '') {
			alarms = alarms;
		} else {
			alarms = [...alarms].sort((a, b) => {
				const res = compare(a[this.sortColumn as keyof Alarm], b[this.sortColumn as keyof Alarm]);
				return this.sortDirection === 'asc' ? res : -res;
			});
		}

    this.pageCount = Math.max(1, Math.ceil(alarms.length / 10));

    alarms = alarms.slice((this.page - 1) * 10, (this.page - 1) * 10 + 10);

    if (alarms.some((o) => o.checked) == false) {
      this.selectionState = 'none';
    }
    else if (alarms.every((o) => o.checked)) {
      this.selectionState = 'all';
    }
    else {
      this.selectionState = 'some';
    }

    this.alarms = alarms;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }

    this.sortColumn = column;
    this.sortDirection = direction;
    this.deseletAll();

    this.refreshData();
  }

  selectPage(i: number) {
    if (this.page !== i) {
      this.page = i;
      this.deseletAll();

      this.refreshData();
    }
  }

  nextPage() {
    if (this.page < this.pageCount) {
      this.page++;
      this.deseletAll();

      this.refreshData();
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.deseletAll();

      this.refreshData();
    }
  }

  deseletAll() {
    ALARMS.forEach((o, i, a) => a[i].checked = false);
  }

  toggleSelectAll() {
    if (this.selectionState !== 'all') {
      this.alarms.forEach((o, i, a) => a[i].checked = true);
    }
    else {
      this.deseletAll();
    }

    this.refreshData();
  }

  onCheckboxChange() {
    this.refreshData()
  }

  deleteAlarm(id: number) {
    ALARMS.splice(ALARMS.findIndex((o) => o.id === id), 1);

    this.refreshData();
  }

  deleteSelectedAlarms() {
    while(ALARMS.some((o) => o.checked)) {
      ALARMS.splice(ALARMS.findIndex((o) => o.checked), 1);
    }

    this.refreshData();
  }

  search(name: string) {
    this.searchName = name;

    this.refreshData();
  }
}
