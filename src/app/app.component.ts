import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import rowsData from './rows.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'my-app';
  rows: Course[] = rowsData;
  displayedColumns: string[] = ['course', 'title', 'semester', 'campus', 'average']
  gradeToNum = { // used for sorting the average column
    'A+': 1,
    'A': 2,
    'A-': 3,
    'B+': 4,
    'B': 5,
    'B-': 6,
    'C+': 7,
    'C': 8,
    'C-': 9,
    'D+': 10,
    'D': 11,
    'D-': 12,
    'F': 13,
    'TBA': 14,
  }
  semesterToNum = { // used for sorting the semester column
    'Fall 2019': 1,
    'Fall 2019 - Winter 2020': 1.5,
    'Winter 2020': 2,
    'Summer 2020': 3,
    'Fall 2020': 4,
    'Fall 2020 - Winter 2021': 4.5,
    'Winter 2021': 5,
    'Summer 2021': 6,
    'Fall 2021': 7,
    'Fall 2021 - Winter 2022': 7.5,
    'Winter 2022': 8,
    'Summer 2022': 9,
    'Fall 2022': 10,
    'Fall 2022 - Winter 2023': 10.5,
    'Winter 2023': 11,
    'Summer 2023': 12,
    'Fall 2023': 13,
    'Fall 2023 - Winter 2024': 13.5,
    'Winter 2024': 14,
    'Summer 2024': 15,
    'Fall 2024': 16,
    'Fall 2024 - Winter 2025': 16.5,
    'Winter 2025': 17,
  }
  dataSource!: MatTableDataSource<Course>;
  searchQuery: string = '';
  campusesData = [
    { id: 1, name: 'UTM', checked: true },
    { id: 2, name: 'UTSG', checked: true },
    { id: 3, name: 'UTSC', checked: true },
  ];
  yearsData = [
    { id: 1, name: '1st', checked: true },
    { id: 2, name: '2nd', checked: true },
    { id: 3, name: '3rd', checked: true },
    { id: 4, name: '4th', checked: true },
  ];
  semestersData = [
    { id: 1, name: 'Fall', checked: true },
    { id: 2, name: 'Winter', checked: true },
    { id: 3, name: 'Summer', checked: true },
  ];
  @ViewChild(MatSort, { static: false }) set sort(val: MatSort) {
    if (val)  this.dataSource.sort = val;
  }
  @ViewChild(MatPaginator, { static: false }) set paginator(val: MatPaginator) {
    if (val)  this.dataSource.paginator = val;
  }
  constructor() {
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.rows);
    this.dataSource.filterPredicate = this.myFilterPredicate();
  }
  ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = (item: Course, property: string) => {
      switch (property) {
        case 'average': return this.gradeToNum[item.average as keyof typeof this.gradeToNum];
        case 'semester': return this.semesterToNum[item.semester as keyof typeof this.semesterToNum];
        default: return item[property as keyof Course];
      };
    }
  }

  myFilterPredicate() {
    return (data: Course, filters: string) => {
      const filterArray = filters.split('$');
      const semestersChecked = filterArray[0].split(',')
      const campusesChecked = filterArray[1].split(',');
      const yearsChecked = filterArray[2].split(',');
      const searchString = filterArray[3].trim().toLowerCase();
      const correctSemester = ((data.semester.includes('Fall') && semestersChecked.includes('Fall')) || 
        (data.semester.includes('Winter') && semestersChecked.includes('Winter'))) ||
        (data.semester.includes('Summer') && semestersChecked.includes('Summer'));
      return (
         campusesChecked.includes(data.campus) &&
         yearsChecked.includes(data.year) && 
         correctSemester &&
        (data.course.toLowerCase().includes(searchString) || data.title.toLowerCase().includes(searchString))
      );
    };
  }
  applyFilter() { // when something is typed in the search bar or a checkbox is clicked
    const campusesChecked = this.campusesData.filter(x => x.checked).map(x => x.name);
    const yearsChecked = this.yearsData.filter(x => x.checked).map(x => x.name);
    const semestersChecked = this.semestersData.filter(x => x.checked).map(x => x.name);
    const filterValue = semestersChecked.join(',') + '$' + campusesChecked.join(',') + '$' + yearsChecked.join(',') + '$' + this.searchQuery.trim().toLowerCase();
    this.dataSource.filter = filterValue; 
  }

  onCheckboxChange(e: any) { // called when a checkbox is clicked
    e.checked = !e.checked;
    this.applyFilter();
  }
}

interface Course {
  course: string;
  semester: string;
  campus: string;
  average: string;
  year: string;
  title: string;
}
