import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SmtpSettings } from './smtp.settings';

@Component({
  selector: 'app-smtp-settings',
  templateUrl: './ticket-list.component.html'
})

export class SmtpSettingsComponent implements OnInit {
  
  SmtpSettings: SmtpSettings;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.SmtpSettings = this.route.snapshot.data['tickets'];
  }

}
