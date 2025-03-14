import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Tooltip } from 'bootstrap';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
  }

}
