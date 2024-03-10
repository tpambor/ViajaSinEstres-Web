import { NgClass, NgFor } from '@angular/common';
import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Alarm {
  id: number;
  name: string;
  arrival: string;
  advance: string;
  checked: boolean;
}

const ALARMS: Alarm[] = [
  {
    id: 1,
    name: 'Casa a deporte',
    arrival: '07:30 am',
    advance: '15 min',
    checked: false,
  },
  {
    id: 2,
    name: 'Casa a oficina',
    arrival: '08:30 am',
    advance: '15 min',
    checked: false,
  },
  {
    id: 3,
    name: 'Universidad',
    arrival: '09:30 am',
    advance: '30 min',
    checked: false,
  },
  {
    id: 4,
    name: 'Alarm 4',
    arrival: '10:30 am',
    advance: '60 min',
    checked: false,
  },
  {
    id: 5,
    name: 'Alarm 5',
    arrival: '10:40 am',
    advance: '30 min',
    checked: false,
  },
  {
    id: 6,
    name: 'Alarm 6',
    arrival: '10:50 am',
    advance: '15 min',
    checked: false,
  },
  {
    id: 7,
    name: 'Alarm 7',
    arrival: '11:30 am',
    advance: '60 min',
    checked: false,
  },
  {
    id: 8,
    name: 'Alarm 8',
    arrival: '11:35 am',
    advance: '30 min',
    checked: false,
  },
  {
    id: 9,
    name: 'Alarm 9',
    arrival: '11:40 am',
    advance: '15 min',
    checked: false,
  },
  {
    id: 10,
    name: 'Alarm 10',
    arrival: '07:30 pm',
    advance: '15 min',
    checked: false,
  },
  {
    id: 11,
    name: 'Alarm 11',
    arrival: '07:31 am',
    advance: '15 min',
    checked: false,
  },
  {
    id: 12,
    name: 'Alarm 12',
    arrival: '08:31 am',
    advance: '15 min',
    checked: false,
  },
  {
    id: 13,
    name: 'Alarm 13',
    arrival: '09:31 am',
    advance: '30 min',
    checked: false,
  },
  {
    id: 14,
    name: 'Alarm 14',
    arrival: '10:31 am',
    advance: '60 min',
    checked: false,
  },
  {
    id: 15,
    name: 'Alarm 15',
    arrival: '10:41 am',
    advance: '30 min',
    checked: false,
  },
  {
    id: 16,
    name: 'Alarm 16',
    arrival: '10:51 am',
    advance: '15 min',
    checked: false,
  },
  {
    id: 17,
    name: 'Alarm 17',
    arrival: '11:31 am',
    advance: '60 min',
    checked: false,
  },
  {
    id: 18,
    name: 'Alarm 18',
    arrival: '11:36 am',
    advance: '30 min',
    checked: false,
  },
  {
    id: 19,
    name: 'Alarm 19',
    arrival: '11:41 am',
    advance: '15 min',
    checked: false,
  },
  {
    id: 20,
    name: 'Alarm 20',
    arrival: '07:31 pm',
    advance: '15 min',
    checked: false,
  },
];

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
    RouterLink
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

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor() {
    this.refreshData();
  }

  refreshData() {
    let alarms;

    this.totalAlarms = ALARMS.length;

		// sort alarms
		if (this.sortDirection === '' || this.sortColumn === '') {
			alarms = ALARMS;
		} else {
			alarms = [...ALARMS].sort((a, b) => {
				const res = compare(a[this.sortColumn as keyof Alarm], b[this.sortColumn as keyof Alarm]);
				return this.sortDirection === 'asc' ? res : -res;
			});
		}

    this.pageCount = Math.max(1, Math.floor(alarms.length / 10));

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
    this.alarms.forEach((o, i, a) => a[i].checked = false);
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
}
