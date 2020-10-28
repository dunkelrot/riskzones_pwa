import { Component, OnInit } from '@angular/core';
import {HelpService} from '../../services/help-service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

declare let marked: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutText = '';

  constructor(private helpService: HelpService, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.helpService.get().subscribe( (result) => {
      this.aboutText = marked(result);
    });
  }

  onHome(): void {
    this.location.back();
  }
}
