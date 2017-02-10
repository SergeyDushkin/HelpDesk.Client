import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { SmtpSettings } from './smtp.settings';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-smtp-settings',
  templateUrl: './smtp-settings.component.html',
  providers: [SettingsService] 
})

export class SmtpSettingsComponent implements OnInit {
  
  SmtpSettings: SmtpSettings;
  
  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    //this.SmtpSettings = this.route.snapshot.data['tickets'];

    
  }

  onClickBack() {
    this.location.back();
  }
}
