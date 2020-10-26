import { Component, OnInit } from '@angular/core';
import {HelpService} from '../../services/help-service';
import {Router} from '@angular/router';

declare let marked: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutText = '';

  constructor(private helpService: HelpService, private router: Router) { }

  ngOnInit(): void {
    this.helpService.get().subscribe( (result) => {
      this.aboutText = marked(result);
    });
  }

  onHome(): void {
    this.router.navigate(['/']);
  }
}
